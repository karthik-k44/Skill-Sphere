/** The slice of a profile (saved or in the editor) that completeness is judged on. */
type CompletionInput = {
  headline: string;
  targetRole: string;
  summary: string;
  links: { github: string; linkedin: string; website: string };
  skills: unknown[];
  experience: unknown[];
  education: unknown[];
  projects: unknown[];
  certifications: unknown[];
};

export type CompletionItem = { key: string; label: string; done: boolean; step: string };

export const GetProfileCompletion = (profile: CompletionInput | null | undefined) => {
  const items: CompletionItem[] = [
    { key: "headline", label: "Headline and target role", done: Boolean(profile?.headline && profile.targetRole), step: "basics" },
    { key: "summary", label: "Professional summary", done: Boolean(profile?.summary), step: "basics" },
    { key: "skills", label: "At least 5 skills", done: (profile?.skills.length ?? 0) >= 5, step: "skills" },
    { key: "experience", label: "Work experience", done: (profile?.experience.length ?? 0) > 0, step: "experience" },
    { key: "education", label: "Education", done: (profile?.education.length ?? 0) > 0, step: "education" },
    { key: "projects", label: "At least 2 projects", done: (profile?.projects.length ?? 0) >= 2, step: "projects" },
    { key: "certifications", label: "A certification", done: (profile?.certifications.length ?? 0) > 0, step: "extras" },
    {
      key: "links",
      label: "GitHub, LinkedIn or website",
      done: Boolean(profile?.links.github || profile?.links.linkedin || profile?.links.website),
      step: "basics",
    },
  ];
  const doneCount = items.filter((item) => item.done).length;

  return { percent: Math.round((doneCount / items.length) * 100), items, doneCount };
};
