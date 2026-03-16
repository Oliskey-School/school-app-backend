"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.signup = exports.login = void 0;
const auth_service_1 = require("../services/auth.service");
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await auth_service_1.AuthService.login(email, password);
        res.json({ token, user });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
};
exports.login = login;
const signup = async (req, res) => {
    try {
        const { user, token } = await auth_service_1.AuthService.signup(req.body);
        res.status(201).json({ user, token });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.signup = signup;
const createUser = async (req, res) => {
    try {
        const user = await auth_service_1.AuthService.createUser(req.body);
        res.status(201).json(user);
    }
    catch (error) {
        console.error('Create User Error:', error);
        res.status(400).json({ message: error.message });
    }
};
exports.createUser = createUser;
//# sourceMappingURL=auth.controller.js.map