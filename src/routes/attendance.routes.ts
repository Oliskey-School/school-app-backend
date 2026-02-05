import { Router } from 'express';
import { getAttendance, saveAttendance, getAttendanceByStudent } from '../controllers/attendance.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, getAttendance);
router.post('/', authenticate, saveAttendance);
router.get('/student/:studentId', authenticate, getAttendanceByStudent);

export default router;
