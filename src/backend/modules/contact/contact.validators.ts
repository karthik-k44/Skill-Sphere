import { z } from "zod";
import { ContactTopicTypeEnum } from "@/backend/types/contact";

export const CreateContactMessageSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address")),
  currentRole: z.string().trim().max(100).default(""),
  topic: z.enum(Object.values(ContactTopicTypeEnum)),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(3000),
});

export type CreateContactMessageInput = z.infer<typeof CreateContactMessageSchema>;
