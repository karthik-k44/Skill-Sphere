import type { ApiResponse, AIAnalyzerResult } from "../types";
import APIService from "./api.service";
import CommonService from "./common.service";

export class AIAnalyzerService extends APIService {
  static AIAnalyzerService(): AIAnalyzerResult | PromiseLike<AIAnalyzerResult> {
      throw new Error("Method not implemented.");
  }
  private static readonly instance = new AIAnalyzerService();

  public static async analyzeProfile(): Promise<ApiResponse<AIAnalyzerResult>> {
    try {
      const response = await this.instance.apiClient.post<ApiResponse<AIAnalyzerResult>>(
        "/ai-analyzer",
        {},
      );
      return response.data;
    } catch (error) {
      throw CommonService.toReadableError(error);
    }
  }
}
