import type {
  ApiResponse,
  LoginParams,
  LoginResponse,
  SignUpParams,
  SignUpResponse,
} from "../types";
import axios from "axios";
import APIService from "./api.service";
import type { UserType } from "../types/authentication";
import CommonService from "./common.service";


export class AuthenticationService extends APIService {
  private static readonly instance = new AuthenticationService();

  public static async signUp(params: SignUpParams): Promise<SignUpResponse> {
    try {
      const response = await this.instance.apiClient.post<SignUpResponse>("/auth/signup", params);
      const authToken = response.data.data?.authToken;
      if (authToken) {
        localStorage.setItem("authToken", authToken);
        const userId = response.data.data?._id;
        if (userId) {
          localStorage.setItem("userId", userId);
        }
      }
      return response.data;
    } catch (error) {
      throw CommonService.toReadableError(error);
    }
  }

  public static async login(params: LoginParams): Promise<LoginResponse> {
    try {
      const response = await this.instance.apiClient.post<LoginResponse>("/auth/login", params);
      if (response.data.data?.authToken) {
        localStorage.setItem("authToken", response.data.data?.authToken);
        const userId = response.data.data?._id;
        if (userId) {
          localStorage.setItem("userId", userId);
        }
      }
      return response.data;
    } catch (error) {
      throw CommonService.toReadableError(error);;
    }
  }

  public static async getCurrentUser(): Promise<ApiResponse<{
    _id: string;
    name: string;
    email: string;
    role?: UserType;
  }>> {
    try {
      const response = await this.instance.apiClient.get<ApiResponse<{
        _id: string;
        name: string;
        email: string;
        role?: UserType;
      }>>("/auth/current-user");
      return response.data;
    } catch (error) {
      throw CommonService.toReadableError(error);;
    }
  }

  public async refreshToken(): Promise<ApiResponse<string>> {
    try {
      const response = await this.apiClient.get<ApiResponse<string>>("/auth/refresh-token");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = (error.response?.data as { message?: string } | undefined)?.message;
        throw new Error(message ?? "Unable to refresh token");
      }
      throw error instanceof Error ? error : new Error("Unable to refresh token");
    }
  }
}
