import type { LucideIcon } from "lucide-react";

export type FeaturePreview = {
  icon: LucideIcon;
  title: string;
  description: string;
  accentClassName: string;
};

export enum LaunchPhaseState {
  DONE = "done",
  ACTIVE = "active",
  NEXT = "next",
}

export type LaunchPhase = {
  title: string;
  description: string;
  state: LaunchPhaseState;
};