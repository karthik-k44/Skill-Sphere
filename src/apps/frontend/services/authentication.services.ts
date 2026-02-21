import type {
  ApiResponse,
  LoginParams,
  LoginResponse,
  SignUpParams,
  SignUpResponse,
} from "../types";
import axios from "axios";
import APIService from "./api.service";


export class AuthenticationService extends APIService {
  private static readonly instance = new AuthenticationService();

  public static async signUp(params: SignUpParams): Promise<SignUpResponse> {
    try {
      const response = await this.instance.apiClient.post<SignUpResponse>("/auth/signup", params);
      if (response.data.authToken) {
        localStorage.setItem("authToken", response.data.authToken);
      }
      return response.data;
    } catch (error) {
      throw this.toReadableError(error);
    }
  }

  public static async login(params: LoginParams): Promise<LoginResponse> {
    try {
      const response = await this.instance.apiClient.post<LoginResponse>("/auth/login", params);
      if (response.data.authToken) {
        localStorage.setItem("authToken", response.data.authToken);
      }
      return response.data;
    } catch (error) {
      throw this.toReadableError(error);
    }
  }

  private static toReadableError(error: unknown): Error {
    if (axios.isAxiosError(error)) {
      const message = (error.response?.data as { message?: string } | undefined)?.message;
      return new Error(message ?? "Request failed");
    }

    return error instanceof Error ? error : new Error("Request failed");
  }

  public static async getCurrentUser(): Promise<ApiResponse<{
    _id: string;
    name: string;
    email: string;
    role?: "user" | "admin";
  }>> {
    try {
      const response = await this.instance.apiClient.get<ApiResponse<{
        _id: string;
        name: string;
        email: string;
        role?: "user" | "admin";
      }>>("/auth/me");
      return response.data;
    } catch (error) {
      throw this.toReadableError(error);
    }
  }
}

export class AuthService extends APIService {
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
