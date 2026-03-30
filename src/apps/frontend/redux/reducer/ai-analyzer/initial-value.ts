import type { AiAnalyzerResponse, AsyncError } from "../../../types";


export type AiAnalyzerSliceType = {
  getAnalyzedData: AiAnalyzerResponse | null;
  isAnalyzingLoading: boolean;
  isAnalyzingError: AsyncError;
  createAnalyzedData: AiAnalyzerResponse | null;
  isCreatingAnalyzedDataLoading: boolean;
  isCreatingAnalyzedDataError: AsyncError;
}

export const initialAiAnalyzerState: AiAnalyzerSliceType = {
  getAnalyzedData: null,
  isAnalyzingLoading: false,
  isAnalyzingError: { code: "", message: "" },
  createAnalyzedData: null,
  isCreatingAnalyzedDataLoading: false,
  isCreatingAnalyzedDataError: { code: "", message: "" },
};
