import mongoose, { type InferSchemaType } from "mongoose";
import { UserRoleTypeEnum } from "@/backend/types/user";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(UserRoleTypeEnum), default: UserRoleTypeEnum.USER },
    /** Bumped on logout; refresh tokens carrying an older version are rejected. */
    tokenVersion: { type: Number, default: 0 },
    isDemo: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export type UserDocType = InferSchemaType<typeof UserSchema> & { _id: mongoose.Types.ObjectId };

// Model name kept as "Users" so accounts created before the restructure still resolve.
export const UserModel = mongoose.model("Users", UserSchema);
