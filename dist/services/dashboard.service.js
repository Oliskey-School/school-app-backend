"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const supabase_1 = require("../config/supabase");
class DashboardService {
    static async getStats(schoolId) {
        // Parallel fetching for performance
        const [students, teachers, parents, fees] = await Promise.all([
            supabase_1.supabase.from('students').select('*', { count: 'exact', head: true }).eq('school_id', schoolId),
            supabase_1.supabase.from('teachers').select('*', { count: 'exact', head: true }).eq('school_id', schoolId),
            supabase_1.supabase.from('parents').select('*', { count: 'exact', head: true }).eq('school_id', schoolId),
            supabase_1.supabase.from('student_fees').select('total_fee, paid_amount').eq('school_id', schoolId).eq('status', 'Overdue')
        ]);
        const overdueFeesTotal = (fees.data || []).reduce((acc, fee) => acc + (fee.total_fee - fee.paid_amount), 0);
        return {
            totalStudents: students.count || 0,
            totalTeachers: teachers.count || 0,
            totalParents: parents.count || 0,
            overdueFees: overdueFeesTotal,
            // Mocking some trends/activity for the UI
            recentActivity: []
        };
    }
}
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map