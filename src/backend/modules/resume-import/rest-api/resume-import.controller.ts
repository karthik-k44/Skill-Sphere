import type { Request, Response } from "express";
import { resumeImportService } from "@/backend/modules/resume-import/resume-import.service";

export const resumeImportController = {
  Parse: async (req: Request, res: Response) => {
    res.json(await resumeImportService.ParseResume(req.file));
  },
};
