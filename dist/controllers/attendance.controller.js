"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttendanceByStudent = exports.saveAttendance = exports.getAttendance = void 0;
const attendance_service_1 = require("../services/attendance.service");
const getAttendance = async (req, res) => {
    try {
        const { classId, date } = req.query;
        if (!classId || !date) {
            return res.status(400).json({ message: 'classId and date are required' });
        }
        const result = await attendance_service_1.AttendanceService.getAttendance(req.user.school_id, classId, date);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAttendance = getAttendance;
const saveAttendance = async (req, res) => {
    try {
        const { records } = req.body;
        if (!records || !Array.isArray(records)) {
            return res.status(400).json({ message: 'records array is required' });
        }
        const result = await attendance_service_1.AttendanceService.saveAttendance(req.user.school_id, records);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.saveAttendance = saveAttendance;
const getAttendanceByStudent = async (req, res) => {
    try {
        const { studentId } = req.params;
        const result = await attendance_service_1.AttendanceService.getAttendanceByStudent(req.user.school_id, studentId);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAttendanceByStudent = getAttendanceByStudent;
//# sourceMappingURL=attendance.controller.js.map