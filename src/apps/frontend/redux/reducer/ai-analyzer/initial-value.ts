import type { AIAnalyzerResult, AsyncError } from "../../../types"

export type AiAnalyzerSliceType = {
  getAnalyzedData?: AIAnalyzerResult;
  isAnalyzingLoading: boolean;
  isAnalyzingError: AsyncError;
}

export const initialAiAnalyzerState: AiAnalyzerSliceType = {
  getAnalyzedData: undefined,
  isAnalyzingLoading: false,
  isAnalyzingError: { code: "", message: "" },
};