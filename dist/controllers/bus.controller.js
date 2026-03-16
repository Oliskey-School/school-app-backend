"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBus = exports.updateBus = exports.createBus = exports.getBuses = void 0;
const bus_service_1 = require("../services/bus.service");
const getBuses = async (req, res) => {
    try {
        const schoolId = req.user.school_id;
        const buses = await bus_service_1.BusService.getBuses(schoolId);
        res.json(buses);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getBuses = getBuses;
const createBus = async (req, res) => {
    try {
        const schoolId = req.user.school_id;
        const bus = await bus_service_1.BusService.createBus(schoolId, req.body);
        res.status(201).json(bus);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.createBus = createBus;
const updateBus = async (req, res) => {
    try {
        const schoolId = req.user.school_id;
        const bus = await bus_service_1.BusService.updateBus(schoolId, req.params.id, req.body);
        res.json(bus);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.updateBus = updateBus;
const deleteBus = async (req, res) => {
    try {
        const schoolId = req.user.school_id;
        await bus_service_1.BusService.deleteBus(schoolId, req.params.id);
        res.json({ message: 'Bus deleted successfully' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.deleteBus = deleteBus;
//# sourceMappingURL=bus.controller.js.map