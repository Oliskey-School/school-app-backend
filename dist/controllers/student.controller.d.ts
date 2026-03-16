import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare const enrollStudent: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllStudents: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getStudentById: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateStudent: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteStudent: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=student.controller.d.ts.map