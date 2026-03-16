"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const class_controller_1 = require("../controllers/class.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get('/', auth_middleware_1.authenticate, class_controller_1.getClasses);
router.post('/', auth_middleware_1.authenticate, class_controller_1.createClass);
router.put('/:id', auth_middleware_1.authenticate, class_controller_1.updateClass);
router.delete('/:id', auth_middleware_1.authenticate, class_controller_1.deleteClass);
exports.default = router;
//# sourceMappingURL=class.routes.js.map