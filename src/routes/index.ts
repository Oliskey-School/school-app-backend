import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import schoolRoutes from './school.routes';
import inviteRoutes from './invite.routes';
import studentRoutes from './student.routes';
import teacherRoutes from './teacher.routes';
import feeRoutes from './fee.routes';
import busRoutes from './bus.routes';
import dashboardRoutes from './dashboard.routes';
import classRoutes from './class.routes';
import parentRoutes from './parent.routes';
import noticeRoutes from './notice.routes';
import attendanceRoutes from './attendance.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/schools', schoolRoutes);
router.use('/students', studentRoutes);
router.use('/teachers', teacherRoutes);
router.use('/fees', feeRoutes);
router.use('/buses', busRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/classes', classRoutes);
router.use('/parents', parentRoutes);
router.use('/notices', noticeRoutes);
router.use('/attendance', attendanceRoutes);
router.use('/', inviteRoutes);

export default router;
