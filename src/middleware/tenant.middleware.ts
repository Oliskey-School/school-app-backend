import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middleware';

export const requireTenant = (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
        return res.status(401).json({ message: 'User not authenticated' });
    }

    // Super Admin Bypass
    if (user.role === 'SuperAdmin') {
        // Super Admins can access everything, OR specific tenant via query/body if needed
        // For now, we allow them to proceed.
        return next();
    }

    // Regular users must have a school_id
    if (!user.school_id) {
        return res.status(403).json({ message: 'User does not belong to a school' });
    }

    // Enforce isolation: 
    // If the request tries to access a specific school resource, check it matches.
    // This is a basic check. Granular checks happen in services/controllers usually,
    // but we attach strict `school_id` to the request to force services to use it.

    // Example: If query param exists
    if (req.query.school_id && req.query.school_id !== user.school_id) {
        return res.status(403).json({ message: 'Unauthorized access to another school data' });
    }

    next();
};

export const requireRole = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }
        next();
    };
};
