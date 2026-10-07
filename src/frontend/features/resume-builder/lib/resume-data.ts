import type { ProfileResponseType } from "@/frontend/features/profile/types";
import { FormatDateRange } from "@/frontend/utils/format";
import type { ResumeDataType } from "../types";

/** "https://github.com/octocat/" → "github.com/octocat" */
const ShortUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/i, "").replace(/\/$/, "");

export const ToResumeData = (profile: ProfileResponseType, name: string, email: string): ResumeDataType => {
  const location = [profile.address.city, profile.address.state, profile.address.country].filter(Boolean).join(", ");
  const links = [profile.links.linkedin, profile.links.github, profile.links.website].filter(Boolean).map(ShortUrl);

  return {
    name,
    headline: profile.headline || profile.targetRole,
    contact: [email, profile.phoneNumber, location, ...links].filter(Boolean),
    summary: profile.summary,
    skills: [...profile.skills]
      .sort((a, b) => b.rating - a.rating)
      .map((skill) => ({ name: skill.name, level: skill.level })),
    experience: profile.experience.map((item) => ({
      title: item.role,
      subtitle: item.company,
      period: FormatDateRange(item.startDate, item.endDate, item.isCurrent),
      description: item.description,
      tags: item.skillAchieved,
    })),
    projects: profile.projects.map((item) => ({
      title: item.title,
      subtitle: item.link ? ShortUrl(item.link) : "",
      period: "",
      description: item.description,
      tags: item.techStack,
    })),
    education: profile.education.map((item) => ({
      title: [item.degree, item.fieldOfStudy].filter(Boolean).join(", ") || item.institution,
      subtitle: [item.degree || item.fieldOfStudy ? item.institution : "", item.grade].filter(Boolean).join(" · "),
      period: FormatDateRange(item.startDate, item.endDate),
      description: "",
      tags: [],
    })),
    certifications: profile.certifications.map((item) => ({
      title: item.name,
      subtitle: item.issuer,
      period: "",
      description: "",
      tags: [],
    })),
    languages: profile.languages.map((item) => (item.proficiency ? `${item.name} (${item.proficiency})` : item.name)),
  };
};
