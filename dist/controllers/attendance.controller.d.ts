import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare const getAttendance: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const saveAttendance: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAttendanceByStudent: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=attendance.controller.d.ts.map