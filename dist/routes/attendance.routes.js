"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const attendance_controller_1 = require("../controllers/attendance.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get('/', auth_middleware_1.authenticate, attendance_controller_1.getAttendance);
router.post('/', auth_middleware_1.authenticate, attendance_controller_1.saveAttendance);
router.get('/student/:studentId', auth_middleware_1.authenticate, attendance_controller_1.getAttendanceByStudent);
exports.default = router;
//# sourceMappingURL=attendance.routes.js.map