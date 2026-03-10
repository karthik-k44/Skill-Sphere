import type { UserProfileResponse } from "../types";
import UserProfileModel from "./user-profile-schema";


export default class UserProfileReader {
    public static getUserProfileByUserId = async (userId: string) => {
        try {
            const profile = await UserProfileModel.findOne({ userId });
            return profile as unknown as UserProfileResponse;
        } catch (error) {
            console.error("Error fetching user profile:", error);
            throw error;
        }
    };

}