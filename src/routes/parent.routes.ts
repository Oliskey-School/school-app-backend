import { Router } from 'express';
import { getParents, createParent, getParentById, updateParent, deleteParent } from '../controllers/parent.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, getParents);
router.post('/', authenticate, createParent);
router.get('/:id', authenticate, getParentById);
router.put('/:id', authenticate, updateParent);
router.delete('/:id', authenticate, deleteParent);

export default router;
