import { supabase } from '../config/supabase';

export class ParentService {
    static async getParents(schoolId: string) {
        const { data, error } = await supabase
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

        if (error) throw new Error(error.message);
        return (data || []).map((p: any) => ({
            ...p,
            childIds: p.parent_children?.map((pc: any) => pc.student_id) || []
        }));
    }

    static async createParent(schoolId: string, parentData: any) {
        const { data, error } = await supabase
            .from('parents')
            .insert([{ ...parentData, school_id: schoolId }])
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    static async getParentById(schoolId: string, id: string) {
        const { data, error } = await supabase
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

        if (error) throw new Error(error.message);
        return {
            ...data,
            childIds: data.parent_children?.map((pc: any) => pc.student_id) || []
        };
    }

    static async updateParent(schoolId: string, id: string, updates: any) {
        const { data, error } = await supabase
            .from('parents')
            .update(updates)
            .eq('id', id)
            .eq('school_id', schoolId)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    static async deleteParent(schoolId: string, id: string) {
        const { error } = await supabase
            .from('parents')
            .delete()
            .eq('id', id)
            .eq('school_id', schoolId);

        if (error) throw new Error(error.message);
        return true;
    }
}
