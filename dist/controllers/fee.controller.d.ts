import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
export declare const createFee: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getAllFees: (req: AuthRequest, res: Response) => Promise<void>;
export declare const getFeeById: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateFee: (req: AuthRequest, res: Response) => Promise<void>;
export declare const updateFeeStatus: (req: AuthRequest, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteFee: (req: AuthRequest, res: Response) => Promise<void>;
//# sourceMappingURL=fee.controller.d.ts.map