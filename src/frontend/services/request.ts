import type { AxiosRequestConfig } from "axios";
import { httpClient } from "@/frontend/services/api";
import { ToApiError } from "@/frontend/services/api-error";

// The only way features talk to the API: each helper returns the response body and throws `ApiError`.

const Run = async <T>(request: Promise<{ data: T }>): Promise<T> => {
  try {
    return (await request).data;
  } catch (error) {
    throw ToApiError(error);
  }
};

export const Get = <T>(url: string, config?: AxiosRequestConfig) => Run<T>(httpClient.get<T>(url, config));

export const Post = <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
  Run<T>(httpClient.post<T>(url, body, config));

export const Put = <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
  Run<T>(httpClient.put<T>(url, body, config));

export const Patch = <T>(url: string, body?: unknown, config?: AxiosRequestConfig) =>
  Run<T>(httpClient.patch<T>(url, body, config));

export const Delete = <T = void>(url: string, config?: AxiosRequestConfig) =>
  Run<T>(httpClient.delete<T>(url, config));

export const PostFile = <T>(url: string, file: File, field = "file", config?: AxiosRequestConfig) => {
  const form = new FormData();
  form.append(field, file);
  return Run<T>(httpClient.post<T>(url, form, config));
};
