"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassService = void 0;
const supabase_1 = require("../config/supabase");
class ClassService {
    static async getClasses(schoolId) {
        const { data, error } = await supabase_1.supabase
            .from('classes')
            .select('*')
            .eq('school_id', schoolId)
            .order('grade', { ascending: true })
            .order('section', { ascending: true });
        if (error)
            throw new Error(error.message);
        return data || [];
    }
    static async createClass(schoolId, classData) {
        const { data, error } = await supabase_1.supabase
            .from('classes')
            .insert([{ ...classData, school_id: schoolId }])
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    static async updateClass(schoolId, id, updates) {
        const { data, error } = await supabase_1.supabase
            .from('classes')
            .update(updates)
            .eq('id', id)
            .eq('school_id', schoolId)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    static async deleteClass(schoolId, id) {
        const { error } = await supabase_1.supabase
            .from('classes')
            .delete()
            .eq('id', id)
            .eq('school_id', schoolId);
        if (error)
            throw new Error(error.message);
        return true;
    }
}
exports.ClassService = ClassService;
//# sourceMappingURL=class.service.js.map