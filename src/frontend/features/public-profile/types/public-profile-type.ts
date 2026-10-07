import type { ProfileContentType } from "@/frontend/features/profile/types";

// Mirrors PublicProfileResponseType in src/backend/types/profile.ts.

export type PublicProfileResponseType = Omit<ProfileContentType, "phoneNumber" | "address"> & {
  name: string;
  slug: string;
  location: string;
  updatedAt: string;
};

/** Every public-profile type under one name. */
export type TPublicProfileType = {
  Response: PublicProfileResponseType;
};
