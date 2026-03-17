import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware";
import { requireRole, requireTenant } from "../middleware/tenant.middleware";
import * as PendingAccountsController from "../controllers/pendingAccounts.controller";

const router = Router();

router.use(authenticate);
router.use(requireTenant);

router.get("/", PendingAccountsController.listPending);
router.post("/", PendingAccountsController.createPending);
router.post(
  "/:id/approve",
  requireRole(["admin", "proprietor", "super_admin"]),
  PendingAccountsController.approvePending,
);

export default router;
