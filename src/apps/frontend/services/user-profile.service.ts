import type { CreateUserProfileParams } from "../types";
import APIService from "./api.service";
import CommonService from "./common.service";

export class UserProfileService extends APIService {
    private static readonly instance = new UserProfileService();

    public static createUserProfile  = async (params: CreateUserProfileParams) =>{
        try {const response = await this.instance.apiClient.post("/user-profile", params);
        return response.data;
        } catch (error) {
            throw CommonService.toReadableError(error);;
        }
    
    }

    public static getUserProfileByUserId = async (userId: string) => {
        try {
            const response = await this.instance.apiClient.get(`/user-profile/${userId}`);
            return response.data;
        } catch (error) {
            throw CommonService.toReadableError(error);;
        }
    }
}