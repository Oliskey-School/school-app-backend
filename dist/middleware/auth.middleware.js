"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const supabase_1 = require("../config/supabase");
const env_1 = require("../config/env");
const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        console.warn('⚠️ [Auth] No authorization header provided');
        return res.status(401).json({ message: 'No token provided' });
    }
    const token = authHeader.split(' ')[1];
    try {
        // First try Supabase token validation
        const { data: { user }, error } = await supabase_1.supabase.auth.getUser(token);
        if (user) {
            // Fetch additional profile data (role, school_id) to populate req.user
            const { data: profile } = await supabase_1.supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();
            req.user = {
                ...user,
                ...profile,
                school_id: profile?.school_id
            };
            return next();
        }
        // If Supabase auth fails, fall back to local JWT (demo tokens)
        const decoded = jsonwebtoken_1.default.verify(token, env_1.config.jwtSecret);
        req.user = decoded;
        return next();
    }
    catch (error) {
        console.error('Auth Exception:', error.message ?? error);
        return res.status(401).json({ message: 'Authentication failed' });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map