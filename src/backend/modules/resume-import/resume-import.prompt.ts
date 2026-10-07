export const RESUME_IMPORT_SYSTEM_PROMPT = [
  "You convert resume text into structured profile data.",
  "Copy facts exactly as written. Never invent companies, dates, skills or links. Leave a field as an empty string when it is absent.",
].join("\n");

export const BuildResumeImportPrompt = (resumeText: string) =>
  [
    "Extract this resume into JSON with these keys:",
    '- "headline": one-line professional headline',
    '- "targetRole": the role the person is most likely targeting',
    '- "summary": their summary/objective, or "" if none',
    '- "phoneNumber"',
    '- "address": { "city", "state", "country" }',
    '- "links": { "github", "linkedin", "website" }',
    '- "skills": [{ "name", "level": "Beginner" | "Intermediate" | "Advanced" | "Expert", "rating": 1-5 }] — estimate level from how the skill is used',
    '- "experience": [{ "company", "role", "startDate": "YYYY-MM", "endDate": "YYYY-MM" or "", "isCurrent": boolean, "description", "skillAchieved": [strings], "domainsWorked": [strings] }]',
    '- "education": [{ "institution", "degree", "fieldOfStudy", "startDate": "YYYY-MM", "endDate": "YYYY-MM", "grade" }]',
    '- "projects": [{ "title", "description", "link", "techStack": [strings] }]',
    '- "certifications": [{ "name", "issuer", "link" }]',
    '- "languages": [{ "name", "proficiency" }]',
    '- "interests": [{ "name" }]',
    "",
    "Resume text:",
    '"""',
    resumeText,
    '"""',
  ].join("\n");
