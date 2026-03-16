"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNotice = exports.createNotice = exports.getNotices = void 0;
const notice_service_1 = require("../services/notice.service");
const getNotices = async (req, res) => {
    try {
        const result = await notice_service_1.NoticeService.getNotices(req.user.school_id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getNotices = getNotices;
const createNotice = async (req, res) => {
    try {
        const result = await notice_service_1.NoticeService.createNotice(req.user.school_id, req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createNotice = createNotice;
const deleteNotice = async (req, res) => {
    try {
        await notice_service_1.NoticeService.deleteNotice(req.user.school_id, req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteNotice = deleteNotice;
//# sourceMappingURL=notice.controller.js.map