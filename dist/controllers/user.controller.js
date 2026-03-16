"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.getUserById = exports.createUser = exports.getUsers = void 0;
const user_service_1 = require("../services/user.service");
const getUsers = async (req, res) => {
    try {
        // School ID comes from the authenticated token
        const schoolId = req.user.school_id;
        const users = await user_service_1.UserService.getUsers(schoolId, req.query.role);
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUsers = getUsers;
const createUser = async (req, res) => {
    try {
        const schoolId = req.user.school_id;
        const user = await user_service_1.UserService.createUser(schoolId, req.body);
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createUser = createUser;
const getUserById = async (req, res) => {
    try {
        const result = await user_service_1.UserService.getUserById(req.user.school_id, req.params.id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getUserById = getUserById;
const updateUser = async (req, res) => {
    try {
        const result = await user_service_1.UserService.updateUser(req.user.school_id, req.params.id, req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateUser = updateUser;
//# sourceMappingURL=user.controller.js.map