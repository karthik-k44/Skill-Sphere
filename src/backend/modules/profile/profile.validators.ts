import { z } from "zod";

const Text = (max: number) => z.string().trim().max(max).default("");
const TagList = z.array(z.string().trim().min(1).max(60)).max(30).default([]);
/** Accepts ISO strings, "" or null; empty values become null. */
const OptionalDate = z.preprocess(
  (value) => (value === "" || value === undefined ? null : value),
  z.coerce.date().nullable(),
);

export const SkillSchema = z.object({
  name: z.string().trim().min(1, "Skill name is required").max(60),
  level: Text(30),
  rating: z.coerce.number().int().min(1).max(5).default(3),
});

export const ExperienceSchema = z.object({
  company: Text(120),
  role: Text(120),
  startDate: OptionalDate,
  endDate: OptionalDate,
  isCurrent: z.boolean().default(false),
  description: Text(2000),
  skillAchieved: TagList,
  domainsWorked: TagList,
});

export const EducationSchema = z.object({
  institution: Text(160),
  degree: Text(120),
  fieldOfStudy: Text(120),
  startDate: OptionalDate,
  endDate: OptionalDate,
  grade: Text(40),
});

export const ProjectSchema = z.object({
  title: Text(120),
  description: Text(1500),
  link: Text(300),
  techStack: TagList,
});

export const ProfileInputSchema = z.object({
  headline: Text(140),
  targetRole: Text(100),
  summary: Text(1500),
  phoneNumber: Text(30),
  address: z
    .object({ street: Text(160), city: Text(80), state: Text(80), country: Text(80), zipCode: Text(20) })
    .default({ street: "", city: "", state: "", country: "", zipCode: "" }),
  links: z
    .object({ github: Text(300), linkedin: Text(300), website: Text(300) })
    .default({ github: "", linkedin: "", website: "" }),
  skills: z.array(SkillSchema).max(60).default([]),
  experience: z.array(ExperienceSchema).max(20).default([]),
  education: z.array(EducationSchema).max(10).default([]),
  projects: z.array(ProjectSchema).max(30).default([]),
  certifications: z.array(z.object({ name: Text(160), issuer: Text(120), link: Text(300) })).max(30).default([]),
  languages: z.array(z.object({ name: Text(60), proficiency: Text(30) })).max(20).default([]),
  interests: z.array(z.object({ name: Text(60) })).max(30).default([]),
});

const RESERVED_SLUGS = ["demo", "admin", "api", "login", "signup", "app", "settings"];

export const PublicSettingsSchema = z.object({
  isPublic: z.boolean(),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9][a-z0-9-]{1,38}[a-z0-9]$/, "Use 3-40 lowercase letters, numbers or dashes")
    .refine((slug) => !RESERVED_SLUGS.includes(slug), "That link is reserved, please pick another"),
});

export const SlugParamsSchema = z.object({ slug: z.string().trim().toLowerCase().min(1).max(40) });

export type ProfileInput = z.infer<typeof ProfileInputSchema>;
export type PublicSettingsInput = z.infer<typeof PublicSettingsSchema>;
