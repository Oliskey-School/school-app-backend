"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./load-env"); // Must be first
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const path_1 = __importDefault(require("path"));
const ai_routes_1 = __importDefault(require("./api/routes/ai.routes"));
// Load .env logic
const result = dotenv_1.default.config();
if (result.error) {
    dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../.env') });
}
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
// Security Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
// Rate Limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);
// Logging
app.use((0, morgan_1.default)('dev'));
// Parsing
app.use(express_1.default.json());
// API Routes
app.use('/api/ai', ai_routes_1.default);
// Health check
app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'AI Assistant Server is running!' });
});
app.listen(port, () => {
    console.log(`[server]: AI Server is running at http://localhost:${port}`);
});
