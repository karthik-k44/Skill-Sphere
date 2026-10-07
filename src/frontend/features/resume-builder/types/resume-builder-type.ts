export const ResumeTemplateTypeEnum = {
  CLASSIC: "classic",
  MODERN: "modern",
} as const;
export type ResumeTemplateTypeEnum = (typeof ResumeTemplateTypeEnum)[keyof typeof ResumeTemplateTypeEnum];

export const ResumeSectionTypeEnum = {
  SUMMARY: "summary",
  SKILLS: "skills",
  EXPERIENCE: "experience",
  PROJECTS: "projects",
  EDUCATION: "education",
  CERTIFICATIONS: "certifications",
  LANGUAGES: "languages",
} as const;
export type ResumeSectionTypeEnum = (typeof ResumeSectionTypeEnum)[keyof typeof ResumeSectionTypeEnum];

export type ResumeOptionsType = {
  template: ResumeTemplateTypeEnum;
  accent: string;
  sections: Record<ResumeSectionTypeEnum, boolean>;
};

export type ResumeEntryType = {
  title: string;
  subtitle: string;
  period: string;
  description: string;
  tags: string[];
};

/** Profile data flattened into exactly what a template prints. */
export type ResumeDataType = {
  name: string;
  headline: string;
  contact: string[];
  summary: string;
  skills: { name: string; level: string }[];
  experience: ResumeEntryType[];
  projects: ResumeEntryType[];
  education: ResumeEntryType[];
  certifications: ResumeEntryType[];
  languages: string[];
};

/** Every resume-builder type under one name — `TResumeBuilderType["Options"]` etc. */
export type TResumeBuilderType = {
  Template: ResumeTemplateTypeEnum;
  Section: ResumeSectionTypeEnum;
  Options: ResumeOptionsType;
  Data: ResumeDataType;
  Entry: ResumeEntryType;
};
