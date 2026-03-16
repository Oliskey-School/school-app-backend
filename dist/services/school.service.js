"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolService = void 0;
const supabase_1 = require("../config/supabase");
class SchoolService {
    static async createSchool(data) {
        const { data: school, error } = await supabase_1.supabase
            .from('schools')
            .insert([data])
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return school;
    }
    static async getAllSchools() {
        const { data: schools, error } = await supabase_1.supabase
            .from('schools')
            .select('*');
        if (error)
            throw new Error(error.message);
        return schools;
    }
    static async getSchoolById(id) {
        const { data: school, error } = await supabase_1.supabase
            .from('schools')
            .select('*')
            .eq('id', id)
            .single();
        if (error)
            throw new Error(error.message);
        return school;
    }
    static async updateSchool(id, updates) {
        const { data: school, error } = await supabase_1.supabase
            .from('schools')
            .update(updates)
            .eq('id', id)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return school;
    }
}
exports.SchoolService = SchoolService;
//# sourceMappingURL=school.service.js.map