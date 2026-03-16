import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare const getNotices: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createNotice: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteNotice: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=notice.controller.d.ts.map