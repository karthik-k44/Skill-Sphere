// Mirrors src/backend/types/analysis.ts.

export const ImprovementPriorityTypeEnum = {
  HIGH: "high",
  MEDIUM: "medium",
  LOW: "low",
} as const;
export type ImprovementPriorityTypeEnum =
  (typeof ImprovementPriorityTypeEnum)[keyof typeof ImprovementPriorityTypeEnum];

export const LearningResourceTypeEnum = {
  DOCS: "docs",
  COURSE: "course",
  PROJECT: "project",
  VIDEO: "video",
  ARTICLE: "article",
  COMMUNITY: "community",
} as const;
export type LearningResourceTypeEnum =
  (typeof LearningResourceTypeEnum)[keyof typeof LearningResourceTypeEnum];

export type AnalysisScoresType = {
  skills: number;
  experience: number;
  projects: number;
  education: number;
  presentation: number;
};

export type ImprovementType = { title: string; detail: string; priority: ImprovementPriorityTypeEnum };
export type LearningResourceType = { title: string; type: LearningResourceTypeEnum; url: string; reason: string };

export type AnalysisResponseType = {
  id: string;
  targetRole: string;
  overallScore: number;
  scores: AnalysisScoresType;
  summary: string;
  strengths: string[];
  improvements: ImprovementType[];
  resources: LearningResourceType[];
  model: string;
  createdAt: string;
};

export type AnalysisSummaryType = Pick<AnalysisResponseType, "id" | "targetRole" | "overallScore" | "createdAt">;

export type AnalysisListResponseType = { items: AnalysisSummaryType[]; nextAllowedAt: string | null };

export type GenerateAnalysisInput = { targetRole: string };

/** Every analyzer type under one name — `TAnalyzerType["Response"]` etc. */
export type TAnalyzerType = {
  Response: AnalysisResponseType;
  Summary: AnalysisSummaryType;
  List: AnalysisListResponseType;
  Scores: AnalysisScoresType;
  Improvement: ImprovementType;
  Resource: LearningResourceType;
  GenerateInput: GenerateAnalysisInput;
  Priority: ImprovementPriorityTypeEnum;
  ResourceType: LearningResourceTypeEnum;
};
