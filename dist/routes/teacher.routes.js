"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teacher_controller_1 = require("../controllers/teacher.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post('/', auth_middleware_1.authenticate, teacher_controller_1.createTeacher);
router.get('/', auth_middleware_1.authenticate, teacher_controller_1.getAllTeachers);
router.get('/:id', auth_middleware_1.authenticate, teacher_controller_1.getTeacherById);
router.put('/:id', auth_middleware_1.authenticate, teacher_controller_1.updateTeacher);
router.delete('/:id', auth_middleware_1.authenticate, teacher_controller_1.deleteTeacher);
exports.default = router;
//# sourceMappingURL=teacher.routes.js.map