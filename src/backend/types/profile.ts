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

/** What anyone can see at /u/:slug — no phone number, street or zip code. */
export type PublicProfileResponseType = Omit<ProfileContentType, "phoneNumber" | "address"> & {
  name: string;
  slug: string;
  location: string;
  updatedAt: string;
};
