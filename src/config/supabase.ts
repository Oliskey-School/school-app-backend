import { createClient } from '@supabase/supabase-js';
import { config } from './env';

const url = config.supabaseUrl || 'https://placeholder.supabase.co';
const serviceKey = config.supabaseServiceKey || 'placeholder-key';
const anonKey = config.supabaseAnonKey || 'placeholder-key';

export const supabase = createClient(url, serviceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

export const supabaseAnon = createClient(url, anonKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
