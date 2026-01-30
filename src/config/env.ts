import dotenv from 'dotenv';
dotenv.config();

export const config = {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || 'super-secret-key-change-in-prod',
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || '',
    env: process.env.NODE_ENV || 'development'
};

if (!config.supabaseUrl || !config.supabaseServiceKey) {
    console.warn('⚠️  Supabase URL or Service Key missing. Realtime and DB features may fail.');
}
