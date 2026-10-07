import type { Request, Response } from "express";
import { AuthUserId } from "@/backend/middleware/auth";
import { analyzerService } from "@/backend/modules/analyzer/analyzer.service";

export const analyzerController = {
  List: async (req: Request, res: Response) => {
    res.json(await analyzerService.List(AuthUserId(req)));
  },
  Get: async (req: Request, res: Response) => {
    res.json(await analyzerService.Get(AuthUserId(req), String(req.params.id)));
  },
  Generate: async (req: Request, res: Response) => {
    res.status(201).json(await analyzerService.Generate(AuthUserId(req), req.body));
  },
};
