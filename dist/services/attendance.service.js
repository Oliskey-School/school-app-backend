"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const supabase_1 = require("../config/supabase");
class AttendanceService {
    static async getAttendance(schoolId, classId, date) {
        const { data, error } = await supabase_1.supabase
            .from('student_attendance')
            .select(`*, students (id, name, avatar_url)`)
            .eq('school_id', schoolId)
            .eq('class_id', classId)
            .eq('date', date);
        if (error)
            throw new Error(error.message);
        return data || [];
    }
    static async saveAttendance(schoolId, records) {
        // records: { student_id, class_id, date, status, notes }
        const formattedRecords = records.map(r => ({
            ...r,
            school_id: schoolId
        }));
        const { data, error } = await supabase_1.supabase
            .from('student_attendance')
            .upsert(formattedRecords, { onConflict: 'student_id,date' })
            .select();
        if (error)
            throw new Error(error.message);
        return data;
    }
    static async getAttendanceByStudent(schoolId, studentId) {
        const { data, error } = await supabase_1.supabase
            .from('student_attendance')
            .select('*')
            .eq('school_id', schoolId)
            .eq('student_id', studentId)
            .order('date', { ascending: false });
        if (error)
            throw new Error(error.message);
        return data || [];
    }
}
exports.AttendanceService = AttendanceService;
//# sourceMappingURL=attendance.service.js.map