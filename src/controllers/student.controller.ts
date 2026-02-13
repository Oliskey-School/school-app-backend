import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { StudentService } from '../services/student.service';

export const enrollStudent = async (req: AuthRequest, res: Response) => {
    try {
        const schoolId = req.user.school_id;
        if (!schoolId) {
            return res.status(400).json({ message: 'School ID is required' });
        }

        const result = await StudentService.enrollStudent(schoolId, req.body);
        res.status(201).json(result);
    } catch (error: any) {
        console.error('Enrollment controller error:', error);
        if (error.message.includes('required for enrollment')) {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
};

export const getAllStudents = async (req: AuthRequest, res: Response) => {
    try {
        const result = await StudentService.getAllStudents(req.user.school_id);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getStudentById = async (req: AuthRequest, res: Response) => {
    try {
        const result = await StudentService.getStudentById(req.user.school_id, req.params.id as string);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateStudent = async (req: AuthRequest, res: Response) => {
    try {
        const result = await StudentService.updateStudent(req.user.school_id, req.params.id as string, req.body);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteStudent = async (req: AuthRequest, res: Response) => {
    try {
        await StudentService.deleteStudent(req.user.school_id, req.params.id as string);
        res.status(204).send();
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
