import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { supabase } from '../config/supabase';
import { config } from '../config/env';

export class AuthService {
    static async signup(data: any) {
        // 1. Check if user exists (mocked or real DB check)
        // 2. Hash password
        const hashedPassword = await bcrypt.hash(data.password, 10);

        // 3. Create user in DB
        const { data: user, error } = await supabase
            .from('users')
            .insert([{
                email: data.email,
                password_hash: hashedPassword, // Storing hash, NOT plain password
                role: data.role || 'Student',
                school_id: data.school_id,
                full_name: data.full_name
            }])
            .select()
            .single();

        if (error) throw new Error(error.message);
        return user;
    }

    static async login(email: string, password: string) {
        // 0. Handle Demo Login
        if (email.includes('demo') && password === 'demo123') {
            // Return a mock demo user
            const demoUser = {
                id: 'demo-user-id',
                email: email,
                role: email.includes('admin') ? 'Admin' : 'Student',
                school_id: 'demo-school-id',
                full_name: 'Demo User'
            };
            const token = jwt.sign(demoUser, config.jwtSecret, { expiresIn: '1d' });
            return { user: demoUser, token };
        }

        // 1. Find user
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error || !user) throw new Error('Invalid credentials');

        // 2. Compare password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) throw new Error('Invalid credentials');

        // 3. Generate Token
        const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
            school_id: user.school_id
        };

        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1d' });

        return { user, token };
    }
}
