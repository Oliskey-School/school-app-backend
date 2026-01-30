import { Router } from 'express';
import * as SchoolController from '../controllers/school.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/tenant.middleware';

const router = Router();

// Only Super Admins can list or create schools via this API (or open signup)
// For now, let's allow public creation for "Sign up your school" flow if needed,
// but usually that's a separate auth flow.
// Based on instructions, we'll protect list, maybe open create.

router.post('/', SchoolController.createSchool); // Public registration
router.get('/', authenticate, requireRole(['SuperAdmin']), SchoolController.listSchools);

export default router;
