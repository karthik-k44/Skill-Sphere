export type AIAnalyzerResult = {
  analysis: string | Record<string, unknown>;
  source: "ai" | "fallback";
  model?: string;
  warning?: string;
};
