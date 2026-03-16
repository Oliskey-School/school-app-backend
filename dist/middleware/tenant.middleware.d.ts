import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';
export declare const requireTenant: (req: AuthRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare const requireRole: (roles: string[]) => (req: AuthRequest, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=tenant.middleware.d.ts.map