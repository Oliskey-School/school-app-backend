"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStats = void 0;
const dashboard_service_1 = require("../services/dashboard.service");
const getStats = async (req, res) => {
    try {
        const stats = await dashboard_service_1.DashboardService.getStats(req.user.school_id);
        res.json(stats);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getStats = getStats;
//# sourceMappingURL=dashboard.controller.js.map