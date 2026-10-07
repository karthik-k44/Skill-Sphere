import { useQuery } from "@tanstack/react-query";
import { Get } from "@/frontend/services/request";
import type { PublicProfileResponseType } from "../types";

const GetPublicProfile = (slug: string) =>
  Get<PublicProfileResponseType>(`/public/profiles/${encodeURIComponent(slug)}`);

const publicProfileKeys = {
  detail: (slug: string) => ["public-profiles", slug] as const,
};

const usePublicProfile = (slug: string | undefined) =>
  useQuery({
    queryKey: publicProfileKeys.detail(slug ?? ""),
    queryFn: () => GetPublicProfile(slug!),
    enabled: Boolean(slug),
  });

export const publicProfileService = { keys: publicProfileKeys, GetPublicProfile, usePublicProfile };
