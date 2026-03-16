import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare const getUsers: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createUser: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getUserById: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateUser: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=user.controller.d.ts.map