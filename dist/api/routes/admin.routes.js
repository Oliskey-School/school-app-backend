"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AdminController = __importStar(require("../controllers/admin.controller"));
const router = (0, express_1.Router)();
// Optional: Apply authentication to all admin routes
// router.use(authenticateToken);
// ============================================
// DASHBOARD
// ============================================
router.get('/dashboard', AdminController.getDashboardStats);
// ============================================
// STUDENTS CRUD
// ============================================
router.get('/students', AdminController.getAllStudents);
router.get('/students/:id', AdminController.getStudentById);
router.post('/students', AdminController.createStudent);
router.put('/students/:id', AdminController.updateStudent);
router.delete('/students/:id', AdminController.deleteStudent);
// ============================================
// TEACHERS CRUD
// ============================================
router.get('/teachers', AdminController.getAllTeachers);
router.get('/teachers/:id', AdminController.getTeacherById);
router.post('/teachers', AdminController.createTeacher);
router.put('/teachers/:id', AdminController.updateTeacher);
router.delete('/teachers/:id', AdminController.deleteTeacher);
// ============================================
// PARENTS
// ============================================
router.get('/parents', AdminController.getAllParents);
// ============================================
// FEE MANAGEMENT
// ============================================
router.get('/fees', AdminController.getAllFees);
router.put('/fees/:id/status', AdminController.updateFeeStatus);
// ============================================
// NOTICES
// ============================================
router.get('/notices', AdminController.getAllNotices);
router.post('/notices', AdminController.createNotice);
router.delete('/notices/:id', AdminController.deleteNotice);
// ============================================
// ATTENDANCE
// ============================================
router.get('/attendance', AdminController.getAttendance);
router.post('/attendance', AdminController.saveAttendance);
exports.default = router;
