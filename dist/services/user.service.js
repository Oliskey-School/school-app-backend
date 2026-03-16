"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const supabase_1 = require("../config/supabase");
class UserService {
    static async createUser(schoolId, data) {
        // Ensure user is created within the tenant
        const { data: user, error } = await supabase_1.supabase
            .from('users')
            .insert([{ ...data, school_id: schoolId }])
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return user;
    }
    static async getUsers(schoolId, role) {
        let query = supabase_1.supabase
            .from('users')
            .select('*')
            .eq('school_id', schoolId); // Tenant isolation
        if (role) {
            query = query.eq('role', role);
        }
        const { data: users, error } = await query;
        if (error)
            throw new Error(error.message);
        return users;
    }
    static async getUserById(schoolId, userId) {
        const { data: user, error } = await supabase_1.supabase
            .from('users')
            .select('*')
            .eq('id', userId)
            .eq('school_id', schoolId) // Tenant isolation
            .single();
        if (error)
            throw new Error(error.message);
        return user;
    }
    static async updateUser(schoolId, userId, updates) {
        const { data: user, error } = await supabase_1.supabase
            .from('users')
            .update(updates)
            .eq('id', userId)
            .eq('school_id', schoolId) // Strict isolation
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return user;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map