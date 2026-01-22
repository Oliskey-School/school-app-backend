"use strict";
/**
 * Admin Controller - Full CRUD with Supabase
 * Handles all admin operations through the Express backend
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllParents = exports.getAttendance = exports.saveAttendance = exports.deleteNotice = exports.createNotice = exports.getAllNotices = exports.updateFeeStatus = exports.getAllFees = exports.deleteTeacher = exports.updateTeacher = exports.createTeacher = exports.getTeacherById = exports.getAllTeachers = exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudentById = exports.getAllStudents = exports.getDashboardStats = void 0;
const SupabaseService = __importStar(require("../services/supabase.service"));
// ============================================
// DASHBOARD
// ============================================
const getDashboardStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = yield SupabaseService.getDashboardStats();
        res.json(stats);
    }
    catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({
            message: 'Error fetching dashboard stats',
            error: error.message
        });
    }
});
exports.getDashboardStats = getDashboardStats;
// ============================================
// STUDENTS CRUD
// ============================================
const getAllStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield SupabaseService.getAllStudents();
        res.json(students);
    }
    catch (error) {
        console.error('Get students error:', error);
        res.status(500).json({
            message: 'Error fetching students',
            error: error.message
        });
    }
});
exports.getAllStudents = getAllStudents;
const getStudentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const student = yield SupabaseService.getStudentById(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    }
    catch (error) {
        console.error('Get student error:', error);
        res.status(500).json({
            message: 'Error fetching student',
            error: error.message
        });
    }
});
exports.getStudentById = getStudentById;
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const student = yield SupabaseService.createStudent(req.body);
        res.status(201).json(student);
    }
    catch (error) {
        console.error('Create student error:', error);
        res.status(500).json({
            message: 'Error creating student',
            error: error.message
        });
    }
});
exports.createStudent = createStudent;
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const student = yield SupabaseService.updateStudent(id, req.body);
        res.json(student);
    }
    catch (error) {
        console.error('Update student error:', error);
        res.status(500).json({
            message: 'Error updating student',
            error: error.message
        });
    }
});
exports.updateStudent = updateStudent;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        yield SupabaseService.deleteStudent(id);
        res.json({ message: 'Student deleted successfully' });
    }
    catch (error) {
        console.error('Delete student error:', error);
        res.status(500).json({
            message: 'Error deleting student',
            error: error.message
        });
    }
});
exports.deleteStudent = deleteStudent;
// ============================================
// TEACHERS CRUD
// ============================================
const getAllTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teachers = yield SupabaseService.getAllTeachers();
        res.json(teachers);
    }
    catch (error) {
        console.error('Get teachers error:', error);
        res.status(500).json({
            message: 'Error fetching teachers',
            error: error.message
        });
    }
});
exports.getAllTeachers = getAllTeachers;
const getTeacherById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const teacher = yield SupabaseService.getTeacherById(id);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json(teacher);
    }
    catch (error) {
        console.error('Get teacher error:', error);
        res.status(500).json({
            message: 'Error fetching teacher',
            error: error.message
        });
    }
});
exports.getTeacherById = getTeacherById;
const createTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = yield SupabaseService.createTeacher(req.body);
        res.status(201).json(teacher);
    }
    catch (error) {
        console.error('Create teacher error:', error);
        res.status(500).json({
            message: 'Error creating teacher',
            error: error.message
        });
    }
});
exports.createTeacher = createTeacher;
const updateTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const teacher = yield SupabaseService.updateTeacher(id, req.body);
        res.json(teacher);
    }
    catch (error) {
        console.error('Update teacher error:', error);
        res.status(500).json({
            message: 'Error updating teacher',
            error: error.message
        });
    }
});
exports.updateTeacher = updateTeacher;
const deleteTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        yield SupabaseService.deleteTeacher(id);
        res.json({ message: 'Teacher deleted successfully' });
    }
    catch (error) {
        console.error('Delete teacher error:', error);
        res.status(500).json({
            message: 'Error deleting teacher',
            error: error.message
        });
    }
});
exports.deleteTeacher = deleteTeacher;
// ============================================
// FEE MANAGEMENT
// ============================================
const getAllFees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const fees = yield SupabaseService.getAllFees();
        res.json(fees);
    }
    catch (error) {
        console.error('Get fees error:', error);
        res.status(500).json({
            message: 'Error fetching fees',
            error: error.message
        });
    }
});
exports.getAllFees = getAllFees;
const updateFeeStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        const { status, amountPaid } = req.body;
        const fee = yield SupabaseService.updateFeeStatus(id, status, amountPaid);
        res.json(fee);
    }
    catch (error) {
        console.error('Update fee error:', error);
        res.status(500).json({
            message: 'Error updating fee',
            error: error.message
        });
    }
});
exports.updateFeeStatus = updateFeeStatus;
// ============================================
// NOTICES
// ============================================
const getAllNotices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notices = yield SupabaseService.getAllNotices();
        res.json(notices);
    }
    catch (error) {
        console.error('Get notices error:', error);
        res.status(500).json({
            message: 'Error fetching notices',
            error: error.message
        });
    }
});
exports.getAllNotices = getAllNotices;
const createNotice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notice = yield SupabaseService.createNotice(req.body);
        res.status(201).json(notice);
    }
    catch (error) {
        console.error('Create notice error:', error);
        res.status(500).json({
            message: 'Error creating notice',
            error: error.message
        });
    }
});
exports.createNotice = createNotice;
const deleteNotice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id, 10);
        yield SupabaseService.deleteNotice(id);
        res.json({ message: 'Notice deleted successfully' });
    }
    catch (error) {
        console.error('Delete notice error:', error);
        res.status(500).json({
            message: 'Error deleting notice',
            error: error.message
        });
    }
});
exports.deleteNotice = deleteNotice;
// ============================================
// ATTENDANCE
// ============================================
const saveAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { records } = req.body;
        const attendance = yield SupabaseService.saveAttendance(records);
        res.json(attendance);
    }
    catch (error) {
        console.error('Save attendance error:', error);
        res.status(500).json({
            message: 'Error saving attendance',
            error: error.message
        });
    }
});
exports.saveAttendance = saveAttendance;
const getAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { className, date } = req.query;
        if (!className || !date) {
            return res.status(400).json({ message: 'className and date are required' });
        }
        const attendance = yield SupabaseService.getAttendanceByClass(className, date);
        res.json(attendance);
    }
    catch (error) {
        console.error('Get attendance error:', error);
        res.status(500).json({
            message: 'Error fetching attendance',
            error: error.message
        });
    }
});
exports.getAttendance = getAttendance;
// ============================================
// PARENTS
// ============================================
const getAllParents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parents = yield SupabaseService.getAllParents();
        res.json(parents);
    }
    catch (error) {
        console.error('Get parents error:', error);
        res.status(500).json({
            message: 'Error fetching parents',
            error: error.message
        });
    }
});
exports.getAllParents = getAllParents;
