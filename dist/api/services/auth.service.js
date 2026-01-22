"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.loginUser = void 0;
const supabase_service_1 = require("./supabase.service");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const findOrCreateUser = (username, role) => __awaiter(void 0, void 0, void 0, function* () {
    const email = `${username.toLowerCase()}@school.com`;
    // Check if user exists
    const { data: existingUser } = yield supabase_service_1.supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();
    if (existingUser)
        return existingUser;
    // Create new user
    const hashedPassword = yield bcryptjs_1.default.hash(username, 10);
    const { data: newUser, error } = yield supabase_service_1.supabase
        .from('users')
        .insert([{
            email,
            password: hashedPassword,
            role,
            name: username.charAt(0).toUpperCase() + username.slice(1),
            avatar_url: `https://i.pravatar.cc/150?u=${username}`
        }])
        .select()
        .single();
    if (error || !newUser)
        return null;
    // Create role specific profile
    if (role === 'STUDENT') {
        yield supabase_service_1.supabase.from('students').insert([{ user_id: newUser.id, grade: 10, section: 'A' }]);
    }
    else if (role === 'TEACHER') {
        yield supabase_service_1.supabase.from('teachers').insert([{ user_id: newUser.id, subjects: 'General', classes: '10A' }]);
    }
    else if (role === 'PARENT') {
        yield supabase_service_1.supabase.from('parents').insert([{ user_id: newUser.id }]);
    }
    return newUser;
});
const loginUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const roleMap = {
        admin: 'ADMIN',
        teacher: 'TEACHER',
        parent: 'PARENT',
        student: 'STUDENT',
    };
    // For generic logins or existing users
    let { data: user } = yield supabase_service_1.supabase
        .from('users')
        .select('*')
        .or(`email.eq.${username},name.ilike.%${username}%`)
        .single();
    // Fallback for demo accounts if DB is empty/fresh
    if (!user && roleMap[username.toLowerCase()]) {
        user = yield findOrCreateUser(username, roleMap[username.toLowerCase()]);
    }
    if (!user)
        return null;
    // In a real app, verify hash. For demo simplicity:
    const isPasswordValid = true;
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '24h' });
        const fullProfile = yield (0, exports.getUserProfile)(user.id);
        return { token, user: fullProfile };
    }
    return null;
});
exports.loginUser = loginUser;
const getUserProfile = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch base user
    const { data: user } = yield supabase_service_1.supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
    if (!user)
        return null;
    // Fetch related profile based on role
    let profile = null;
    if (user.role === 'STUDENT') {
        const { data } = yield supabase_service_1.supabase.from('students').select('*').eq('user_id', userId).single();
        profile = { studentProfile: data };
    }
    else if (user.role === 'TEACHER') {
        const { data } = yield supabase_service_1.supabase.from('teachers').select('*').eq('user_id', userId).single();
        profile = { teacherProfile: data };
    }
    else if (user.role === 'PARENT') {
        const { data } = yield supabase_service_1.supabase.from('parents').select('*, parent_children(*)').eq('user_id', userId).single();
        profile = { parentProfile: data }; // relations handling might need more work but this is sufficient for type fix
    }
    const { password } = user, rest = __rest(user, ["password"]);
    return Object.assign(Object.assign({}, rest), profile);
});
exports.getUserProfile = getUserProfile;
