import { useQuery } from "@tanstack/react-query";
import { Get } from "@/frontend/services/request";
import type { GithubImportResponseType } from "../types";

const GetGithubRepos = (username: string) =>
  Get<GithubImportResponseType>(`/github/users/${encodeURIComponent(username)}/repos`);

const githubKeys = {
  repos: (username: string) => ["github", username.toLowerCase(), "repos"] as const,
};

/** Fetches only once a username is submitted (pass "" to stay idle). */
const useGithubRepos = (username: string) =>
  useQuery({
    queryKey: githubKeys.repos(username),
    queryFn: () => GetGithubRepos(username),
    enabled: Boolean(username),
    staleTime: 10 * 60_000,
  });

export const githubService = { keys: githubKeys, GetGithubRepos, useGithubRepos };
