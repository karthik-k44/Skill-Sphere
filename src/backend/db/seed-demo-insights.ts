// Sample AI results for the demo account. AI routes are blocked for the demo (BlockDemoAccount), so these
// stand in for real runs: two analyses (to show history and progress), two job matches and a roadmap.
// They match DemoProfile in seed-data.ts — a frontend engineer aiming for full-stack roles.

const DaysAgo = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000);

export const DemoAnalyses = [
  {
    createdAt: DaysAgo(21),
    targetRole: "Full Stack Developer",
    overallScore: 64,
    scores: { skills: 70, experience: 58, projects: 52, education: 78, presentation: 60 },
    summary:
      "A frontend-leaning engineer with solid React and TypeScript experience and a clear product focus. Backend depth and project breadth are still thin for a full-stack role.",
    strengths: ["Production React and TypeScript work", "Measurable performance wins", "Clear career direction"],
    improvements: [
      { title: "Show backend ownership", detail: "No project demonstrates an API, auth or a database you designed.", priority: "high" },
      { title: "Add tests to your projects", detail: "Neither portfolio project mentions automated tests.", priority: "high" },
      { title: "Write a professional summary", detail: "Recruiters skim the summary first; yours is missing.", priority: "medium" },
      { title: "Earn one cloud credential", detail: "A cloud fundamentals certificate fills an obvious gap.", priority: "low" },
    ],
    resources: [
      { title: "roadmap.sh — Full Stack", type: "docs", url: "https://roadmap.sh/full-stack", reason: "A structured gap check for the target role." },
      { title: "Node.js Learn", type: "docs", url: "https://nodejs.org/en/learn", reason: "Official path to backend fundamentals." },
    ],
  },
  {
    createdAt: DaysAgo(2),
    targetRole: "Full Stack Developer",
    overallScore: 74,
    scores: { skills: 78, experience: 66, projects: 70, education: 80, presentation: 74 },
    summary:
      "A frontend engineer with two years of production React and TypeScript, now showing real full-stack work through the SkillSphere project. Strong, credible profile; the next step is depth in testing and deployment.",
    strengths: [
      "Owns a production analytics dashboard used by 40+ clients",
      "Quantified impact: 35% faster initial load",
      "Full-stack portfolio project with auth, AI and PDF export",
      "Consistent React, TypeScript and Node.js stack",
    ],
    improvements: [
      { title: "Prove testing depth", detail: "Add an integration test suite and mention coverage in your project write-ups.", priority: "high" },
      { title: "Show a deployment story", detail: "Docker is rated 2/5; ship one project with a container and CI pipeline.", priority: "medium" },
      { title: "Tighten project descriptions", detail: "Lead with the problem and the result, then the stack.", priority: "medium" },
      { title: "Add a LinkedIn link", detail: "Only GitHub is linked; recruiters expect LinkedIn too.", priority: "low" },
    ],
    resources: [
      { title: "Testing Library docs", type: "docs", url: "https://testing-library.com/docs/", reason: "Test React components the way users use them." },
      { title: "Docker — Get started", type: "course", url: "https://docs.docker.com/get-started/", reason: "Containerise one of your projects end to end." },
      { title: "MDN — HTTP overview", type: "article", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview", reason: "Solid backend fundamentals for API design interviews." },
      { title: "Build an API with auth", type: "project", url: "", reason: "One small, fully tested API is worth more than three tutorials." },
    ],
  },
].map((analysis) => ({ ...analysis, updatedAt: analysis.createdAt, model: "sample-data", totalTokens: 0 }));

export const DemoJobMatches = [
  {
    createdAt: DaysAgo(3),
    jobTitle: "Frontend Engineer",
    company: "Northwind Analytics",
    jobDescription:
      "We're hiring a Frontend Engineer to build data-heavy dashboards in React and TypeScript. You'll own features end to end, care about performance and accessibility, write tests with Jest or Vitest, and work closely with design. Nice to have: GraphQL, Playwright, charting libraries.",
    matchScore: 82,
    verdict: "A strong fit: your dashboard ownership and performance work map directly to this role. Testing and GraphQL are the gaps to address before applying.",
    matchedSkills: ["React", "TypeScript", "Performance optimisation", "Accessibility", "Dashboards"],
    missingSkills: ["GraphQL", "Playwright"],
    tailoredBullets: [
      "Owned the analytics dashboard used by 40+ enterprise clients, from API contract to accessible UI",
      "Cut initial load time by 35% with route-level code splitting and query caching",
      "Built reusable, accessible form components adopted across the product",
    ],
    recommendations: ["Add a Vitest suite to your SkillSphere project", "Build one small GraphQL feature", "Mention accessibility work explicitly"],
  },
  {
    createdAt: DaysAgo(6),
    jobTitle: "Full Stack Developer",
    company: "Brightpath Health",
    jobDescription:
      "Join a small product team building patient-facing tools. Stack: React, Node.js, PostgreSQL, AWS. You'll design APIs, write migrations, deploy with Docker and CI/CD, and mentor juniors. Healthcare or compliance experience is a plus.",
    matchScore: 61,
    verdict: "A reasonable stretch role. Your frontend strength is clear, but the posting leans on SQL, AWS and deployment experience your profile doesn't show yet.",
    matchedSkills: ["React", "Node.js", "TypeScript"],
    missingSkills: ["PostgreSQL", "AWS", "CI/CD", "Mentoring"],
    tailoredBullets: [
      "Delivered features end to end across React front ends and Node.js services",
      "Shipped an AI-powered career platform with authentication, MongoDB and PDF export",
    ],
    recommendations: ["Port one project's data layer to PostgreSQL", "Deploy a project on AWS with a CI pipeline", "Highlight any mentoring or code review you've done"],
  },
].map((match) => ({ ...match, updatedAt: match.createdAt, model: "sample-data" }));

export const DemoRoadmap = {
  targetRole: "Full Stack Developer",
  items: [
    { title: "Add integration tests to SkillSphere", skill: "Vitest", durationWeeks: 2, done: true, completedAt: DaysAgo(9),
      description: "Cover auth and profile routes with supertest against an in-memory database.",
      resources: [{ title: "Vitest guide", url: "https://vitest.dev/guide/" }] },
    { title: "Write project case studies", skill: "Communication", durationWeeks: 1, done: true, completedAt: DaysAgo(4),
      description: "Rewrite both project descriptions as problem → approach → measurable result.", resources: [] },
    { title: "Containerise and deploy one project", skill: "Docker", durationWeeks: 2, done: false, completedAt: null,
      description: "Add a Dockerfile, a CI workflow and a public deployment with a health check.",
      resources: [{ title: "Docker — Get started", url: "https://docs.docker.com/get-started/" }] },
    { title: "Build a small GraphQL API", skill: "GraphQL", durationWeeks: 2, done: false, completedAt: null,
      description: "Expose your profile data through a typed GraphQL schema with one mutation.",
      resources: [{ title: "GraphQL — Learn", url: "https://graphql.org/learn/" }] },
    { title: "Model data in PostgreSQL", skill: "SQL", durationWeeks: 3, done: false, completedAt: null,
      description: "Design tables, write migrations and query them from Node.js for one feature.",
      resources: [{ title: "PostgreSQL tutorial", url: "https://www.postgresql.org/docs/current/tutorial.html" }] },
    { title: "End-to-end tests for a key flow", skill: "Playwright", durationWeeks: 1, done: false, completedAt: null,
      description: "Automate signup → profile → analysis in a real browser and run it in CI.",
      resources: [{ title: "Playwright docs", url: "https://playwright.dev/docs/intro" }] },
  ],
};
