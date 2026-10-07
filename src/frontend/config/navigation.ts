import { FileText, LayoutDashboard, Map, Sparkles, Target, UserRound, type LucideIcon } from "lucide-react";
import { paths } from "@/frontend/config/paths";

export type NavigationItem = {
  title: string;
  path: string;
  icon: LucideIcon;
  description: string;
};

export type NavigationGroup = { label: string; items: NavigationItem[] };

export const navigation: NavigationGroup[] = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", path: paths.app.dashboard, icon: LayoutDashboard, description: "Your career snapshot" },
      { title: "Profile", path: paths.app.profile, icon: UserRound, description: "Skills, experience and projects" },
    ],
  },
  {
    label: "AI tools",
    items: [
      { title: "AI Analyzer", path: paths.app.analyzer, icon: Sparkles, description: "Scores and feedback on your profile" },
      { title: "Job Match", path: paths.app.jobMatch, icon: Target, description: "Compare yourself to a job posting" },
      { title: "Roadmap", path: paths.app.roadmap, icon: Map, description: "A step-by-step learning plan" },
    ],
  },
  {
    label: "Export",
    items: [
      { title: "Resume Builder", path: paths.app.resume, icon: FileText, description: "Download a PDF resume" },
    ],
  },
];

export const FindNavigationItem = (pathname: string) =>
  navigation
    .flatMap((group) => group.items)
    .filter((item) => pathname === item.path || pathname.startsWith(`${item.path}/`))
    .sort((a, b) => b.path.length - a.path.length)[0];
