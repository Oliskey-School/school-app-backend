"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteParent = exports.updateParent = exports.getParentById = exports.createParent = exports.getParents = void 0;
const parent_service_1 = require("../services/parent.service");
const getParents = async (req, res) => {
    try {
        const result = await parent_service_1.ParentService.getParents(req.user.school_id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getParents = getParents;
const createParent = async (req, res) => {
    try {
        const result = await parent_service_1.ParentService.createParent(req.user.school_id, req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createParent = createParent;
const getParentById = async (req, res) => {
    try {
        const result = await parent_service_1.ParentService.getParentById(req.user.school_id, req.params.id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getParentById = getParentById;
const updateParent = async (req, res) => {
    try {
        const result = await parent_service_1.ParentService.updateParent(req.user.school_id, req.params.id, req.body);
        res.json(result);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateParent = updateParent;
const deleteParent = async (req, res) => {
    try {
        await parent_service_1.ParentService.deleteParent(req.user.school_id, req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteParent = deleteParent;
//# sourceMappingURL=parent.controller.js.map