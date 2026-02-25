import AuthenticationService from "../user/authentication-services";
import UserProfileReader from "./internal/user-profile-reader";
import UserProfileWriter from "./internal/user-profile-writer";
import { serializeUserProfileAsJSON } from "./res-api/profile-serializer";
import type { CreateUserProfileParams } from "./types";

export default class UserProfileService {
  public static createUserProfile = async (params: CreateUserProfileParams) => {
    try {
      const user= await AuthenticationService.getCurrentUser(params.userId);
      if (!user) {
        throw new Error("User not found");
      }
      const profile = await UserProfileWriter.createUserProfile(params);
      return profile;
    } catch (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }
  };

  public static getUserProfile = async (userId: string) => {
    try {
      const user = await AuthenticationService.getCurrentUser(userId);
      if (!user) {
        throw new Error("User not found");
      }
      const profile = await UserProfileReader.getUserProfileByUserId(userId);

      if (!profile) {
        throw new Error("Profile not found");
      }

      return serializeUserProfileAsJSON(profile, user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  };
}
