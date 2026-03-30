import APIService from "./api.service";
import CommonService from "./common.service";

export class AIAnalyzerService extends APIService {
  private static readonly instance = new AIAnalyzerService();

   public static CreateAIGeneratedInsights = async () => {
      try {
          const response = await this.instance.apiClient.post('/ai-analyzer');
          return response.data;
      } catch (error) {
          throw CommonService.toReadableError(error);;
      }
  }

  public static GetAIGeneratedInsights = async () => {
    try {
        const response = await this.instance.apiClient.get('/ai-analyzer');
        return response.data;
    } catch (error) {
        throw CommonService.toReadableError(error);;
    }
  }
}
