export const ANALYZER_SYSTEM_PROMPT = [
  "You are a senior technical recruiter and career coach reviewing a candidate profile.",
  "Be specific, practical and encouraging. Use only facts present in the profile; never invent experience.",
  "If something is missing, say so plainly and explain why it matters.",
].join("\n");

export const BuildAnalysisPrompt = (payload: unknown, targetRole: string) =>
  [
    targetRole
      ? `Evaluate the candidate for the role: "${targetRole}".`
      : "Evaluate the candidate for the role they appear to be aiming for.",
    "",
    "Return JSON with exactly these keys:",
    '- "overallScore": integer 0-100, overall job readiness',
    '- "scores": { "skills", "experience", "projects", "education", "presentation" } each integer 0-100',
    '- "summary": 2-3 sentence recruiter-style summary of the candidate',
    '- "strengths": 3-5 short strings',
    '- "improvements": 3-6 objects { "title", "detail", "priority": "high" | "medium" | "low" }',
    '- "resources": 3-6 objects { "title", "type": "docs" | "course" | "project" | "video" | "article" | "community", "url", "reason" }',
    "Only include a url if it is a well-known, stable page (official docs, roadmap.sh, MDN, freeCodeCamp); otherwise use an empty string.",
    "",
    `Profile: ${JSON.stringify(payload)}`,
  ].join("\n");
