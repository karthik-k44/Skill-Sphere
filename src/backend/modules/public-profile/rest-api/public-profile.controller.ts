import type { Request, Response } from "express";
import { publicProfileService } from "@/backend/modules/public-profile/public-profile.service";

export const publicProfileController = {
  GetBySlug: async (req: Request, res: Response) => {
    res.json(await publicProfileService.GetBySlug(String(req.params.slug)));
  },
};
