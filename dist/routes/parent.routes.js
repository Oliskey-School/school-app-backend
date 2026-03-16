"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const parent_controller_1 = require("../controllers/parent.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get('/', auth_middleware_1.authenticate, parent_controller_1.getParents);
router.post('/', auth_middleware_1.authenticate, parent_controller_1.createParent);
router.get('/:id', auth_middleware_1.authenticate, parent_controller_1.getParentById);
router.put('/:id', auth_middleware_1.authenticate, parent_controller_1.updateParent);
router.delete('/:id', auth_middleware_1.authenticate, parent_controller_1.deleteParent);
exports.default = router;
//# sourceMappingURL=parent.routes.js.map