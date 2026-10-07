import { Conflict, NotFound } from "@/backend/common/errors/app-error";
import { ProfileModel, type ProfileDocType } from "@/backend/db/schema/profile.schema";
import { ToProfileResponse } from "@/backend/modules/profile/profile.mapper";
import type { ProfileInput, PublicSettingsInput } from "@/backend/modules/profile/profile.validators";

const GetMine = async (userId: string) => {
  const doc = await ProfileModel.findOne({ userId }).lean<ProfileDocType>();
  return doc ? ToProfileResponse(doc) : null;
};

/** Creates or replaces the caller's profile. The user id always comes from the session, never the request. */
const SaveMine = async (userId: string, input: ProfileInput) => {
  const doc = await ProfileModel.findOneAndUpdate(
    { userId },
    { $set: input },
    { upsert: true, returnDocument: "after", runValidators: true, setDefaultsOnInsert: true },
  ).lean<ProfileDocType>();
  if (!doc) throw NotFound("Profile not found");
  return ToProfileResponse(doc);
};

const UpdatePublicSettings = async (userId: string, input: PublicSettingsInput) => {
  const owner = await ProfileModel.findOne({ slug: input.slug }).select("userId").lean();
  if (owner && String(owner.userId) !== userId) throw Conflict("That profile link is already taken");

  const doc = await ProfileModel.findOneAndUpdate(
    { userId },
    { $set: { slug: input.slug, isPublic: input.isPublic } },
    { returnDocument: "after" },
  ).lean<ProfileDocType>();
  if (!doc) throw NotFound("Save your profile before publishing it");
  return ToProfileResponse(doc);
};

export const profileService = { GetMine, SaveMine, UpdatePublicSettings };
