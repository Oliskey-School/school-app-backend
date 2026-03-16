import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare const getBuses: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createBus: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateBus: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteBus: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=bus.controller.d.ts.map