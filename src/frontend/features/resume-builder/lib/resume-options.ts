import { ResumeSectionTypeEnum, ResumeTemplateTypeEnum, type ResumeOptionsType } from "../types";

export const ACCENT_COLORS = [
  { label: "Violet", value: "#7c3aed" },
  { label: "Indigo", value: "#4338ca" },
  { label: "Teal", value: "#0f766e" },
  { label: "Slate", value: "#334155" },
  { label: "Crimson", value: "#be123c" },
];

export const TEMPLATES = [
  { value: ResumeTemplateTypeEnum.CLASSIC, label: "Classic", description: "Single column, ATS-friendly" },
  { value: ResumeTemplateTypeEnum.MODERN, label: "Modern", description: "Sidebar for skills and contact" },
];

export const SECTION_LABELS: Record<ResumeSectionTypeEnum, string> = {
  summary: "Summary",
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  education: "Education",
  certifications: "Certifications",
  languages: "Languages",
};

export const DEFAULT_RESUME_OPTIONS: ResumeOptionsType = {
  template: ResumeTemplateTypeEnum.CLASSIC,
  accent: ACCENT_COLORS[0]!.value,
  sections: Object.fromEntries(
    Object.values(ResumeSectionTypeEnum).map((section) => [section, true]),
  ) as ResumeOptionsType["sections"],
};
