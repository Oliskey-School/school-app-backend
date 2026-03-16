"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const env_1 = require("./env");
const url = env_1.config.supabaseUrl || 'https://placeholder.supabase.co';
const key = env_1.config.supabaseServiceKey || 'placeholder-key';
exports.supabase = (0, supabase_js_1.createClient)(url, key, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});
//# sourceMappingURL=supabase.js.map