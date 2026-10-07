import { z } from "zod";

const Text = (max: number, label = "This field") => z.string().trim().max(max, `${label} is too long`);
const Required = (max: number, message: string) => z.string().trim().min(1, message).max(max);
const Url = z
  .string()
  .trim()
  .max(300)
  .refine((value) => !value || /^https?:\/\/\S+\.\S+/.test(value), "Enter a full URL starting with https://");
/** `<input type="month">` value: "YYYY-MM" or "". */
const Month = z.string().regex(/^(\d{4}-\d{2})?$/, "Use the month picker");

const ExperienceFormSchema = z
  .object({
    company: Required(120, "Company is required"),
    role: Required(120, "Role is required"),
    startDate: Month,
    endDate: Month,
    isCurrent: z.boolean(),
    description: Text(2000, "Description"),
    skillAchieved: z.array(z.string()),
    domainsWorked: z.array(z.string()),
  })
  .refine((item) => item.isCurrent || !item.startDate || !item.endDate || item.endDate >= item.startDate, {
    path: ["endDate"],
    message: "End date must be after the start date",
  });

export const ProfileFormSchema = z.object({
  headline: Text(140, "Headline"),
  targetRole: Text(100, "Target role"),
  summary: Text(1500, "Summary"),
  phoneNumber: z
    .string()
    .trim()
    .refine((value) => !value || /^[+\d\s().-]{6,30}$/.test(value), "Enter a valid phone number"),
  address: z.object({
    street: Text(160),
    city: Text(80),
    state: Text(80),
    country: Text(80),
    zipCode: Text(20),
  }),
  links: z.object({ github: Url, linkedin: Url, website: Url }),
  skills: z.array(
    z.object({
      name: Required(60, "Name the skill or remove this row"),
      level: z.string(),
      rating: z.number().min(1).max(5),
    }),
  ),
  experience: z.array(ExperienceFormSchema),
  education: z.array(
    z.object({
      institution: Required(160, "Institution is required"),
      degree: Text(120),
      fieldOfStudy: Text(120),
      startDate: Month,
      endDate: Month,
      grade: Text(40),
    }),
  ),
  projects: z.array(
    z.object({
      title: Required(120, "Project title is required"),
      description: Text(1500, "Description"),
      link: Url,
      techStack: z.array(z.string()),
    }),
  ),
  certifications: z.array(z.object({ name: Required(160, "Certificate name is required"), issuer: Text(120), link: Url })),
  languages: z.array(z.object({ name: Required(60, "Language is required"), proficiency: z.string() })),
  interests: z.array(z.string()),
});

export type ProfileFormValues = z.infer<typeof ProfileFormSchema>;

export const ProfileStepTypeEnum = {
  BASICS: "basics",
  SKILLS: "skills",
  EXPERIENCE: "experience",
  EDUCATION: "education",
  PROJECTS: "projects",
  EXTRAS: "extras",
} as const;
export type ProfileStepTypeEnum = (typeof ProfileStepTypeEnum)[keyof typeof ProfileStepTypeEnum];
