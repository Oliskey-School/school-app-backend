"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_controller_1 = require("../controllers/student.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
// All student routes are protected
router.use(auth_middleware_1.authenticateToken);
router.get('/', student_controller_1.getAllStudents);
router.get('/:id', student_controller_1.getStudentById);
// router.post('/', createStudent);
// router.put('/:id', updateStudent);
// router.delete('/:id', deleteStudent);
exports.default = router;
