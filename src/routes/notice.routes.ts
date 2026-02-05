import { Router } from 'express';
import { getNotices, createNotice, deleteNotice } from '../controllers/notice.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, getNotices);
router.post('/', authenticate, createNotice);
router.delete('/:id', authenticate, deleteNotice);

export default router;
