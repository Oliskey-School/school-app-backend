import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { ParentService } from '../services/parent.service';

export const getParents = async (req: AuthRequest, res: Response) => {
    try {
        const result = await ParentService.getParents(req.user.school_id);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const createParent = async (req: AuthRequest, res: Response) => {
    try {
        const result = await ParentService.createParent(req.user.school_id, req.body);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const getParentById = async (req: AuthRequest, res: Response) => {
    try {
        const result = await ParentService.getParentById(req.user.school_id, req.params.id as string);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateParent = async (req: AuthRequest, res: Response) => {
    try {
        const result = await ParentService.updateParent(req.user.school_id, req.params.id as string, req.body);
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteParent = async (req: AuthRequest, res: Response) => {
    try {
        await ParentService.deleteParent(req.user.school_id, req.params.id as string);
        res.status(204).send();
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};
