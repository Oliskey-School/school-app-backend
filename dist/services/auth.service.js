"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const supabase_1 = require("../config/supabase");
const env_1 = require("../config/env");
class AuthService {
    static async signup(data) {
        const email = data.email?.toLowerCase?.();
        const password = data.password;
        const role = data.role || 'Student';
        const school_id = data.school_id;
        const full_name = data.full_name;
        if (!email || !password) {
            throw new Error('Email and password are required');
        }
        // 1. Create Supabase Auth user (service role key required)
        const { data: authData, error: authError } = await supabase_1.supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
                full_name,
                role,
                school_id
            }
        });
        if (authError) {
            throw new Error(`Supabase Auth Error: ${authError.message}`);
        }
        const userId = authData.user.id;
        // 2. Upsert profile record in public.users
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const { data: user, error } = await supabase_1.supabase
            .from('users')
            .upsert({
            id: userId,
            email,
            password_hash: hashedPassword,
            role,
            school_id,
            full_name,
            name: full_name
        })
            .select()
            .single();
        if (error) {
            throw new Error(error.message);
        }
        // 3. Create a session token so the caller can use it for auth
        const { data: sessionData, error: signInError } = await supabase_1.supabase.auth.signInWithPassword({
            email,
            password
        });
        const token = sessionData?.session?.access_token || null;
        return { user, token };
    }
    static async login(email, password) {
        // 0. Handle Demo Login
        const isDemoAccount = email.endsWith('@demo.com') || email.includes('demo_');
        if (isDemoAccount && password === 'password123') {
            const role = email.split('@')[0].replace('demo_', '');
            const demoUser = {
                id: `demo-${role}-id`,
                email: email,
                role: role.charAt(0).toUpperCase() + role.slice(1),
                school_id: 'd0ff3e95-9b4c-4c12-989c-e5640d3cacd1',
                full_name: `Demo ${role.charAt(0).toUpperCase() + role.slice(1)}`
            };
            const token = jsonwebtoken_1.default.sign(demoUser, env_1.config.jwtSecret, { expiresIn: '1d' });
            return { user: demoUser, token };
        }
        // 1. Authenticate with Supabase Auth
        const { data: authData, error: authError } = await supabase_1.supabase.auth.signInWithPassword({
            email,
            password
        });
        if (authError || !authData?.session) {
            throw new Error('Invalid credentials');
        }
        const token = authData.session.access_token;
        const userId = authData.user?.id;
        // 2. Fetch profile from public.users (fallback if missing)
        const { data: user, error: userError } = await supabase_1.supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .single();
        if (userError || !user) {
            throw new Error('User profile not found');
        }
        return { user, token };
    }
    static async createUser(data) {
        // 1. Hash Password
        const hashedPassword = await bcryptjs_1.default.hash(data.password, 10);
        // 2. Create Supabase Auth User (Auto-confirmed)
        const { data: authData, error: authError } = await supabase_1.supabase.auth.admin.createUser({
            email: data.email,
            password: data.password,
            email_confirm: true,
            user_metadata: {
                full_name: data.full_name,
                role: data.role,
                school_id: data.school_id,
                username: data.username
            }
        });
        if (authError)
            throw new Error(`Supabase Auth Error: ${authError.message}`);
        const userId = authData.user.id;
        // 3. Upsert into public.users (Sync ID & Hash)
        // Using upsert to handle potential trigger race conditions
        const { error: userError } = await supabase_1.supabase
            .from('users')
            .upsert({
            id: userId,
            email: data.email,
            password_hash: hashedPassword,
            role: data.role,
            school_id: data.school_id,
            full_name: data.full_name,
            name: data.full_name
        });
        if (userError) {
            // Fallback: If ID mismatch (e.g., users.id is int), try letting DB generate ID
            const { error: retryError } = await supabase_1.supabase.from('users').insert({
                email: data.email,
                password_hash: hashedPassword,
                role: data.role,
                school_id: data.school_id,
                full_name: data.full_name
            });
            if (retryError)
                throw new Error(`User DB Error: ${userError.message}`);
        }
        // 4. Update auth_accounts (for username login)
        const { error: accountError } = await supabase_1.supabase
            .from('auth_accounts')
            .upsert({
            username: data.username,
            email: data.email,
            school_id: data.school_id,
            is_verified: true,
            user_id: userId
        });
        if (accountError)
            console.warn('Auth Account Sync Warning:', accountError.message);
        return { id: userId, email: data.email, username: data.username };
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map