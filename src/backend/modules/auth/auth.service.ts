import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { Conflict, NotFound, Unauthorized } from "@/backend/common/errors/app-error";
import { sessionService } from "@/backend/common/services/session.service";
import { EnsureDemoAccount } from "@/backend/db/seed";
import { UserModel, type UserDocType } from "@/backend/db/schema/user.schema";
import { UserRoleTypeEnum, type AuthUserResponseType } from "@/backend/types/user";
import type { LoginInput, SignupInput } from "@/backend/modules/auth/auth.validators";

const BCRYPT_ROUNDS = 10;

const ToAuthUser = (user: UserDocType): AuthUserResponseType => ({
  id: String(user._id),
  name: user.name,
  email: user.email,
  role: (user.role as UserRoleTypeEnum | undefined) ?? UserRoleTypeEnum.USER,
  isDemo: Boolean(user.isDemo),
});

/** Access token goes in the response body; the refresh token is set as an httpOnly cookie by the controller. */
const IssueSession = (user: UserDocType) => {
  const authUser = ToAuthUser(user);
  return {
    user: authUser,
    accessToken: sessionService.SignAccessToken(authUser.id, authUser.role),
    refreshToken: sessionService.SignRefreshToken(authUser.id, user.tokenVersion ?? 0),
  };
};

const Signup = async (input: SignupInput) => {
  if (await UserModel.exists({ email: input.email })) {
    throw Conflict("An account with this email already exists");
  }
  const user = await UserModel.create({ ...input, password: await bcrypt.hash(input.password, BCRYPT_ROUNDS) });
  return IssueSession(user);
};

const Login = async (input: LoginInput) => {
  const user = await UserModel.findOne({ email: input.email });
  const isValid = user ? await bcrypt.compare(input.password, user.password) : false;
  if (!user || !isValid) throw Unauthorized("Invalid email or password");
  return IssueSession(user);
};

/** Signs into the shared demo account, resetting its profile so every visitor starts from the same data. */
const DemoLogin = async () => IssueSession(await EnsureDemoAccount());

const Refresh = async (refreshToken: string | undefined) => {
  if (!refreshToken) throw Unauthorized("No active session");
  const payload = sessionService.VerifyRefreshToken(refreshToken);
  const user = await UserModel.findById(payload.sub);
  if (!user || (user.tokenVersion ?? 0) !== payload.ver) throw Unauthorized("Your session has ended. Please sign in again.");
  return IssueSession(user);
};

/** Revokes every refresh token for the user. The shared demo account is exempt so one visitor can't log out the rest. */
const Logout = async (refreshToken: string | undefined) => {
  if (!refreshToken) return;
  try {
    const payload = sessionService.VerifyRefreshToken(refreshToken);
    await UserModel.updateOne(
      { _id: payload.sub, isDemo: mongoose.trusted({ $ne: true }) },
      { $inc: { tokenVersion: 1 } },
    );
  } catch {
    // An expired or forged token has nothing left to revoke.
  }
};

const GetMe = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) throw NotFound("Account not found");
  return ToAuthUser(user);
};

export const authService = { Signup, Login, DemoLogin, Refresh, Logout, GetMe };
