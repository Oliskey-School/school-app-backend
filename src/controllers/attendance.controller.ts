import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { AttendanceService } from '../services/attendance.service';

export const getAttendance = async (req: AuthRequest, res: Response) => {
    try {
        const { classId, date } = req.query;
        if (!classId || !date) {
            return res.status(400).json({ message: 'classId and date are required' });
        }
        const result = await AttendanceService.getAttendance(req.user.school_id, classId as string, date as string);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const saveAttendance = async (req: AuthRequest, res: Response) => {
    try {
        const { records } = req.body;
        if (!records || !Array.isArray(records)) {
            return res.status(400).json({ message: 'records array is required' });
        }
        const result = await AttendanceService.saveAttendance(req.user.school_id, records);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAttendanceByStudent = async (req: AuthRequest, res: Response) => {
    try {
        const { studentId } = req.params;
        const result = await AttendanceService.getAttendanceByStudent(req.user.school_id, studentId as string);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
