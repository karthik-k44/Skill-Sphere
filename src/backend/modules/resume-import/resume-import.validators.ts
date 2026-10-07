import { z } from "zod";
import { ProfileInputSchema } from "@/backend/modules/profile/profile.validators";

type Loose = Record<string, unknown>;

const AsArray = (value: unknown): Loose[] =>
  Array.isArray(value) ? value.filter((item): item is Loose => typeof item === "object" && item !== null) : [];

/** "2023-04" → "2023-04-01"; "Present"/garbage → null. */
const NormalizeDate = (value: unknown) => {
  if (typeof value !== "string") return null;
  const match = value.match(/^(\d{4})(?:-(\d{1,2}))?/);
  if (!match) return null;
  return `${match[1]}-${(match[2] ?? "01").padStart(2, "0")}-01`;
};

const WithDates = (items: Loose[]): Loose[] =>
  items.map((item) => ({ ...item, startDate: NormalizeDate(item.startDate), endDate: NormalizeDate(item.endDate) }));

/** Repairs the usual model slips (nameless skills, fractional ratings, free-form dates) before strict validation. */
const CleanDraft = (raw: unknown) => {
  const draft = (typeof raw === "object" && raw !== null ? raw : {}) as Loose;
  return {
    ...draft,
    skills: AsArray(draft.skills)
      .filter((skill) => typeof skill.name === "string" && skill.name.trim())
      .map((skill) => ({ ...skill, rating: Math.max(1, Math.min(5, Math.round(Number(skill.rating) || 3))) })),
    experience: WithDates(AsArray(draft.experience)).map((item) => ({ ...item, isCurrent: item.isCurrent === true })),
    education: WithDates(AsArray(draft.education)),
    projects: AsArray(draft.projects),
    certifications: AsArray(draft.certifications),
    languages: AsArray(draft.languages),
    interests: AsArray(draft.interests),
  };
};

export const ResumeDraftSchema = z.preprocess(CleanDraft, ProfileInputSchema);
