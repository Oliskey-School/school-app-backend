"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = require("../controllers/student.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// All student routes are protected
router.post('/enroll', auth_middleware_1.authenticate, student_controller_1.enrollStudent);
router.get('/', auth_middleware_1.authenticate, student_controller_1.getAllStudents);
router.get('/:id', auth_middleware_1.authenticate, student_controller_1.getStudentById);
router.put('/:id', auth_middleware_1.authenticate, student_controller_1.updateStudent);
router.delete('/:id', auth_middleware_1.authenticate, student_controller_1.deleteStudent);
exports.default = router;
//# sourceMappingURL=student.routes.js.map