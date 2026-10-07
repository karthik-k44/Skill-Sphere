import type { Request, Response } from "express";
import { AuthUserId } from "@/backend/middleware/auth";
import { jobMatchService } from "@/backend/modules/job-match/job-match.service";

export const jobMatchController = {
  List: async (req: Request, res: Response) => {
    res.json(await jobMatchService.List(AuthUserId(req)));
  },
  Get: async (req: Request, res: Response) => {
    res.json(await jobMatchService.Get(AuthUserId(req), String(req.params.id)));
  },
  Create: async (req: Request, res: Response) => {
    res.status(201).json(await jobMatchService.Create(AuthUserId(req), req.body));
  },
  Remove: async (req: Request, res: Response) => {
    await jobMatchService.Remove(AuthUserId(req), String(req.params.id));
    res.status(204).end();
  },
};
