import axios, { type AxiosInstance, type CreateAxiosDefaults } from "axios";

export default class AppService {
  protected readonly appHost: string;

  constructor() {
    const envHost = import.meta.env.VITE_API_BASE_URL as string | undefined;
    this.appHost = envHost && envHost.trim().length > 0 ? envHost : window.location.origin;
  }

  protected static getAxiosInstance(config?: CreateAxiosDefaults): AxiosInstance {
    return axios.create(config);
  }
}
