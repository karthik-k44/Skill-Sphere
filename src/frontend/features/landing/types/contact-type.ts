import { z } from "zod";

// Mirrors src/backend/types/contact.ts.

export const ContactTopicTypeEnum = {
  PROFILE: "Creating my profile",
  SKILLS: "Updating skills and experience",
  GAPS: "Understanding skill gaps",
  ANALYZER: "Using the AI analyzer",
  GENERAL: "General question",
} as const;
export type ContactTopicTypeEnum = (typeof ContactTopicTypeEnum)[keyof typeof ContactTopicTypeEnum];

export const ContactMessageSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(80),
  email: z.string().trim().min(1, "Email is required").pipe(z.email("Enter a valid email address")),
  currentRole: z.string().trim().max(100),
  topic: z.enum(Object.values(ContactTopicTypeEnum)),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(3000),
});

export type ContactMessageInput = z.infer<typeof ContactMessageSchema>;
export type ContactMessageResponseType = { id: string; createdAt: string };

/** Every landing type under one name. */
export type TLandingType = {
  ContactInput: ContactMessageInput;
  ContactResponse: ContactMessageResponseType;
  ContactTopic: ContactTopicTypeEnum;
};
