import { BadGateway, NotFound, TooManyRequests } from "@/backend/common/errors/app-error";
import { env } from "@/backend/config/env";
import type { GithubImportResponseType, GithubRepoType } from "@/backend/types/github";

const GITHUB_API = "https://api.github.com";
const MAX_REPOS = 30;

type GithubApiRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  fork: boolean;
  archived: boolean;
  pushed_at: string;
  owner: { avatar_url: string };
};

const Headers = () => ({
  Accept: "application/vnd.github+json",
  "User-Agent": "SkillSphere",
  ...(env.GITHUB_TOKEN ? { Authorization: `Bearer ${env.GITHUB_TOKEN}` } : {}),
});

const ToRepo = (repo: GithubApiRepo): GithubRepoType => ({
  name: repo.name,
  description: repo.description ?? "",
  url: repo.html_url,
  homepage: repo.homepage ?? "",
  language: repo.language ?? "",
  stars: repo.stargazers_count,
  topics: repo.topics ?? [],
  updatedAt: repo.pushed_at,
});

/** Public, non-fork repositories for a user, ranked by stars then recent activity. */
const ImportUser = async (username: string): Promise<GithubImportResponseType> => {
  const response = await fetch(`${GITHUB_API}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`, {
    headers: Headers(),
  });

  if (response.status === 404) throw NotFound(`GitHub user "${username}" was not found`);
  if (response.status === 403 || response.status === 429) {
    throw TooManyRequests("GitHub's rate limit was reached. Please try again in a few minutes.");
  }
  if (!response.ok) throw BadGateway("GitHub could not be reached right now.");

  const all = (await response.json()) as GithubApiRepo[];
  const repos = all
    .filter((repo) => !repo.fork && !repo.archived)
    .sort((a, b) => b.stargazers_count - a.stargazers_count || b.pushed_at.localeCompare(a.pushed_at))
    .slice(0, MAX_REPOS);

  const languageCounts = new Map<string, number>();
  for (const repo of repos) {
    if (repo.language) languageCounts.set(repo.language, (languageCounts.get(repo.language) ?? 0) + 1);
  }

  return {
    username,
    avatarUrl: all[0]?.owner.avatar_url ?? "",
    repos: repos.map(ToRepo),
    languages: [...languageCounts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count),
  };
};

export const githubService = { ImportUser };
