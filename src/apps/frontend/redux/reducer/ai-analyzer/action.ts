import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AIAnalyzerResult } from "../../../types";
import { AIAnalyzerService } from "../../../services";


const GetAiAnalyzedData = createAsyncThunk(
    'GetAiAnalyzedData',
    async (): Promise<AIAnalyzerResult> => {
        const response = await AIAnalyzerService.analyzeProfile();
        if (!response.data) {
            throw new Error("No data received from AI Analyzer");
        }
        return response.data as AIAnalyzerResult;
    },
)

export { GetAiAnalyzedData };