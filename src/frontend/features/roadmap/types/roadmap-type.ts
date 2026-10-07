// Mirrors src/backend/types/roadmap.ts.

export type RoadmapResourceType = { title: string; url: string };

export type RoadmapItemType = {
  id: string;
  title: string;
  description: string;
  skill: string;
  durationWeeks: number;
  resources: RoadmapResourceType[];
  done: boolean;
  completedAt: string | null;
};

export type RoadmapResponseType = {
  id: string;
  targetRole: string;
  items: RoadmapItemType[];
  progress: number;
  createdAt: string;
  updatedAt: string;
};

export type GenerateRoadmapInput = { targetRole: string; useLatestAnalysis: boolean };
export type ToggleRoadmapItemInput = { itemId: string; done: boolean };

/** Every roadmap type under one name — `TRoadmapType["Response"]` etc. */
export type TRoadmapType = {
  Response: RoadmapResponseType;
  Item: RoadmapItemType;
  Resource: RoadmapResourceType;
  GenerateInput: GenerateRoadmapInput;
  ToggleInput: ToggleRoadmapItemInput;
};
