"use strict";
/**
 * Supabase Service for Express Backend
 * This connects the Express API to Supabase for hybrid architecture
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttendanceByClass = exports.saveAttendance = exports.deleteNotice = exports.createNotice = exports.getAllNotices = exports.getFeesByStudent = exports.getParentById = exports.deleteTeacher = exports.updateTeacher = exports.createTeacher = exports.checkConnection = exports.getDashboardStats = exports.updateFeeStatus = exports.getAllFees = exports.getAllParents = exports.getTeacherById = exports.getAllTeachers = exports.deleteStudent = exports.updateStudent = exports.createStudent = exports.getStudentById = exports.getAllStudents = exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.VITE_SUPABASE_ANON_KEY || '';
if (!supabaseUrl || !supabaseKey) {
    console.warn('Warning: Supabase credentials not found. Some features may not work.');
}
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
// ============================================
// STUDENTS
// ============================================
const getAllStudents = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield exports.supabase
        .from('students')
        .select('*')
        .order('name', { ascending: true });
    if (error)
        throw error;
    return data;
});
exports.getAllStudents = getAllStudents;
const getStudentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield exports.supabase
        .from('students')
        .select('*')
        .eq('id', id)
        .single();
    if (error)
        throw error;
    return data;
});
exports.getStudentById = getStudentById;
const createStudent = (studentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield exports.supabase
        .from('students')
        .insert([studentData])
        .select()
        .single();
    if (error)
        throw error;
    return data;
});
exports.createStudent = createStudent;
const updateStudent = (id, studentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield exports.supabase
        .from('students')
        .update(studentData)
        .eq('id', id)
        .select()
        .single();
    if (error)
        throw error;
    return data;
});
exports.updateStudent = updateStudent;
const deleteStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const { error } = yield exports.supabase
        .from('students')
        .delete()
        .eq('id', id);
    if (error)
        throw error;
    return { success: true };
});
exports.deleteStudent = deleteStudent;
// ============================================
// TEACHERS
// ============================================
// ============================================
// TEACHERS
// ============================================
const getAllTeachers = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield exports.supabase
        .from('teachers')
        .select(`
            *,
            teacher_subjects (subject),
            teacher_classes (class_name)
        `)
        .order('name', { ascending: true });
    if (error)
        throw error;
    // Transform for frontend
    return (data || []).map((t) => {
        var _a, _b;
        return (Object.assign(Object.assign({}, t), { subjects: ((_a = t.teacher_subjects) === null || _a === void 0 ? void 0 : _a.map((s) => s.subject)) || [], classes: ((_b = t.teacher_classes) === null || _b === void 0 ? void 0 : _b.map((c) => c.class_name)) || [] }));
    });
});
exports.getAllTeachers = getAllTeachers;
const getTeacherById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { data, error } = yield exports.supabase
        .from('teachers')
        .select(`
            *,
            teacher_subjects (subject),
            teacher_classes (class_name)
        `)
        .eq('id', id)
        .single();
    if (error)
        throw error;
    // Transform
    if (data) {
        return Object.assign(Object.assign({}, data), { subjects: ((_a = data.teacher_subjects) === null || _a === void 0 ? void 0 : _a.map((s) => s.subject)) || [], classes: ((_b = data.teacher_classes) === null || _b === void 0 ? void 0 : _b.map((c) => c.class_name)) || [] });
    }
    return data;
});
exports.getTeacherById = getTeacherById;
// ... create/update/delete remain mostly same but could also need transform if they return data ...
// ============================================
// PARENTS
// ============================================
const getAllParents = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield exports.supabase
        .from('parents')
        .select(`
            *,
            parent_children (
                student_id,
                students (id, name, grade, section)
            )
        `)
        .order('name', { ascending: true });
    if (error)
        throw error;
    // Transform
    return (data || []).map((p) => {
        var _a;
        return (Object.assign(Object.assign({}, p), { childIds: ((_a = p.parent_children) === null || _a === void 0 ? void 0 : _a.map((pc) => pc.student_id)) || [] }));
    });
});
exports.getAllParents = getAllParents;
// ============================================
// FEES
// ============================================
const getAllFees = () => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield exports.supabase
        .from('student_fees')
        .select(`
            *,
            students (id, name, grade, section, avatar_url)
        `)
        .order('due_date', { ascending: true });
    if (error)
        throw error;
    // Transform to camelCase
    return (data || []).map((f) => ({
        id: f.id,
        studentId: f.student_id,
        totalFee: f.total_fee,
        paidAmount: f.paid_amount,
        status: f.status,
        dueDate: f.due_date,
        title: f.title,
        term: f.term,
        student: f.students
    }));
});
exports.getAllFees = getAllFees;
const updateFeeStatus = (feeId, status, amountPaid) => __awaiter(void 0, void 0, void 0, function* () {
    const updateData = { status };
    if (amountPaid !== undefined) {
        updateData.paid_amount = amountPaid; // Correct column name
    }
    if (status === 'Paid') {
        updateData.payment_date = new Date().toISOString();
    }
    const { data, error } = yield exports.supabase
        .from('student_fees')
        .update(updateData)
        .eq('id', feeId)
        .select()
        .single();
    if (error)
        throw error;
    return data;
});
exports.updateFeeStatus = updateFeeStatus;
// ============================================
// DASHBOARD STATS
// ============================================
const getDashboardStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const [studentsResult, teachersResult, parentsResult, feesResult] = yield Promise.all([
        exports.supabase.from('students').select('id', { count: 'exact' }),
        exports.supabase.from('teachers').select('id', { count: 'exact' }),
        exports.supabase.from('parents').select('id', { count: 'exact' }),
        exports.supabase.from('student_fees').select('status, total_fee, paid_amount') // Correct columns
    ]);
    const fees = feesResult.data || [];
    const totalFees = fees.reduce((sum, f) => sum + (f.total_fee || 0), 0);
    const collectedFees = fees.reduce((sum, f) => sum + (f.paid_amount || 0), 0);
    const overdueFees = fees.filter(f => f.status === 'Overdue').length;
    return {
        totalStudents: studentsResult.count || 0,
        totalTeachers: teachersResult.count || 0,
        totalParents: parentsResult.count || 0,
        totalFees,
        collectedFees,
        outstandingFees: totalFees - collectedFees,
        overdueFees,
        feeComplianceRate: totalFees > 0 ? Math.round((collectedFees / totalFees) * 100) : 0
    };
});
exports.getDashboardStats = getDashboardStats;
// ============================================
// CONNECTION CHECK
// ============================================
const checkConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error } = yield exports.supabase.from('students').select('id').limit(1);
        return !error;
    }
    catch (_a) {
        return false;
    }
});
exports.checkConnection = checkConnection;
// --- DUMMY IMPLEMENTATIONS FOR LEGACY COMPATIBILITY ---
const createTeacher = (d) => __awaiter(void 0, void 0, void 0, function* () { return d; });
exports.createTeacher = createTeacher;
const updateTeacher = (id, d) => __awaiter(void 0, void 0, void 0, function* () { return d; });
exports.updateTeacher = updateTeacher;
const deleteTeacher = (id) => __awaiter(void 0, void 0, void 0, function* () { return ({ success: true }); });
exports.deleteTeacher = deleteTeacher;
const getParentById = (id) => __awaiter(void 0, void 0, void 0, function* () { return ({}); });
exports.getParentById = getParentById;
const getFeesByStudent = (id) => __awaiter(void 0, void 0, void 0, function* () { return ([]); });
exports.getFeesByStudent = getFeesByStudent;
const getAllNotices = () => __awaiter(void 0, void 0, void 0, function* () { return ([]); });
exports.getAllNotices = getAllNotices;
const createNotice = (d) => __awaiter(void 0, void 0, void 0, function* () { return d; });
exports.createNotice = createNotice;
const deleteNotice = (id) => __awaiter(void 0, void 0, void 0, function* () { return ({ success: true }); });
exports.deleteNotice = deleteNotice;
const saveAttendance = (d) => __awaiter(void 0, void 0, void 0, function* () { return d; });
exports.saveAttendance = saveAttendance;
const getAttendanceByClass = (c, d) => __awaiter(void 0, void 0, void 0, function* () { return ([]); });
exports.getAttendanceByClass = getAttendanceByClass;
exports.default = {
    supabase: exports.supabase,
    getAllStudents: exports.getAllStudents,
    getStudentById: exports.getStudentById,
    createStudent: exports.createStudent,
    updateStudent: exports.updateStudent,
    deleteStudent: exports.deleteStudent,
    getAllTeachers: exports.getAllTeachers,
    getTeacherById: exports.getTeacherById,
    createTeacher: exports.createTeacher,
    updateTeacher: exports.updateTeacher,
    deleteTeacher: exports.deleteTeacher,
    getAllParents: exports.getAllParents,
    getParentById: exports.getParentById,
    getAllFees: exports.getAllFees,
    getFeesByStudent: exports.getFeesByStudent,
    updateFeeStatus: exports.updateFeeStatus,
    getAllNotices: exports.getAllNotices,
    createNotice: exports.createNotice,
    deleteNotice: exports.deleteNotice,
    saveAttendance: exports.saveAttendance,
    getAttendanceByClass: exports.getAttendanceByClass,
    getDashboardStats: exports.getDashboardStats,
    checkConnection: exports.checkConnection
};
