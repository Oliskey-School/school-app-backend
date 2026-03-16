"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fee_controller_1 = require("../controllers/fee.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post('/', auth_middleware_1.authenticate, fee_controller_1.createFee);
router.get('/', auth_middleware_1.authenticate, fee_controller_1.getAllFees);
router.get('/:id', auth_middleware_1.authenticate, fee_controller_1.getFeeById);
router.put('/:id', auth_middleware_1.authenticate, fee_controller_1.updateFee);
router.put('/:id/status', auth_middleware_1.authenticate, fee_controller_1.updateFeeStatus);
router.delete('/:id', auth_middleware_1.authenticate, fee_controller_1.deleteFee);
exports.default = router;
//# sourceMappingURL=fee.routes.js.map