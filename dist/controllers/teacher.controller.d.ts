import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare const createTeacher: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getAllTeachers: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getTeacherById: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateTeacher: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteTeacher: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=teacher.controller.d.ts.map