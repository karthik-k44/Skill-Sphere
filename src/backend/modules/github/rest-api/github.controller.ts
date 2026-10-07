import type { Request, Response } from "express";
import { githubService } from "@/backend/modules/github/github.service";

export const githubController = {
  ImportUser: async (req: Request, res: Response) => {
    res.json(await githubService.ImportUser(String(req.params.username)));
  },
};
