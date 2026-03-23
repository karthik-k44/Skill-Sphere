import AuthenticationService from "../user/authentication-services";
import UserProfileReader from "../profile/internal/user-profile-reader";
import type { UserProfileResponse } from "../profile/types";

type AnalyzerUser = {
  name?: string;
  email?: string;
  role?: string;
};

export type AIAnalyzerResult = {
  analysis: string | Record<string, unknown>;
  source: "ai" | "fallback";
  model?: string;
  warning?: string;
};

const normalizeDate = (value?: string | Date) => {
  if (!value) {
    return null;
  }
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const diffInMonths = (start: Date, end: Date) => {
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();
  const total = years * 12 + months;
  return Math.max(total, 0);
};

const buildFallbackAnalysis = (profile: UserProfileResponse) => {
  const skills = Array.isArray(profile.skills) ? profile.skills : [];
  const experience = Array.isArray(profile.experience) ? profile.experience : [];
  const education = Array.isArray(profile.education) ? profile.education : [];
  const projects = Array.isArray(profile.projects) ? profile.projects : [];
  const certifications = Array.isArray(profile.certifications) ? profile.certifications : [];
  const languages = Array.isArray(profile.languages) ? profile.languages : [];
  const interests = Array.isArray(profile.interests) ? profile.interests : [];

  const domains = new Set<string>();
  for (const item of experience) {
    for (const domain of item.domainsWorked || []) {
      if (domain) {
        domains.add(domain);
      }
    }
  }

  const totalMonths = experience.reduce((sum, item) => {
    const start = normalizeDate(item.startDate);
    if (!start) {
      return sum;
    }
    const end = normalizeDate(item.endDate) ?? new Date();
    return sum + diffInMonths(start, end);
  }, 0);

  const topSkills = skills
    .map((skill) => skill.name)
    .filter(Boolean)
    .slice(0, 5);

  const gaps: string[] = [];
  if (projects.length === 0) gaps.push("Add 2-3 projects that showcase your strongest skills.");
  if (certifications.length === 0) gaps.push("Consider certifications to validate key skills.");
  if (experience.length === 0) gaps.push("Add at least one experience entry to anchor your profile.");
  if (education.length === 0) gaps.push("Include education or training details.");

  const recommendations: string[] = [];
  if (skills.length < 5) recommendations.push("Expand your skills list with both technical and soft skills.");
  if (languages.length === 0) recommendations.push("Add languages to improve recruiter relevance.");
  if (interests.length === 0) recommendations.push("List interests to humanize the profile.");

  const lines = [
    "Summary",
    `- Skills: ${skills.length}`,
    `- Experience entries: ${experience.length}`,
    `- Total experience: ${totalMonths} months`,
    `- Projects: ${projects.length}`,
    `- Certifications: ${certifications.length}`,
    `- Domains covered: ${domains.size}`,
    "",
    "Strengths",
    topSkills.length > 0 ? `- Top skills: ${topSkills.join(", ")}` : "- Add skills to highlight strengths.",
    domains.size > 0 ? `- Domain breadth: ${Array.from(domains).slice(0, 5).join(", ")}` : "- Add domains worked for clarity.",
    "",
    "Gaps",
    ...(gaps.length > 0 ? gaps.map((gap) => `- ${gap}`) : ["- No major gaps detected from the available data."]),
    "",
    "Next Steps",
    ...(recommendations.length > 0
      ? recommendations.map((rec) => `- ${rec}`)
      : ["- Keep your profile updated with recent achievements."]),
  ];

  return lines.join("\n");
};

const buildPromptData = (profile: UserProfileResponse, user?: AnalyzerUser) => ({
  user: {
    name: user?.name,
    role: user?.role,
  },
  profile: {
    skills: profile.skills,
    experience: profile.experience,
    education: profile.education,
    projects: profile.projects,
    certifications: profile.certifications,
    languages: profile.languages,
    interests: profile.interests,
  },
});

const buildPrompt = (profile: UserProfileResponse, user?: AnalyzerUser) => {
  const payload = buildPromptData(profile, user);
  return `
You are a senior career analyst and recruiter. Analyze the profile data and return JSON only.
Output must be a single JSON object with no markdown, no backticks, no extra text.
Use the schema:
{
  "brief_summary": "string",
  "average_skill_score": number,
  "focus_areas": [string, ...],
  "action_items": [string, ...],
  "strengths": [string, ...]
}
Rules:
- Use only information from the provided data.
- If data is missing, return an empty array or a short note in the relevant field.
- Keep arrays concise (max 6 items each).
- average_skill_score should be a 0-5 number rounded to 1 decimal.
Profile data: ${JSON.stringify(payload)}`.trim();
};

const stripCodeFences = (text: string) => {
  const trimmed = text.trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  return fenced ? fenced[1].trim() : trimmed;
};

const extractJsonPayload = (text: string) => {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    return null;
  }
  return text.slice(start, end + 1).trim();
};

