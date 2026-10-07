import type { ProfileContentType } from "@/backend/types/profile";

/** Sample profile loaded into the demo account so visitors can try every feature without typing. */
export const DemoProfile: ProfileContentType = {
  headline: "Frontend Engineer building accessible React products",
  targetRole: "Full Stack Developer",
  summary:
    "Frontend engineer with two years of experience shipping React and TypeScript dashboards. Comfortable owning features end to end, from API contracts to polished, accessible UI.",
  phoneNumber: "+1 555 0100",
  address: { street: "", city: "Bengaluru", state: "Karnataka", country: "India", zipCode: "" },
  links: { github: "https://github.com/octocat", linkedin: "", website: "" },
  skills: [
    { name: "React", level: "Advanced", rating: 4 },
    { name: "TypeScript", level: "Advanced", rating: 4 },
    { name: "Node.js", level: "Intermediate", rating: 3 },
    { name: "Tailwind CSS", level: "Advanced", rating: 4 },
    { name: "MongoDB", level: "Intermediate", rating: 3 },
    { name: "Docker", level: "Beginner", rating: 2 },
  ],
  experience: [
    {
      company: "Brightlane Labs",
      role: "Frontend Engineer",
      startDate: "2024-07-01",
      endDate: null,
      isCurrent: true,
      description:
        "Own the analytics dashboard used by 40+ enterprise clients. Cut initial load time by 35% with route-level code splitting and query caching.",
      skillAchieved: ["React", "TypeScript", "React Query"],
      domainsWorked: ["SaaS", "Analytics"],
    },
    {
      company: "Pixel Forge",
      role: "Frontend Intern",
      startDate: "2023-12-01",
      endDate: "2024-06-01",
      isCurrent: false,
      description: "Built reusable form components and migrated legacy pages from jQuery to React.",
      skillAchieved: ["React", "CSS"],
      domainsWorked: ["E-commerce"],
    },
  ],
  education: [
    {
      institution: "State Institute of Technology",
      degree: "B.Tech",
      fieldOfStudy: "Computer Science",
      startDate: "2020-08-01",
      endDate: "2024-05-01",
      grade: "8.4 CGPA",
    },
  ],
  projects: [
    {
      title: "SkillSphere",
      description: "AI-assisted career platform with profile analytics, job matching and PDF resume export.",
      link: "https://github.com/karthik-k44/skill-sphere",
      techStack: ["React", "Express", "MongoDB", "TanStack Query"],
    },
    {
      title: "Budget Buddy",
      description: "Expense tracker with recurring transactions and monthly charts.",
      link: "",
      techStack: ["React", "Recharts", "Firebase"],
    },
  ],
  certifications: [{ name: "Meta Front-End Developer", issuer: "Coursera", link: "" }],
  languages: [
    { name: "English", proficiency: "Fluent" },
    { name: "Hindi", proficiency: "Native" },
  ],
  interests: [{ name: "Open source" }, { name: "Design systems" }],
};
