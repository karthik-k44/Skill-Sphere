import type { Request, Response } from "express";
import { AuthUserId } from "@/backend/middleware/auth";
import { roadmapService } from "@/backend/modules/roadmap/roadmap.service";

export const roadmapController = {
  GetMine: async (req: Request, res: Response) => {
    res.json(await roadmapService.GetMine(AuthUserId(req)));
  },
  Generate: async (req: Request, res: Response) => {
    res.status(201).json(await roadmapService.Generate(AuthUserId(req), req.body));
  },
  SetItemDone: async (req: Request, res: Response) => {
    res.json(await roadmapService.SetItemDone(AuthUserId(req), String(req.params.itemId), req.body.done));
  },
};
