"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusService = void 0;
const supabase_1 = require("../config/supabase");
class BusService {
    static async getBuses(schoolId) {
        const { data, error } = await supabase_1.supabase
            .from('transport_buses')
            .select('*')
            .eq('school_id', schoolId)
            .order('name', { ascending: true });
        if (error)
            throw new Error(error.message);
        return data || [];
    }
    static async createBus(schoolId, busData) {
        const { data, error } = await supabase_1.supabase
            .from('transport_buses')
            .insert([{ ...busData, school_id: schoolId }])
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    static async updateBus(schoolId, busId, updates) {
        const { data, error } = await supabase_1.supabase
            .from('transport_buses')
            .update(updates)
            .eq('id', busId)
            .eq('school_id', schoolId)
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    static async deleteBus(schoolId, busId) {
        const { error } = await supabase_1.supabase
            .from('transport_buses')
            .delete()
            .eq('id', busId)
            .eq('school_id', schoolId);
        if (error)
            throw new Error(error.message);
        return true;
    }
}
exports.BusService = BusService;
//# sourceMappingURL=bus.service.js.map