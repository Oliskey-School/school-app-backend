"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClass = exports.updateClass = exports.createClass = exports.getClasses = void 0;
const class_service_1 = require("../services/class.service");
const getClasses = async (req, res) => {
    try {
        const result = await class_service_1.ClassService.getClasses(req.user.school_id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getClasses = getClasses;
const createClass = async (req, res) => {
    try {
        const result = await class_service_1.ClassService.createClass(req.user.school_id, req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createClass = createClass;
const updateClass = async (req, res) => {
    try {
        const result = await class_service_1.ClassService.updateClass(req.user.school_id, req.params.id, req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateClass = updateClass;
const deleteClass = async (req, res) => {
    try {
        await class_service_1.ClassService.deleteClass(req.user.school_id, req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteClass = deleteClass;
//# sourceMappingURL=class.controller.js.map