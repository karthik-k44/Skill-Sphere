import {
  FileText,
  FileUp,
  Globe,
  LayoutDashboard,
  Map,
  Sparkles,
  Target,
  UserRound,
  type LucideIcon,
} from "lucide-react";
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

/** Feature cards in the public "Features" mega-menu. Guests go to signup; signed-in users open the tool. */
export type PublicFeatureLink = { title: string; description: string; icon: LucideIcon; appPath: string };

export const publicFeatureLinks: PublicFeatureLink[] = [
  {
    title: "AI Analyzer",
    description: "A readiness score, area scores and the gaps holding you back.",
    icon: Sparkles,
    appPath: paths.app.analyzer,
  },
  {
    title: "Job Match",
    description: "Paste a posting, see your fit and the skills you're missing.",
    icon: Target,
    appPath: paths.app.jobMatch,
  },
  {
    title: "Learning Roadmap",
    description: "Your gaps, turned into project-driven steps you tick off.",
    icon: Map,
    appPath: paths.app.roadmap,
  },
  {
    title: "Resume Builder",
    description: "Two clean templates, generated from your profile as a PDF.",
    icon: FileText,
    appPath: paths.app.resume,
  },
  {
    title: "Resume & GitHub import",
    description: "Fill your profile from an old resume or your best repos.",
    icon: FileUp,
    appPath: paths.app.profile,
  },
  {
    title: "Public profile",
    description: "A portfolio page at your own link, contact details kept private.",
    icon: Globe,
    appPath: paths.app.profile,
  },
];

export const FindNavigationItem = (pathname: string) =>
  navigation
    .flatMap((group) => group.items)
    .filter((item) => pathname === item.path || pathname.startsWith(`${item.path}/`))
    .sort((a, b) => b.path.length - a.path.length)[0];
