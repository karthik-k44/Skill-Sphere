import {
  SkillLevelTypeEnum,
  type ProfileContentType,
  type ProfileFormValues,
  type ProfileInput,
} from "../types";

type FormExperience = ProfileFormValues["experience"][number];
type FormEducation = ProfileFormValues["education"][number];

export const EmptySkill = () => ({ name: "", level: SkillLevelTypeEnum.INTERMEDIATE as string, rating: 3 });
export const EmptyExperience = (): FormExperience => ({
  company: "",
  role: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  description: "",
  skillAchieved: [],
  domainsWorked: [],
});
export const EmptyEducation = (): FormEducation => ({
  institution: "",
  degree: "",
  fieldOfStudy: "",
  startDate: "",
  endDate: "",
  grade: "",
});
export const EmptyProject = () => ({ title: "", description: "", link: "", techStack: [] as string[] });
export const EmptyCertification = () => ({ name: "", issuer: "", link: "" });
export const EmptyLanguage = () => ({ name: "", proficiency: "" });

/** ISO date → "YYYY-MM" for `<input type="month">`. */
const ToMonth = (iso: string | null) => (iso ? iso.slice(0, 7) : "");
const FromMonth = (month: string) => (month ? `${month}-01` : "");

export const ToFormValues = (profile: ProfileContentType | null): ProfileFormValues => ({
  headline: profile?.headline ?? "",
  targetRole: profile?.targetRole ?? "",
  summary: profile?.summary ?? "",
  phoneNumber: profile?.phoneNumber ?? "",
  address: profile?.address ?? { street: "", city: "", state: "", country: "", zipCode: "" },
  links: profile?.links ?? { github: "", linkedin: "", website: "" },
  skills: (profile?.skills ?? []).map((skill) => ({ ...skill, rating: skill.rating || 3 })),
  experience: (profile?.experience ?? []).map((item) => ({
    ...item,
    startDate: ToMonth(item.startDate),
    endDate: item.isCurrent ? "" : ToMonth(item.endDate),
  })),
  education: (profile?.education ?? []).map((item) => ({
    ...item,
    startDate: ToMonth(item.startDate),
    endDate: ToMonth(item.endDate),
  })),
  projects: profile?.projects ?? [],
  certifications: profile?.certifications ?? [],
  languages: profile?.languages ?? [],
  interests: (profile?.interests ?? []).map((interest) => interest.name).filter(Boolean),
});

export const ToProfileInput = (values: ProfileFormValues): ProfileInput => ({
  ...values,
  experience: values.experience.map((item) => ({
    ...item,
    startDate: FromMonth(item.startDate) || null,
    endDate: item.isCurrent ? null : FromMonth(item.endDate) || null,
  })),
  education: values.education.map((item) => ({
    ...item,
    startDate: FromMonth(item.startDate) || null,
    endDate: FromMonth(item.endDate) || null,
  })),
  interests: values.interests.map((name) => ({ name })),
});

const KeyOf = (...parts: string[]) => parts.join("|").trim().toLowerCase();

const MergeList = <T>(current: T[], incoming: T[], key: (item: T) => string) => {
  const seen = new Set(current.map(key));
  return [...current, ...incoming.filter((item) => !seen.has(key(item)))];
};

/** Fills blanks and appends new list entries from an import, never overwriting what the user typed. */
export const MergeIntoForm = (current: ProfileFormValues, imported: ProfileFormValues): ProfileFormValues => ({
  headline: current.headline || imported.headline,
  targetRole: current.targetRole || imported.targetRole,
  summary: current.summary || imported.summary,
  phoneNumber: current.phoneNumber || imported.phoneNumber,
  address: current.address.city ? current.address : imported.address,
  links: {
    github: current.links.github || imported.links.github,
    linkedin: current.links.linkedin || imported.links.linkedin,
    website: current.links.website || imported.links.website,
  },
  skills: MergeList(current.skills, imported.skills, (skill) => KeyOf(skill.name)),
  experience: MergeList(current.experience, imported.experience, (item) => KeyOf(item.company, item.role)),
  education: MergeList(current.education, imported.education, (item) => KeyOf(item.institution, item.degree)),
  projects: MergeList(current.projects, imported.projects, (item) => KeyOf(item.title)),
  certifications: MergeList(current.certifications, imported.certifications, (item) => KeyOf(item.name)),
  languages: MergeList(current.languages, imported.languages, (item) => KeyOf(item.name)),
  interests: MergeList(current.interests, imported.interests, (item) => KeyOf(item)),
});
