import { Bot, Briefcase, Download, GraduationCap, LayoutTemplate, Sparkles } from "lucide-react";
import { LaunchPhaseState, type FeaturePreview, type LaunchPhase } from "../types/resume-builder";

export const FeaturePreviews: FeaturePreview[] = [
  {
    icon: LayoutTemplate,
    title: "Smart Resume Layouts",
    description:
      "Choose from clean, recruiter-friendly templates shaped from your profile data.",
    accentClassName: "bg-primary-100 text-primary-700",
  },
  {
    icon: Sparkles,
    title: "One-Click Content Drafting",
    description:
      "Convert your projects, skills, and achievements into polished resume-ready sections.",
    accentClassName: "bg-primary-200 text-primary-800",
  },
  {
    icon: Download,
    title: "Ready-to-Export Output",
    description:
      "Download a professional resume once your content and layout are finalized.",
    accentClassName: "bg-primary-50 text-primary-700",
  },
];

export const ResumeIngredients = [
  {
    icon: Briefcase,
    title: "Experience & Project Highlights",
    description:
      "Your existing work history and projects will help shape stronger resume bullets.",
  },
  {
    icon: GraduationCap,
    title: "Education & Credentials",
    description:
      "Degrees, certifications, and profile details will flow directly into the builder.",
  },
  {
    icon: Bot,
    title: "AI-Assisted Refinement",
    description:
      "Use your analyzer insights to make the final resume sharper and more targeted.",
  },
];

export const LaunchPhases: LaunchPhase[] = [
  {
    title: "Profile sync layer",
    description: "Connect your Skill Sphere profile directly into the builder.",
    state: LaunchPhaseState.DONE,
  },
  {
    title: "Template and section engine",
    description: "Structure resume blocks with better ordering and visual balance.",
    state: LaunchPhaseState.ACTIVE,
  },
  {
    title: "Export and sharing flow",
    description: "Package the final resume into a clean downloadable document.",
    state: LaunchPhaseState.NEXT,
  },
];