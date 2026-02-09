import { Request, Response, NextFunction } from 'express';
import { supabase } from '../config/supabase';
import { config } from '../config/env';

export interface AuthRequest extends Request {
    user?: any;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        console.warn('⚠️ [Auth] No authorization header provided');
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verify token with Supabase Auth API
        const { data: { user }, error } = await supabase.auth.getUser(token);

        if (error || !user) {
            console.error('❌ [Auth Error] Token validation failed:', error?.message);
            return res.status(401).json({ message: 'Invalid token' });
        }

        console.log(`✅ [Auth Success] User: ${user.email} (${user.role})`);

        // Fetch additional profile data (role, school_id) to populate req.user
        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        // Attach user + profile data to request
        req.user = {
            ...user,
            ...profile, // This adds school_id, role, etc.
            school_id: profile?.school_id // Ensure explicit access
        };

        next();
    } catch (error) {
        console.error('Auth Exception:', error);
        return res.status(401).json({ message: 'Authentication failed' });
    }
};
