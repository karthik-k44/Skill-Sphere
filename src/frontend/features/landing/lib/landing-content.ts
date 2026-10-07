import { FileText, FileUp, Github, Globe, Map, Sparkles, Target, UserRoundPlus, type LucideIcon } from "lucide-react";

export type LandingFeature = { icon: LucideIcon; title: string; description: string };

export const FEATURES: LandingFeature[] = [
  {
    icon: Sparkles,
    title: "AI profile analysis",
    description: "A recruiter-style review with an overall readiness score, area scores, strengths and prioritised gaps.",
  },
  {
    icon: Target,
    title: "Job description matching",
    description: "Paste any posting to see your fit, the skills you're missing, and resume bullets written for that role.",
  },
  {
    icon: Map,
    title: "Personal learning roadmap",
    description: "Turn your gaps into 5–8 project-driven steps and tick them off as you go.",
  },
  {
    icon: FileText,
    title: "PDF resume builder",
    description: "Two clean, ATS-friendly templates generated straight from your profile. Download in one click.",
  },
  {
    icon: FileUp,
    title: "Resume import",
    description: "Upload your current PDF resume and the AI fills in your profile for you to review.",
  },
  {
    icon: Github,
    title: "GitHub import",
    description: "Pull your best public repositories in as projects, with their languages as skills.",
  },
  {
    icon: Globe,
    title: "Shareable public profile",
    description: "Publish a portfolio-style page at your own link. Phone and address stay private.",
  },
  {
    icon: UserRoundPlus,
    title: "Guided profile builder",
    description: "Step-by-step editor with autosaved drafts and a strength meter that shows what's missing.",
  },
];

export const STEPS = [
  { title: "Build your profile", description: "Import your resume or GitHub, or fill in the guided editor." },
  { title: "Get honest feedback", description: "Run the AI analyzer and match yourself against real job posts." },
  { title: "Close the gaps", description: "Follow your roadmap, then export a resume tailored to the role." },
];
