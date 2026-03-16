"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeService = void 0;
const supabase_1 = require("../config/supabase");
class NoticeService {
    static async getNotices(schoolId) {
        const { data, error } = await supabase_1.supabase
            .from('notices')
            .select('*')
            .eq('school_id', schoolId)
            .order('timestamp', { ascending: false });
        if (error)
            throw new Error(error.message);
        return data || [];
    }
    static async createNotice(schoolId, noticeData) {
        const { data, error } = await supabase_1.supabase
            .from('notices')
            .insert([{
                ...noticeData,
                school_id: schoolId,
                timestamp: new Date().toISOString()
            }])
            .select()
            .single();
        if (error)
            throw new Error(error.message);
        return data;
    }
    static async deleteNotice(schoolId, id) {
        const { error } = await supabase_1.supabase
            .from('notices')
            .delete()
            .eq('id', id)
            .eq('school_id', schoolId);
        if (error)
            throw new Error(error.message);
        return true;
    }
}
exports.NoticeService = NoticeService;
//# sourceMappingURL=notice.service.js.map