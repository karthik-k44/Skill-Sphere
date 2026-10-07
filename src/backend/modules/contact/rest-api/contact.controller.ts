import type { Request, Response } from "express";
import { contactService } from "@/backend/modules/contact/contact.service";

export const contactController = {
  Create: async (req: Request, res: Response) => {
    res.status(201).json(await contactService.Create(req.body));
  },
};
