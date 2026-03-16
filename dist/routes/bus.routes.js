"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bus_controller_1 = require("../controllers/bus.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get('/', bus_controller_1.getBuses);
router.post('/', bus_controller_1.createBus);
router.put('/:id', bus_controller_1.updateBus);
router.delete('/:id', bus_controller_1.deleteBus);
exports.default = router;
//# sourceMappingURL=bus.routes.js.map