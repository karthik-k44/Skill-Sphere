import type { AsyncError, UserProfile, UserProfileResponse } from "../../../types";

export type userProfileSliceInitialState = {
    createUserProfileError: AsyncError,
    createUserProfileLoading: boolean,
    createUserProfileData?: UserProfileResponse,
    getUserProfileError: AsyncError,
    getUserProfileLoading: boolean,
    getUserProfileData?: UserProfile,
    updateUserProfileError: AsyncError,
    updateUserProfileLoading: boolean,
    updateUserProfileData?: UserProfile,
}

export const initialUserProfileState: userProfileSliceInitialState ={
    createUserProfileError: { code: "", message: "" },
    createUserProfileLoading: false,
    createUserProfileData: undefined,
    getUserProfileError: { code: "", message: "" },
    getUserProfileLoading: false,
    getUserProfileData: undefined,
    updateUserProfileError: { code: "", message: "" },
    updateUserProfileLoading: false,
    updateUserProfileData: undefined,
}