"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherService = void 0;
const supabase_1 = require("../config/supabase");
class TeacherService {
    static async createTeacher(schoolId, data) {
        // Create user in Auth (simulated or real) + Profile + Teacher record
        // Simplified for brevity:
        const { data: teacher, error } = await supabase_1.supabase
            .from('teachers')
            .insert([{ ...data, school_id: schoolId }])
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return teacher;
    }
    static async getAllTeachers(schoolId) {
        const { data, error } = await supabase_1.supabase
            .from('teachers')
            .select('*')
            .eq('school_id', schoolId)
            .order('created_at', { ascending: false });
        if (error)
            throw new Error(error.message);
        return data;
    }
    static async getTeacherById(schoolId, id) {
        const { data, error } = await supabase_1.supabase
            .from('teachers')
            .select('*')
            .eq('school_id', schoolId)
            .eq('id', id)
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    static async updateTeacher(schoolId, id, updates) {
        const { data, error } = await supabase_1.supabase
            .from('teachers')
            .update(updates)
            .eq('school_id', schoolId)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    static async deleteTeacher(schoolId, id) {
        const { error } = await supabase_1.supabase
            .from('teachers')
            .delete()
            .eq('school_id', schoolId)
            .eq('id', id);
        if (error)
            throw new Error(error.message);
        return true;
    }
}
exports.TeacherService = TeacherService;
//# sourceMappingURL=teacher.service.js.map