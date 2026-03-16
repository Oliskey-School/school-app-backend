"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTeacher = exports.updateTeacher = exports.getTeacherById = exports.getAllTeachers = exports.createTeacher = void 0;
const teacher_service_1 = require("../services/teacher.service");
const createTeacher = async (req, res) => {
    try {
        const result = await teacher_service_1.TeacherService.createTeacher(req.user.school_id, req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createTeacher = createTeacher;
const getAllTeachers = async (req, res) => {
    try {
        const result = await teacher_service_1.TeacherService.getAllTeachers(req.user.school_id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllTeachers = getAllTeachers;
const getTeacherById = async (req, res) => {
    try {
        const result = await teacher_service_1.TeacherService.getTeacherById(req.user.school_id, req.params.id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getTeacherById = getTeacherById;
const updateTeacher = async (req, res) => {
    try {
        const result = await teacher_service_1.TeacherService.updateTeacher(req.user.school_id, req.params.id, req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateTeacher = updateTeacher;
const deleteTeacher = async (req, res) => {
    try {
        await teacher_service_1.TeacherService.deleteTeacher(req.user.school_id, req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteTeacher = deleteTeacher;
//# sourceMappingURL=teacher.controller.js.map