const parseAnalysisJson = (analysis: string) => {
  const cleaned = stripCodeFences(analysis);
  const jsonCandidate = extractJsonPayload(cleaned);
  if (!jsonCandidate) {
    return { parsed: null, cleaned, warning: "AI response did not include a JSON object." };
  }

  try {
    const parsed = JSON.parse(jsonCandidate) as unknown;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { parsed: null, cleaned, warning: "AI response JSON was not an object." };
    }
    return { parsed: parsed as Record<string, unknown>, cleaned, warning: "" };
  } catch {
    return { parsed: null, cleaned, warning: "AI response was not valid JSON." };
  }
};

const extractAnthropicContent = (data: unknown) => {
  if (!data || typeof data !== "object") {
    return "";
  }

  const record = data as Record<string, unknown>;
  const content = record.content;
  if (Array.isArray(content)) {
    const text = content
      .map((item) => {
        if (!item || typeof item !== "object") {
          return "";
        }
        const entry = item as Record<string, unknown>;
        return entry.type === "text" && typeof entry.text === "string" ? entry.text : "";
      })
      .filter(Boolean)
      .join("");
    return text;
  }

  if (typeof record.completion === "string") {
    return record.completion;
  }

  return "";
};

const extractAnalysisFromResponse = (data: unknown) => {
  if (!data || typeof data !== "object") {
    return "";
  }

  const record = data as Record<string, unknown>;
  const direct = record.analysis || record.result || record.output || record.output_text || record.message;
  if (typeof direct === "string") {
    return direct;
  }

  const choices = record.choices;
  if (Array.isArray(choices) && choices.length > 0) {
    const first = choices[0] as Record<string, unknown>;
    const message = first.message as Record<string, unknown> | undefined;
    if (message && typeof message.content === "string") {
      return message.content;
    }
    if (typeof first.text === "string") {
      return first.text;
    }
  }

  return "";
};

const extractErrorMessage = async (response: Response) => {
  try {
    const text = await response.text();
    if (!text) {
      return "";
    }
    try {
      const json = JSON.parse(text) as Record<string, unknown>;
      const error = json.error as Record<string, unknown> | undefined;
      const message =
        (error && typeof error.message === "string" && error.message) ||
        (typeof json.message === "string" && json.message) ||
        text;
      return String(message);
    } catch {
      return text;
    }
  } catch {
    return "";
  }
};

export default class AIAnalyzerService {
  public static async GetAIGeneratedInsights( userId: string ): Promise<AIAnalyzerResult> {
    const profile = await UserProfileReader.getUserProfileByUserId(userId);
    if (!profile) {
      throw new Error("User profile not found");
    }
    const user = await AuthenticationService.getCurrentUser(userId);
    const fallback = buildFallbackAnalysis(profile);
    const apiUrl = process.env.AI_ANALYZER_API_URL;
    const model = process.env.AI_ANALYZER_MODEL;

    if (!apiUrl) {
      return {
        analysis: fallback,
        source: "fallback",
        warning: "AI_ANALYZER_API_URL is not configured",
      };
    }

    const style = (process.env.AI_ANALYZER_API_STYLE || "openai").toLowerCase();
    const apiKey = process.env.AI_ANALYZER_API_KEY;

    try {
      const prompt = buildPrompt(profile, user);
      console.log('fgwueywhgfijwehbfwebfeb prompt', prompt);
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      }
      if (apiKey) {
        headers.Authorization = `Bearer ${apiKey}`;
      }
      const payload = {
        model: model || 'google/gemma-3-4b-it',
        messages :[
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 512,
      };

      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });

      console.log('fgwueywhgfijwehbfwebfeb respons3eeeeeeeeeeeeeeeeeeeee', response);

      if (!response.ok) {
        const details = await extractErrorMessage(response);
        const suffix = details ? `: ${details}` : "";
        throw new Error(`AI API request failed with status ${response.status}${suffix}`);
      }

      const data = (await response.json()) as unknown;
      const analysis = style === "anthropic" ? extractAnthropicContent(data) : extractAnalysisFromResponse(data);

      if (!analysis) {
        throw new Error("AI API response did not include analysis text");
      }

      const parsed = parseAnalysisJson(analysis);
      if (parsed.parsed) {
        return {
          analysis: parsed.parsed,
          source: "ai",
          model,
        };
      }

      return {
        analysis: parsed.cleaned || analysis,
        source: "ai",
        model,
        warning: parsed.warning || "AI response was not valid JSON.",
      };
    } catch (error) {
      return {
        analysis: fallback,
        source: "fallback",
        warning: (error as Error).message,
      };
    }
  }
}
