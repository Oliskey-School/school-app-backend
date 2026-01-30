import { Request, Response } from 'express';
import { SchoolService } from '../services/school.service';

export const createSchool = async (req: Request, res: Response) => {
    try {
        const school = await SchoolService.createSchool(req.body);
        res.status(201).json(school);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const listSchools = async (req: Request, res: Response) => {
    try {
        const schools = await SchoolService.getAllSchools();
        res.json(schools);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
