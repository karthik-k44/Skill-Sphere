import type { GithubImportResponseType, GithubRepoType } from "./github-type";
import type { ProfileFormValues, ProfileStepTypeEnum } from "./profile-form-type";

// Mirrors src/backend/types/profile.ts — duplicated on purpose (the browser never imports backend code).

export const SkillLevelTypeEnum = {
  BEGINNER: "Beginner",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  EXPERT: "Expert",
} as const;
export type SkillLevelTypeEnum = (typeof SkillLevelTypeEnum)[keyof typeof SkillLevelTypeEnum];

export const LanguageProficiencyTypeEnum = {
  BASIC: "Basic",
  CONVERSATIONAL: "Conversational",
  INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced",
  FLUENT: "Fluent",
  NATIVE: "Native",
} as const;
export type LanguageProficiencyTypeEnum =
  (typeof LanguageProficiencyTypeEnum)[keyof typeof LanguageProficiencyTypeEnum];

export type AddressType = { street: string; city: string; state: string; country: string; zipCode: string };
export type ProfileLinksType = { github: string; linkedin: string; website: string };
export type SkillType = { name: string; level: string; rating: number };
export type ExperienceType = {
  company: string;
  role: string;
  startDate: string | null;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  skillAchieved: string[];
  domainsWorked: string[];
};
export type EducationType = {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string | null;
  endDate: string | null;
  grade: string;
};
export type ProjectType = { title: string; description: string; link: string; techStack: string[] };
export type CertificationType = { name: string; issuer: string; link: string };
export type LanguageType = { name: string; proficiency: string };
export type InterestType = { name: string };

export type ProfileContentType = {
  headline: string;
  targetRole: string;
  summary: string;
  phoneNumber: string;
  address: AddressType;
  links: ProfileLinksType;
  skills: SkillType[];
  experience: ExperienceType[];
  education: EducationType[];
  projects: ProjectType[];
  certifications: CertificationType[];
  languages: LanguageType[];
  interests: InterestType[];
};

export type ProfileResponseType = ProfileContentType & {
  id: string;
  slug: string | null;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
};

/** Body of PUT /profile/me. Dates are ISO strings or "" for none. */
export type ProfileInput = ProfileContentType;

export type PublicSettingsInput = { isPublic: boolean; slug: string };

/** Every profile type under one name — `TProfileType["Response"]` etc. */
export type TProfileType = {
  Response: ProfileResponseType;
  Content: ProfileContentType;
  Input: ProfileInput;
  PublicSettingsInput: PublicSettingsInput;
  FormValues: ProfileFormValues;
  Step: ProfileStepTypeEnum;
  SkillLevel: SkillLevelTypeEnum;
  LanguageProficiency: LanguageProficiencyTypeEnum;
  GithubImport: GithubImportResponseType;
  GithubRepo: GithubRepoType;
};
