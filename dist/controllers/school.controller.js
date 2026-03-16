"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSchoolById = exports.updateSchool = exports.listSchools = exports.createSchool = void 0;
const school_service_1 = require("../services/school.service");
const createSchool = async (req, res) => {
    try {
        const school = await school_service_1.SchoolService.createSchool(req.body);
        res.status(201).json(school);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createSchool = createSchool;
const listSchools = async (req, res) => {
    try {
        const schools = await school_service_1.SchoolService.getAllSchools();
        res.json(schools);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.listSchools = listSchools;
const updateSchool = async (req, res) => {
    try {
        const result = await school_service_1.SchoolService.updateSchool(req.params.id, req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateSchool = updateSchool;
const getSchoolById = async (req, res) => {
    try {
        const result = await school_service_1.SchoolService.getSchoolById(req.params.id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getSchoolById = getSchoolById;
//# sourceMappingURL=school.controller.js.map