import { createAsyncThunk } from "@reduxjs/toolkit";
import { AIAnalyzerService } from "../../../services";
import type { AiAnalyzerResponse } from "../../../types";


const GetAiAnalyzedData = createAsyncThunk(
    'GetAiAnalyzedData',
    async (): Promise<AiAnalyzerResponse | null> => {
        const response = await AIAnalyzerService.GetAIGeneratedInsights();
        return (response.data ?? null) as AiAnalyzerResponse | null;
    },
)

const CreateAIGeneratedInsights = createAsyncThunk(
    'CreateAIGeneratedInsights',
    async (): Promise<AiAnalyzerResponse> => {
        const response = await AIAnalyzerService.CreateAIGeneratedInsights();
        if (!response.data) {
            throw new Error("No data received from AI Analyzer");
        }
        return response.data as AiAnalyzerResponse;
    },
)
export { GetAiAnalyzedData, CreateAIGeneratedInsights };
