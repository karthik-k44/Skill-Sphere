export const paths = {
  home: "/",
  login: "/login",
  signup: "/signup",
  publicProfile: (slug: string) => `/u/${slug}`,
  app: {
    dashboard: "/app",
    profile: "/app/profile",
    analyzer: "/app/analyzer",
    jobMatch: "/app/job-match",
    roadmap: "/app/roadmap",
    resume: "/app/resume",
  },
} as const;
