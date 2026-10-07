import type { ProfileDocType } from "@/backend/db/schema/profile.schema";
import type {
  ProfileContentType,
  ProfileResponseType,
  PublicProfileResponseType,
} from "@/backend/types/profile";

// Shared by profile, public-profile and every AI module, so it lives here rather than inside one service.

const IsoDate = (value?: Date | string | null) => (value ? new Date(value).toISOString() : null);
const Str = (value?: string | null) => value ?? "";
const Tags = (value?: (string | null | undefined)[] | null) => (value ?? []).filter((item): item is string => Boolean(item));

export const ToProfileContent = (doc: ProfileDocType): ProfileContentType => ({
  headline: Str(doc.headline),
  targetRole: Str(doc.targetRole),
  summary: Str(doc.summary),
  phoneNumber: Str(doc.phoneNumber),
  address: {
    street: Str(doc.address?.street),
    city: Str(doc.address?.city),
    state: Str(doc.address?.state),
    country: Str(doc.address?.country),
    zipCode: Str(doc.address?.zipCode),
  },
  links: { github: Str(doc.links?.github), linkedin: Str(doc.links?.linkedin), website: Str(doc.links?.website) },
  skills: (doc.skills ?? []).map((skill) => ({
    name: Str(skill.name),
    level: Str(skill.level),
    rating: Number(skill.rating) || 0,
  })),
  experience: (doc.experience ?? []).map((item) => ({
    company: Str(item.company),
    role: Str(item.role),
    startDate: IsoDate(item.startDate),
    endDate: item.isCurrent ? null : IsoDate(item.endDate),
    isCurrent: Boolean(item.isCurrent),
    description: Str(item.description),
    skillAchieved: Tags(item.skillAchieved),
    domainsWorked: Tags(item.domainsWorked),
  })),
  education: (doc.education ?? []).map((item) => ({
    institution: Str(item.institution),
    degree: Str(item.degree),
    fieldOfStudy: Str(item.fieldOfStudy),
    startDate: IsoDate(item.startDate),
    endDate: IsoDate(item.endDate),
    grade: Str(item.grade),
  })),
  projects: (doc.projects ?? []).map((item) => ({
    title: Str(item.title),
    description: Str(item.description),
    link: Str(item.link),
    techStack: Tags(item.techStack),
  })),
  certifications: (doc.certifications ?? []).map((item) => ({
    name: Str(item.name),
    issuer: Str(item.issuer),
    link: Str(item.link),
  })),
  languages: (doc.languages ?? []).map((item) => ({ name: Str(item.name), proficiency: Str(item.proficiency) })),
  interests: (doc.interests ?? []).map((item) => ({ name: Str(item.name) })),
});

export const ToProfileResponse = (doc: ProfileDocType): ProfileResponseType => ({
  ...ToProfileContent(doc),
  id: String(doc._id),
  slug: doc.slug ?? null,
  isPublic: Boolean(doc.isPublic),
  createdAt: new Date(doc.createdAt).toISOString(),
  updatedAt: new Date(doc.updatedAt).toISOString(),
});

export const ToPublicProfile = (doc: ProfileDocType, name: string): PublicProfileResponseType => {
  const { phoneNumber: _phone, address, ...content } = ToProfileContent(doc);
  return {
    ...content,
    name,
    slug: doc.slug ?? "",
    location: [address.city, address.state, address.country].filter(Boolean).join(", "),
    updatedAt: new Date(doc.updatedAt).toISOString(),
  };
};

export const IsProfileEmpty = (content: ProfileContentType) =>
  [content.skills, content.experience, content.education, content.projects, content.certifications].every(
    (list) => list.length === 0,
  ) && !content.headline && !content.summary;

const MonthOf = (iso: string | null) => (iso ? iso.slice(0, 7) : "");

/** Compact, PII-free view of a profile for LLM prompts: no phone, no address, empty entries dropped. */
export const ToAiProfilePayload = (content: ProfileContentType, name: string) => ({
  name,
  headline: content.headline,
  targetRole: content.targetRole,
  summary: content.summary,
  skills: content.skills.filter((skill) => skill.name),
  experience: content.experience
    .filter((item) => item.company || item.role)
    .map((item) => ({
      ...item,
      startDate: MonthOf(item.startDate),
      endDate: item.isCurrent ? "present" : MonthOf(item.endDate),
    })),
  education: content.education
    .filter((item) => item.institution || item.degree)
    .map((item) => ({ ...item, startDate: MonthOf(item.startDate), endDate: MonthOf(item.endDate) })),
  projects: content.projects.filter((item) => item.title),
  certifications: content.certifications.filter((item) => item.name),
  languages: content.languages.filter((item) => item.name),
  interests: content.interests.map((item) => item.name).filter(Boolean),
});
