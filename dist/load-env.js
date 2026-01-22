"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load .env from root folder explicitly
console.log("Loading env from:", path_1.default.join(__dirname, '../../.env'));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
// Also load local backend .env for specific backend overrides
dotenv_1.default.config();
console.log("Env loaded. Gemini Key present:", !!process.env.VITE_GEMINI_API_KEY);
