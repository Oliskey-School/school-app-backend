"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteStudent = exports.updateStudent = exports.getStudentById = exports.getAllStudents = exports.enrollStudent = void 0;
const student_service_1 = require("../services/student.service");
const enrollStudent = async (req, res) => {
    try {
        const schoolId = req.user.school_id;
        if (!schoolId) {
            return res.status(400).json({ message: 'School ID is required' });
        }
        const result = await student_service_1.StudentService.enrollStudent(schoolId, req.body);
        res.status(201).json(result);
    }
    catch (error) {
        console.error('Enrollment controller error:', error);
        if (error.message.includes('required for enrollment')) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};
exports.enrollStudent = enrollStudent;
const getAllStudents = async (req, res) => {
    try {
        const result = await student_service_1.StudentService.getAllStudents(req.user.school_id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllStudents = getAllStudents;
const getStudentById = async (req, res) => {
    try {
        const result = await student_service_1.StudentService.getStudentById(req.user.school_id, req.params.id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getStudentById = getStudentById;
const updateStudent = async (req, res) => {
    try {
        const result = await student_service_1.StudentService.updateStudent(req.user.school_id, req.params.id, req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateStudent = updateStudent;
const deleteStudent = async (req, res) => {
    try {
        await student_service_1.StudentService.deleteStudent(req.user.school_id, req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteStudent = deleteStudent;
//# sourceMappingURL=student.controller.js.map