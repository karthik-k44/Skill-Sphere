import { SkillLevelTypeEnum, type GithubImportResponseType, type ProfileFormValues } from "../types";

/** Adds the chosen repos as projects and their languages as skills, skipping anything already present. */
export const ApplyGithubImport = (
  values: ProfileFormValues,
  data: GithubImportResponseType,
  selected: Set<string>,
  includeLanguages: boolean,
): ProfileFormValues => {
  const projectTitles = new Set(values.projects.map((project) => project.title.toLowerCase()));
  const skillNames = new Set(values.skills.map((skill) => skill.name.toLowerCase()));

  const projects = data.repos
    .filter((repo) => selected.has(repo.name) && !projectTitles.has(repo.name.toLowerCase()))
    .map((repo) => ({
      title: repo.name,
      description: repo.description,
      link: repo.url,
      techStack: [repo.language, ...repo.topics].filter(Boolean).slice(0, 8),
    }));

  const skills = includeLanguages
    ? data.languages
        .filter((language) => !skillNames.has(language.name.toLowerCase()))
        .map((language) => ({ name: language.name, level: SkillLevelTypeEnum.INTERMEDIATE as string, rating: 3 }))
    : [];

  return {
    ...values,
    links: { ...values.links, github: values.links.github || `https://github.com/${data.username}` },
    projects: [...values.projects, ...projects],
    skills: [...values.skills, ...skills],
  };
};

/** "https://github.com/octocat" → "octocat" */
export const GithubUsernameFromUrl = (url: string) => url.match(/github\.com\/([^/?#]+)/i)?.[1] ?? "";
