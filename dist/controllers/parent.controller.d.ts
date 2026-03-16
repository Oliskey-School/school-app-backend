import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare const getParents: (req: AuthRequest, res: Response) => Promise<void>;
export declare const createParent: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getParentById: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateParent: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteParent: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=parent.controller.d.ts.map