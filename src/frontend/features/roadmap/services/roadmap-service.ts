import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ToastManager } from "@/frontend/lib/toast-manager";
import { Get, Patch, Post } from "@/frontend/services/request";
import type { GenerateRoadmapInput, RoadmapResponseType, ToggleRoadmapItemInput } from "../types";

const GetRoadmap = () => Get<RoadmapResponseType | null>("/roadmap");
const GenerateRoadmap = (input: GenerateRoadmapInput) =>
  Post<RoadmapResponseType>("/roadmap/generate", input, { timeout: 90_000 });
const ToggleRoadmapItem = ({ itemId, done }: ToggleRoadmapItemInput) =>
  Patch<RoadmapResponseType>(`/roadmap/items/${itemId}`, { done });

const roadmapKeys = { mine: ["roadmap", "me"] as const };

const useRoadmap = () => useQuery({ queryKey: roadmapKeys.mine, queryFn: GetRoadmap });

const useGenerateRoadmapMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: GenerateRoadmap,
    onSuccess: (roadmap) => {
      queryClient.setQueryData(roadmapKeys.mine, roadmap);
      ToastManager.Success("Roadmap ready", `${roadmap.items.length} steps planned`);
    },
    onError: (error) => ToastManager.Error(error, "Couldn't build your roadmap"),
  });
};

/** Ticks a step immediately and rolls back if the server rejects it. */
const useToggleRoadmapItemMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ToggleRoadmapItem,
    onMutate: async ({ itemId, done }) => {
      await queryClient.cancelQueries({ queryKey: roadmapKeys.mine });
      const previous = queryClient.getQueryData<RoadmapResponseType | null>(roadmapKeys.mine);
      if (previous) {
        const items = previous.items.map((item) => (item.id === itemId ? { ...item, done } : item));
        const progress = Math.round((items.filter((item) => item.done).length / items.length) * 100);
        queryClient.setQueryData(roadmapKeys.mine, { ...previous, items, progress });
      }
      return { previous };
    },
    onError: (error, _input, context) => {
      if (context?.previous) queryClient.setQueryData(roadmapKeys.mine, context.previous);
      ToastManager.Error(error, "Couldn't update that step");
    },
    onSuccess: (roadmap) => queryClient.setQueryData(roadmapKeys.mine, roadmap),
  });
};

export const roadmapService = {
  keys: roadmapKeys,
  GetRoadmap,
  GenerateRoadmap,
  ToggleRoadmapItem,
  useRoadmap,
  useGenerateRoadmapMutation,
  useToggleRoadmapItemMutation,
};
