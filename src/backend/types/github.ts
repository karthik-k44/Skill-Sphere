export type GithubRepoType = {
  name: string;
  description: string;
  url: string;
  homepage: string;
  language: string;
  stars: number;
  topics: string[];
  updatedAt: string;
};

export type GithubImportResponseType = {
  username: string;
  avatarUrl: string;
  repos: GithubRepoType[];
  languages: { name: string; count: number }[];
};
