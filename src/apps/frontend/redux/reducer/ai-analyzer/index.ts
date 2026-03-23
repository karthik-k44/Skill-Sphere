import { createSlice } from "@reduxjs/toolkit";
import { initialAiAnalyzerState } from "./initial-value";
import { GetAiAnalyzedData } from "./action";

const AiAnalyzerSlice = createSlice({
  name: "aiAnalyzer",
  initialState: initialAiAnalyzerState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(GetAiAnalyzedData.pending, (state) => {
      state.isAnalyzingLoading = true;
    });
    builder.addCase(GetAiAnalyzedData.fulfilled, (state, action) => {
      state.isAnalyzingLoading = false;
      state.getAnalyzedData = action.payload;
    });
    builder.addCase(GetAiAnalyzedData.rejected, (state, action) => {
      state.isAnalyzingLoading = false;
      state.isAnalyzingError = {
        code: action.error.code || "",
        message: action.error.message || "",
      };
    });
  },
})

export default AiAnalyzerSlice.reducer