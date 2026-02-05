import { supabase } from '../config/supabase';

export class TeacherService {
    static async createTeacher(schoolId: string, data: any) {
        // Create user in Auth (simulated or real) + Profile + Teacher record
        // Simplified for brevity:
        const { data: teacher, error } = await supabase
            .from('teachers')
            .insert([{ ...data, school_id: schoolId }])
            .select()
            .single();

        if (error) throw new Error(error.message);
        return teacher;
    }

    static async getAllTeachers(schoolId: string) {
        const { data, error } = await supabase
            .from('teachers')
            .select('*')
            .eq('school_id', schoolId)
            .order('created_at', { ascending: false });

        if (error) throw new Error(error.message);
        return data;
    }

    static async getTeacherById(schoolId: string, id: string) {
        const { data, error } = await supabase
            .from('teachers')
            .select('*')
            .eq('school_id', schoolId)
            .eq('id', id)
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    static async updateTeacher(schoolId: string, id: string, updates: any) {
        const { data, error } = await supabase
            .from('teachers')
            .update(updates)
            .eq('school_id', schoolId)
            .eq('id', id)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    static async deleteTeacher(schoolId: string, id: string) {
        const { error } = await supabase
            .from('teachers')
            .delete()
            .eq('school_id', schoolId)
            .eq('id', id);

        if (error) throw new Error(error.message);
        return true;
    }
}
