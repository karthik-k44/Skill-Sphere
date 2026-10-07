import { z } from "zod";

export const ObjectIdSchema = z.string().regex(/^[a-f0-9]{24}$/i, "Invalid id");

export const IdParamsSchema = z.object({ id: ObjectIdSchema });
