import { Router } from 'express';
import { createFee, getAllFees, getFeeById, updateFee, updateFeeStatus, deleteFee } from '../controllers/fee.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.post('/', authenticate, createFee);
router.get('/', authenticate, getAllFees);
router.get('/:id', authenticate, getFeeById);
router.put('/:id', authenticate, updateFee);
router.put('/:id/status', authenticate, updateFeeStatus);
router.delete('/:id', authenticate, deleteFee);

export default router;
