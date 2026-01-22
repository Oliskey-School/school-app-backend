"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_routes_1 = __importDefault(require("./api/routes/auth.routes"));
const student_routes_1 = __importDefault(require("./api/routes/student.routes"));
const teacher_routes_1 = __importDefault(require("./api/routes/teacher.routes"));
const cbt_routes_1 = __importDefault(require("./api/routes/cbt.routes"));
const admin_routes_1 = __importDefault(require("./api/routes/admin.routes"));
const error_middleware_1 = require("./api/middleware/error.middleware");
const ai_routes_1 = __importDefault(require("./api/routes/ai.routes"));
const path_1 = __importDefault(require("path"));
// Load .env from backend folder OR root folder
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
app.use('/api/auth', auth_routes_1.default);
app.use('/api/students', student_routes_1.default);
app.use('/api/teachers', teacher_routes_1.default);
app.use('/api/cbt', cbt_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
app.use('/api/ai', ai_routes_1.default);
// Health check route
app.get('/', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Smart School App Backend is running!' });
});
// 404 Handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});
// Global Error Handler
app.use(error_middleware_1.errorHandler);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
