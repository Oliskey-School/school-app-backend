import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import schoolRoutes from './school.routes';
import inviteRoutes from './invite.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/schools', schoolRoutes);
router.use('/', inviteRoutes); // Invite routes at root level

export default router;
