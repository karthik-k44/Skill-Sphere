import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ToastManager } from "@/frontend/lib/toast-manager";
import { Get, Patch, Put } from "@/frontend/services/request";
import type { ProfileInput, ProfileResponseType, PublicSettingsInput } from "../types";

const GetMyProfile = () => Get<ProfileResponseType | null>("/profile/me");
const SaveMyProfile = (input: ProfileInput) => Put<ProfileResponseType>("/profile/me", input);
const UpdatePublicSettings = (input: PublicSettingsInput) => Patch<ProfileResponseType>("/profile/me/public", input);

const profileKeys = {
  mine: ["profile", "me"] as const,
};

const useMyProfile = () => useQuery({ queryKey: profileKeys.mine, queryFn: GetMyProfile });

const useSaveProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: SaveMyProfile,
    onSuccess: (profile) => {
      queryClient.setQueryData(profileKeys.mine, profile);
      ToastManager.Success("Profile saved");
    },
    onError: (error) => ToastManager.Error(error, "Couldn't save your profile"),
  });
};

const usePublicSettingsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: UpdatePublicSettings,
    onSuccess: (profile) => {
      queryClient.setQueryData(profileKeys.mine, profile);
      ToastManager.Success(profile.isPublic ? "Your profile is live" : "Your profile is now private");
    },
    onError: (error) => ToastManager.Error(error, "Couldn't update your public profile"),
  });
};

export const profileService = {
  keys: profileKeys,
  GetMyProfile,
  SaveMyProfile,
  UpdatePublicSettings,
  useMyProfile,
  useSaveProfileMutation,
  usePublicSettingsMutation,
};
