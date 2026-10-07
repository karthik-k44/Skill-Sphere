export type JobMatchResponseType = {
  id: string;
  jobTitle: string;
  company: string;
  jobDescription: string;
  matchScore: number;
  verdict: string;
  matchedSkills: string[];
  missingSkills: string[];
  tailoredBullets: string[];
  recommendations: string[];
  createdAt: string;
};

export type JobMatchSummaryType = Pick<
  JobMatchResponseType,
  "id" | "jobTitle" | "company" | "matchScore" | "createdAt"
>;
