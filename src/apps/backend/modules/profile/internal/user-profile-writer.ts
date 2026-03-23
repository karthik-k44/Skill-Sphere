
import type { CreateUserProfileParams } from "../types";
import UserProfileModel from "./user-profile-schema";

export default class UserProfileWriter {
    public static createUserProfile = async (params: CreateUserProfileParams) => {
        try {
            const profile = await UserProfileModel.create(params);
            return profile;
        } catch (error) {
            console.error("Error creating user profile:", error);
            throw error;
        }
    };

    public static updateUserProfile = async (userId: string, params: CreateUserProfileParams) => {
        try {
            const profile = await UserProfileModel.findOneAndUpdate({ userId }, params, { new: true });
            return profile;
        } catch (error) {
            console.error("Error updating user profile:", error);
            throw error;
        }
    }
    
}