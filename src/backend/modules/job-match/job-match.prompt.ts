import type { CreateJobMatchInput } from "@/backend/modules/job-match/job-match.validators";

export const JOB_MATCH_SYSTEM_PROMPT = [
  "You are an experienced technical recruiter comparing a candidate profile against a job posting.",
  "Judge fit honestly. Use only facts from the profile; never claim the candidate has a skill they did not list.",
].join("\n");

export const BuildJobMatchPrompt = (payload: unknown, job: CreateJobMatchInput) =>
  [
    `Job title: ${job.jobTitle}${job.company ? ` at ${job.company}` : ""}`,
    "Job description:",
    '"""',
    job.jobDescription,
    '"""',
    "",
    "Return JSON with exactly these keys:",
    '- "matchScore": integer 0-100, how well the profile fits the requirements',
    '- "verdict": 2-3 sentences explaining the score',
    '- "matchedSkills": requirements from the posting the candidate clearly meets',
    '- "missingSkills": important requirements the profile does not show',
    '- "tailoredBullets": 3-5 resume bullet points rewritten from the candidate\'s real experience and projects to target this job. Start each with a strong verb; do not invent numbers.',
    '- "recommendations": 3-5 concrete next steps to close the gaps before applying',
    "",
    `Candidate profile: ${JSON.stringify(payload)}`,
  ].join("\n");
