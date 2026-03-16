import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare const createSchool: (req: Request, res: Response) => Promise<void>;
export declare const listSchools: (req: Request, res: Response) => Promise<void>;
export declare const updateSchool: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getSchoolById: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=school.controller.d.ts.map