import type { UserProfile } from "../../frontend/types";

export type SplitAIAnalysisMessageResult = {
  cleanedMessage: string;
  explanation: string;
  improvements: string;
  sources: string;
};

const StripCodeFences = (value: string) =>
  value
    .replace(/^```[a-zA-Z0-9_-]*\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

const RemoveParagraphLabel = (value: string) =>
  value.replace(
    /^(paragraph\s*[1-3]|summary|brief summary|improvements?|sources?|learning sources?)\s*[:.-]\s*/i,
    "",
  );

export const SplitAIAnalysisMessage = (
  value: string,
): SplitAIAnalysisMessageResult => {
  const cleanedMessage = StripCodeFences(value).replace(/\r\n/g, "\n").trim();

  const paragraphs = cleanedMessage
    .split(/\n\s*\n+/)
    .map((paragraph) => RemoveParagraphLabel(paragraph.trim()))
    .filter(Boolean);

  return {
    cleanedMessage,
    explanation: paragraphs[0] || "",
    improvements: paragraphs[1] || "",
    sources: paragraphs.slice(2).join("\n\n"),
  };
};


export const HasText = (value?: string | null) => Boolean(value?.trim());

export const NormalizeBaseUrl = (apiUrl?: string) => {
  if (!apiUrl || !apiUrl.trim()) {
    return "https://api.aimlapi.com/v1";
  }

  return apiUrl.replace(/\/chat\/completions\/?$/i, "");
};


export const BuildProfilePayload = (userProfile: UserProfile) => ({
  user: {
    name: userProfile.user?.name || "",
    role: userProfile.user?.role || "",
  },
  profile: {
    skills: (userProfile.userProfile?.skills || [])
      .filter(
        (skill) =>
          HasText(skill.name) || HasText(skill.level) || HasText(skill.rating),
      )
      .map((skill) => ({
        name: skill.name,
        level: skill.level,
        rating: skill.rating,
      })),
    experience: (userProfile.userProfile?.experience || [])
      .filter(
        (experience) =>
          HasText(experience.company) ||
          HasText(experience.role) ||
          (experience.skillAchieved || []).length > 0 ||
          (experience.domainsWorked || []).length > 0,
      )
      .map((experience) => ({
        company: experience.company,
        role: experience.role,
        skillAchieved: experience.skillAchieved,
        domainsWorked: experience.domainsWorked,
        startDate: experience.startDate,
        endDate: experience.endDate,
      })),
    education: (userProfile.userProfile?.education || [])
      .filter(
        (education) =>
          HasText(education.institution) ||
          HasText(education.degree) ||
          HasText(education.fieldOfStudy),
      )
      .map((education) => ({
        institution: education.institution,
        degree: education.degree,
        fieldOfStudy: education.fieldOfStudy,
        startDate: education.startDate,
        endDate: education.endDate,
      })),
    projects: (userProfile.userProfile?.projects || [])
      .filter(
        (project) =>
          HasText(project.title) ||
          HasText(project.description) ||
          HasText(project.link),
      )
      .map((project) => ({
        title: project.title,
        description: project.description,
        link: project.link,
      })),
    certifications: (userProfile.userProfile?.certifications || [])
      .filter(
        (certification) =>
          HasText(certification.name) || HasText(certification.link),
      )
      .map((certification) => ({
        name: certification.name,
        link: certification.link,
      })),
    languages: (userProfile.userProfile?.languages || [])
      .filter(
        (language) =>
          HasText(language.name) || HasText(language.proficiency),
      )
      .map((language) => ({
        name: language.name,
        proficiency: language.proficiency,
      })),
    interests: (userProfile.userProfile?.interests || [])
      .filter((interest) => HasText(interest.name))
      .map((interest) => ({
        name: interest.name,
      })),
  },
});

export const IsUserProfileEmpty = (userProfile: UserProfile) => {
  const profilePayload = BuildProfilePayload(userProfile);
  const profile = profilePayload.profile;

  return (
    profile.skills.length === 0 &&
    profile.experience.length === 0 &&
    profile.education.length === 0 &&
    profile.projects.length === 0 &&
    profile.certifications.length === 0 &&
    profile.languages.length === 0 &&
    profile.interests.length === 0
  );
};

export const BuildPromptContent = (userProfile: UserProfile) => {
  const profilePayload = BuildProfilePayload(userProfile);
  return [
    "Analyze this candidate profile.",
    "",
    "Write exactly 3 paragraphs in plain text.",
    "Do not return JSON.",
    "Do not use markdown.",
    "Do not use bullet points.",
    "Do not use headings.",
    "Do not use code fences.",
    "Keep the tone professional, practical, and encouraging.",
    "Use only the information provided in the profile data.",
    "Do not invent skills, achievements, or experience.",
    "If something is missing, mention it briefly and naturally.",
    "",
    "Paragraph 1: Write a short professional summary of the candidate, including their background, current role, major technical strengths, and overall profile impression.",
    "",
    "Paragraph 2: Explain clearly where the candidate needs improvement based only on the profile data. Focus on missing depth, missing certifications, limited project breadth, communication level, profile completeness, or career growth areas.",
    "",
    "Paragraph 3: Explain where and how the candidate can improve those areas. Mention practical sources such as official documentation, roadmap-based learning, project-based practice, GitHub, technical blogs, YouTube channels, or structured courses. Keep the suggestions relevant to the candidate's current stack.",
    "",
    `Profile data: ${JSON.stringify(profilePayload)}`,
  ].join("\n");
};
