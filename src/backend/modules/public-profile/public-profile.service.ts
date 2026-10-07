import { NotFound } from "@/backend/common/errors/app-error";
import { ProfileModel, type ProfileDocType } from "@/backend/db/schema/profile.schema";
import { UserModel } from "@/backend/db/schema/user.schema";
import { ToPublicProfile } from "@/backend/modules/profile/profile.mapper";

const GetBySlug = async (slug: string) => {
  const doc = await ProfileModel.findOne({ slug, isPublic: true }).lean<ProfileDocType>();
  if (!doc) throw NotFound("This profile is private or does not exist");

  const user = await UserModel.findById(doc.userId).select("name").lean();
  if (!user) throw NotFound("This profile is private or does not exist");

  return ToPublicProfile(doc, user.name);
};

export const publicProfileService = { GetBySlug };
