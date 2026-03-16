"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFee = exports.updateFeeStatus = exports.updateFee = exports.getFeeById = exports.getAllFees = exports.createFee = void 0;
const fee_service_1 = require("../services/fee.service");
const createFee = async (req, res) => {
    try {
        const result = await fee_service_1.FeeService.createFee(req.user.school_id, req.body);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.createFee = createFee;
const getAllFees = async (req, res) => {
    try {
        const result = await fee_service_1.FeeService.getAllFees(req.user.school_id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllFees = getAllFees;
const getFeeById = async (req, res) => {
    try {
        const result = await fee_service_1.FeeService.getFeeById(req.user.school_id, req.params.id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getFeeById = getFeeById;
const updateFee = async (req, res) => {
    try {
        const result = await fee_service_1.FeeService.updateFee(req.user.school_id, req.params.id, req.body);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateFee = updateFee;
const updateFeeStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }
        const result = await fee_service_1.FeeService.updateFeeStatus(req.user.school_id, req.params.id, status);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.updateFeeStatus = updateFeeStatus;
const deleteFee = async (req, res) => {
    try {
        await fee_service_1.FeeService.deleteFee(req.user.school_id, req.params.id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.deleteFee = deleteFee;
//# sourceMappingURL=fee.controller.js.map