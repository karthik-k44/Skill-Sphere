export const ROADMAP_SYSTEM_PROMPT = [
  "You are a pragmatic engineering mentor building a personal learning plan.",
  "Plans must be achievable alongside a job: small, concrete, project-driven steps that build on what the candidate already knows.",
].join("\n");

type FocusArea = { title: string; detail: string };

export const BuildRoadmapPrompt = (payload: unknown, targetRole: string, focusAreas: FocusArea[]) =>
  [
    targetRole ? `Target role: ${targetRole}` : "Target role: infer it from the profile.",
    focusAreas.length > 0 ? `Known improvement areas from a recent review: ${JSON.stringify(focusAreas)}` : "",
    "",
    "Return JSON: { \"items\": [...] } with 5-8 ordered steps. Each step is an object:",
    '- "title": short action, e.g. "Ship a REST API with auth and tests"',
    '- "description": 1-2 sentences on what to build or learn and how to prove it',
    '- "skill": the main skill this step develops',
    '- "durationWeeks": integer 1-6',
    '- "resources": 1-3 objects { "title", "url" } using only well-known stable URLs (official docs, roadmap.sh, MDN, freeCodeCamp); use "" when unsure',
    "",
    `Profile: ${JSON.stringify(payload)}`,
  ]
    .filter((line, index, lines) => line !== "" || lines[index - 1] !== "")
    .join("\n");
