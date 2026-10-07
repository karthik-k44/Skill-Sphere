import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ToastManager } from "@/frontend/lib/toast-manager";
import { Get, Post } from "@/frontend/services/request";
import type {
  AnalysisListResponseType,
  AnalysisResponseType,
  GenerateAnalysisInput,
} from "../types";

const ListAnalyses = () => Get<AnalysisListResponseType>("/analyses");
const GetAnalysis = (id: string) => Get<AnalysisResponseType>(`/analyses/${id}`);
const GenerateAnalysis = (input: GenerateAnalysisInput) =>
  Post<AnalysisResponseType>("/analyses", input, { timeout: 90_000 });

const analyzerKeys = {
  all: ["analyses"] as const,
  list: () => [...analyzerKeys.all, "list"] as const,
  detail: (id: string) => [...analyzerKeys.all, "detail", id] as const,
};

const useAnalyses = () => useQuery({ queryKey: analyzerKeys.list(), queryFn: ListAnalyses });

const useAnalysis = (id: string | undefined) =>
  useQuery({
    queryKey: analyzerKeys.detail(id ?? ""),
    queryFn: () => GetAnalysis(id!),
    enabled: Boolean(id),
    staleTime: Infinity, // an analysis never changes once written
  });

const useGenerateAnalysisMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: GenerateAnalysis,
    onSuccess: (analysis) => {
      queryClient.setQueryData(analyzerKeys.detail(analysis.id), analysis);
      queryClient.invalidateQueries({ queryKey: analyzerKeys.list() });
      ToastManager.Success("Analysis ready", `Overall score: ${analysis.overallScore}/100`);
    },
    onError: (error) => {
      // A 429 carries the cooldown; refresh the list so the countdown appears.
      if (error.status === 429) queryClient.invalidateQueries({ queryKey: analyzerKeys.list() });
      ToastManager.Error(error, "Couldn't generate the analysis");
    },
  });
};

export const analyzerService = {
  keys: analyzerKeys,
  ListAnalyses,
  GetAnalysis,
  GenerateAnalysis,
  useAnalyses,
  useAnalysis,
  useGenerateAnalysisMutation,
};
