"use strict";
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
exports.markAttendance = exports.getAssignments = exports.createAssignment = exports.getStudents = exports.getClasses = void 0;
const supabase_service_1 = require("../services/supabase.service");
const getClasses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // @ts-ignore
    const userId = req.user.id;
    try {
        const { data: teacher } = yield supabase_service_1.supabase
            .from('teachers')
            .select('*, teacher_classes(class_name)')
            .eq('user_id', userId)
            .single();
        if (!teacher)
            return res.status(404).json({ message: "Teacher not found" });
        // Transform derived classes
        const classes = ((_a = teacher.teacher_classes) === null || _a === void 0 ? void 0 : _a.map((c) => c.class_name)) || [];
        res.json({ classes });
    }
    catch (error) {
        res.status(500).json({ message: "Error" });
    }
});
exports.getClasses = getClasses;
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.user.id;
    try {
        const { data: teacher } = yield supabase_service_1.supabase.from('teachers').select('id, classes').eq('user_id', userId).single();
        if (!teacher)
            return res.status(404).json({ message: "Teacher not found" });
        // Fetch students belonging to classes taught by this teacher
        // Assuming teacher.classes is a comma-sep string or we use relationship
        // For matching "10A":
        const { data: students } = yield supabase_service_1.supabase
            .from('students')
            .select('*, user:users(*)')
            .ilike('grade', '%10%'); // Placeholder logic to match simplified demo
        // Real logic: .in('class_name', classesArray)
        res.json(students || []);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching students" });
    }
});
exports.getStudents = getStudents;
const createAssignment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.user.id;
    const { title, description, className, subject, dueDate } = req.body;
    try {
        const { data: teacher } = yield supabase_service_1.supabase.from('teachers').select('id').eq('user_id', userId).single();
        if (!teacher)
            return res.status(404).json({ message: "Teacher not found" });
        const { data: assignment, error } = yield supabase_service_1.supabase.from('assignments').insert([{
                teacher_id: teacher.id,
                title,
                description,
                class_name: className,
                subject,
                due_date: new Date(dueDate).toISOString()
            }]).select().single();
        if (error)
            throw error;
        res.status(201).json(assignment);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating assignment" });
    }
});
exports.createAssignment = createAssignment;
const getAssignments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const userId = req.user.id;
    try {
        const { data: teacher } = yield supabase_service_1.supabase.from('teachers').select('id').eq('user_id', userId).single();
        if (!teacher)
            return res.status(404).json({ message: "Teacher not found" });
        const { data: assignments } = yield supabase_service_1.supabase
            .from('assignments')
            .select('*, submissions:assignment_submissions(*)')
            .eq('teacher_id', teacher.id);
        res.json(assignments || []);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching assignments" });
    }
});
exports.getAssignments = getAssignments;
const markAttendance = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { studentIds, status, date } = req.body; // Expects array of student IDs
    try {
        const updates = studentIds.map((sid) => ({
            student_id: sid,
            status: status,
            date: new Date(date).toISOString().split('T')[0]
        }));
        const { error } = yield supabase_service_1.supabase.from('student_attendance').upsert(updates);
        if (error)
            throw error;
        res.json({ message: "Attendance marked" });
    }
    catch (error) {
        res.status(500).json({ message: "Error marking attendance" });
    }
});
exports.markAttendance = markAttendance;
