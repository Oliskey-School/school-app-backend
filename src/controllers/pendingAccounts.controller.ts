import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { PendingAccountsService } from "../services/pendingAccounts.service";

const getAccessToken = (req: AuthRequest) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")?.[1];
  if (!token) {
    throw new Error("No token provided");
  }
  return token;
};

export const createPending = async (req: AuthRequest, res: Response) => {
  try {
    const token = getAccessToken(req);

    // Force tenant from authenticated user unless explicitly provided and matches
    const school_id = req.user?.school_id;
    const payload = { ...req.body, school_id };

    const row = await PendingAccountsService.createPending(token, payload);
    res.status(201).json(row);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const listPending = async (req: AuthRequest, res: Response) => {
  try {
    const token = getAccessToken(req);
    const school_id = req.user?.school_id;

    const rows = await PendingAccountsService.listPending(token, {
      school_id,
      status: req.query.status,
    });

    res.json(rows);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const approvePending = async (req: AuthRequest, res: Response) => {
  try {
    const token = getAccessToken(req);
    const { id } = req.params;

    const result = await PendingAccountsService.approvePending(token, id);
    res.status(200).json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
