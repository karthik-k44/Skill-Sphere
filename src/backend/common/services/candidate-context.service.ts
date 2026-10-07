import { BadRequest, NotFound } from "@/backend/common/errors/app-error";
import { ProfileModel, type ProfileDocType } from "@/backend/db/schema/profile.schema";
import { UserModel } from "@/backend/db/schema/user.schema";
import {
  IsProfileEmpty,
  ToAiProfilePayload,
  ToProfileContent,
} from "@/backend/modules/profile/profile.mapper";

/**
 * Loads what every AI feature needs about the caller: their name, profile content and the
 * prompt-ready payload. Lives in common/ so analyzer, job-match and roadmap don't import each other.
 */
const Load = async (userId: string) => {
  const [user, doc] = await Promise.all([
    UserModel.findById(userId).select("name").lean(),
    ProfileModel.findOne({ userId }).lean<ProfileDocType>(),
  ]);
  if (!user) throw NotFound("Account not found");

  const content = doc ? ToProfileContent(doc) : null;
  if (!content || IsProfileEmpty(content)) {
    throw BadRequest("Add some skills, experience or projects to your profile first.");
  }

  return { name: user.name, content, payload: ToAiProfilePayload(content, user.name) };
};

export const candidateContextService = { Load };
