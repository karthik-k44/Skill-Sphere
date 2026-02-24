import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import AppService from "./app.service";

const AUTH_TOKEN_STORAGE_KEY = "authToken";
const APP_VERSION = import.meta.env.VITE_APP_VERSION as string | undefined;

export default class APIService extends AppService {
  protected readonly apiClient: AxiosInstance;
  protected readonly apiUrl: string;

  constructor() {
    super();
    this.apiUrl = `${this.appHost}/api`;
    this.apiClient = APIService.getAxiosInstance({
      baseURL: this.apiUrl,
    });

    this.apiClient.interceptors.request.use((config) => this.attachToken(config));
    this.apiClient.interceptors.response.use(
      (response) => {
        const serverVersion = response.headers["x-version"] as string | undefined;
        if (APP_VERSION && serverVersion && serverVersion !== APP_VERSION) {
          window.location.reload();
        }
        return response;
      },
      (error: unknown) => {
        const status = (
          error as {
            response?: {
              status?: number;
            };
          }
        ).response?.status;
        if (status === 401) {
          localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
        }
        return Promise.reject(error);
      },
    );
  }

  private attachToken(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
    const authorization = token ? `Bearer ${token}` : "";

    if (typeof config.headers.set === "function") {
      config.headers.set("Authorization", authorization);
      return config;
    }

    (config.headers as Record<string, string>).Authorization = authorization;
    return config;
  }
}
