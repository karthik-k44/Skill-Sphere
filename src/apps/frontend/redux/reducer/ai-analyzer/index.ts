import { createSlice } from "@reduxjs/toolkit";
import { initialAiAnalyzerState } from "./initial-value";
import { CreateAIGeneratedInsights, GetAiAnalyzedData } from "./action";

const AiAnalyzerSlice = createSlice({
  name: "aiAnalyzer",
  initialState: initialAiAnalyzerState,
  reducers: {
    resetAiAnalyzerState: () => ({
      ...initialAiAnalyzerState,
      isAnalyzingError: { ...initialAiAnalyzerState.isAnalyzingError },
      isCreatingAnalyzedDataError: {
        ...initialAiAnalyzerState.isCreatingAnalyzedDataError,
      },
    }),
  },

  extraReducers: (builder) => {
    builder.addCase(GetAiAnalyzedData.pending, (state) => {
      state.isAnalyzingLoading = true;
      state.isAnalyzingError = { code: "", message: "" };
      state.isCreatingAnalyzedDataError = { code: "", message: "" };
    });
    builder.addCase(GetAiAnalyzedData.fulfilled, (state, action) => {
      state.isAnalyzingLoading = false;
      state.isAnalyzingError = { code: "", message: "" };
      state.isCreatingAnalyzedDataError = { code: "", message: "" };
      state.getAnalyzedData = action.payload;
    });
    builder.addCase(GetAiAnalyzedData.rejected, (state, action) => {
      state.isAnalyzingLoading = false;
      state.getAnalyzedData = null;
      state.isAnalyzingError = {
        code: action.error.code || "",
        message: action.error.message || "",
      };
    });
    builder.addCase(CreateAIGeneratedInsights.pending, (state) => {
      state.isCreatingAnalyzedDataLoading = true;
      state.isCreatingAnalyzedDataError = { code: "", message: "" };
      state.isAnalyzingError = { code: "", message: "" };
    });
    builder.addCase(CreateAIGeneratedInsights.fulfilled, (state, action) => {
      state.isCreatingAnalyzedDataLoading = false;
      state.isCreatingAnalyzedDataError = { code: "", message: "" };
      state.isAnalyzingError = { code: "", message: "" };
      state.createAnalyzedData = action.payload;
      state.getAnalyzedData = action.payload;
    });
    builder.addCase(CreateAIGeneratedInsights.rejected, (state, action) => {
      state.isCreatingAnalyzedDataLoading = false;
      state.isCreatingAnalyzedDataError = {
        code: action.error.code || "",
        message: action.error.message || "",
      };
    });
  },
})

export const { resetAiAnalyzerState } = AiAnalyzerSlice.actions;
export default AiAnalyzerSlice.reducer
