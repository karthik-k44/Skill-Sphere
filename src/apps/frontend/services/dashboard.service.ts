import axios from "axios";
import type { ApiResponse } from "../types";
import APIService from "./api.service";

export type DashboardData = {
  welcome: string;
  metrics: {
    activeCourses: number;
    completedCourses: number;
    skillScore: number;
  };
};

export class DashboardService extends APIService {
  private static readonly instance = new DashboardService();

  public static async getDashboardData(): Promise<ApiResponse<DashboardData>> {
    try {
      const response = await this.instance.apiClient.get<ApiResponse<DashboardData>>("/dashboard");
      return response.data;
    } catch (error) {
      throw this.toReadableError(error);
    }
  }

  private static toReadableError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const message = (error.response?.data as { message?: string } | undefined)?.message;
      return new Error(message ?? "Unable to fetch dashboard data");
    }

    return error instanceof Error ? error : new Error("Unable to fetch dashboard data");
  }
}
