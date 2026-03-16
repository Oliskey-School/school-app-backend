"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || 'fallback-dev-secret-do-not-use-in-prod',
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseServiceKey: process.env.SUPABASE_SERVICE_KEY || '',
    env: process.env.NODE_ENV || 'development'
};
if (!process.env.JWT_SECRET && exports.config.env === 'production') {
    console.error('❌ FATAL: JWT_SECRET must be set in production!');
    process.exit(1);
}
if (exports.config.jwtSecret === 'fallback-dev-secret-do-not-use-in-prod') {
    console.warn('⚠️  WARNING: Using fallback JWT secret. Security is compromised.');
}
if (!exports.config.supabaseUrl || !exports.config.supabaseServiceKey) {
    console.warn('⚠️  Supabase URL or Service Key missing. Realtime and DB features may fail.');
}
//# sourceMappingURL=env.js.map