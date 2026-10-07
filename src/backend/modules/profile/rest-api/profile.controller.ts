import type { Request, Response } from "express";
import { AuthUserId } from "@/backend/middleware/auth";
import { profileService } from "@/backend/modules/profile/profile.service";

export const profileController = {
  GetMine: async (req: Request, res: Response) => {
    res.json(await profileService.GetMine(AuthUserId(req)));
  },
  SaveMine: async (req: Request, res: Response) => {
    res.json(await profileService.SaveMine(AuthUserId(req), req.body));
  },
  UpdatePublicSettings: async (req: Request, res: Response) => {
    res.json(await profileService.UpdatePublicSettings(AuthUserId(req), req.body));
  },
};
