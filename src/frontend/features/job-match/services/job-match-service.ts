import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ToastManager } from "@/frontend/lib/toast-manager";
import { Delete, Get, Post } from "@/frontend/services/request";
import type { CreateJobMatchInput, JobMatchResponseType, JobMatchSummaryType } from "../types";

const ListJobMatches = () => Get<JobMatchSummaryType[]>("/job-matches");
const GetJobMatch = (id: string) => Get<JobMatchResponseType>(`/job-matches/${id}`);
const CreateJobMatch = (input: CreateJobMatchInput) =>
  Post<JobMatchResponseType>("/job-matches", input, { timeout: 90_000 });
const DeleteJobMatch = (id: string) => Delete(`/job-matches/${id}`);

const jobMatchKeys = {
  all: ["job-matches"] as const,
  list: () => [...jobMatchKeys.all, "list"] as const,
  detail: (id: string) => [...jobMatchKeys.all, "detail", id] as const,
};

const useJobMatches = () => useQuery({ queryKey: jobMatchKeys.list(), queryFn: ListJobMatches });

const useJobMatch = (id: string | undefined) =>
  useQuery({
    queryKey: jobMatchKeys.detail(id ?? ""),
    queryFn: () => GetJobMatch(id!),
    enabled: Boolean(id),
    staleTime: Infinity,
  });

const useCreateJobMatchMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: CreateJobMatch,
    onSuccess: (match) => {
      queryClient.setQueryData(jobMatchKeys.detail(match.id), match);
      queryClient.invalidateQueries({ queryKey: jobMatchKeys.list() });
      ToastManager.Success("Match ready", `${match.matchScore}% fit for ${match.jobTitle}`);
    },
    onError: (error) => ToastManager.Error(error, "Couldn't compare with this job"),
  });
};

const useDeleteJobMatchMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: DeleteJobMatch,
    onSuccess: (_, id) => {
      queryClient.removeQueries({ queryKey: jobMatchKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: jobMatchKeys.list() });
      ToastManager.Success("Match deleted");
    },
    onError: (error) => ToastManager.Error(error, "Couldn't delete this match"),
  });
};

export const jobMatchService = {
  keys: jobMatchKeys,
  ListJobMatches,
  GetJobMatch,
  CreateJobMatch,
  DeleteJobMatch,
  useJobMatches,
  useJobMatch,
  useCreateJobMatchMutation,
  useDeleteJobMatchMutation,
};
