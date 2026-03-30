export type AiAnalyzerResponse ={
  userId: string;
  analyzeId: string;
  analyzeMessage: {
    explanation: string;
    improvements: string;
    sources: string;
  };
  createdAt?: string;
  updatedAt?: string;
  nextAllowedAt?: string;
  canGenerate: boolean;
}
