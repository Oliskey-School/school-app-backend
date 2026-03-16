"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParentService = void 0;
const supabase_1 = require("../config/supabase");
class ParentService {
    static async getParents(schoolId) {
        const { data, error } = await supabase_1.supabase
            .from('parents')
            .select(`
                *,
                parent_children (
                    student_id,
                    students (id, name, grade, section)
                )
            `)
            .eq('school_id', schoolId)
            .order('name');
        if (error)
            throw new Error(error.message);
        return (data || []).map((p) => ({
            ...p,
            childIds: p.parent_children?.map((pc) => pc.student_id) || []
        }));
    }
    static async createParent(schoolId, parentData) {
        const { data, error } = await supabase_1.supabase
            .from('parents')
            .insert([{ ...parentData, school_id: schoolId }])
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    static async getParentById(schoolId, id) {
        const { data, error } = await supabase_1.supabase
            .from('parents')
            .select(`
                *,
                parent_children (
                    student_id,
                    students (id, name, grade, section)
                )
            `)
            .eq('school_id', schoolId)
            .eq('id', id)
            .single();
        if (error)
            throw new Error(error.message);
        return {
            ...data,
            childIds: data.parent_children?.map((pc) => pc.student_id) || []
        };
    }
    static async updateParent(schoolId, id, updates) {
        const { data, error } = await supabase_1.supabase
            .from('parents')
            .update(updates)
            .eq('id', id)
            .eq('school_id', schoolId)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    static async deleteParent(schoolId, id) {
        const { error } = await supabase_1.supabase
            .from('parents')
            .delete()
            .eq('id', id)
            .eq('school_id', schoolId);
        if (error)
            throw new Error(error.message);
        return true;
    }
}
exports.ParentService = ParentService;
//# sourceMappingURL=parent.service.js.map