import { Router } from 'express';
import { getBuses, createBus, updateBus, deleteBus } from '../controllers/bus.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', getBuses);
router.post('/', createBus);
router.put('/:id', updateBus);
router.delete('/:id', deleteBus);

export default router;
