export const ContactTopicTypeEnum = {
  PROFILE: "Creating my profile",
  SKILLS: "Updating skills and experience",
  GAPS: "Understanding skill gaps",
  ANALYZER: "Using the AI analyzer",
  GENERAL: "General question",
} as const;
export type ContactTopicTypeEnum = (typeof ContactTopicTypeEnum)[keyof typeof ContactTopicTypeEnum];

export type ContactMessageResponseType = { id: string; createdAt: string };
