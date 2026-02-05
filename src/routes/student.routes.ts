import { Router } from 'express';
import { enrollStudent, getAllStudents, getStudentById, updateStudent, deleteStudent } from '../controllers/student.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// All student routes are protected
router.post('/enroll', authenticate, enrollStudent);
router.get('/', authenticate, getAllStudents);
router.get('/:id', authenticate, getStudentById);
router.put('/:id', authenticate, updateStudent);
router.delete('/:id', authenticate, deleteStudent);

export default router;
