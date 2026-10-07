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
