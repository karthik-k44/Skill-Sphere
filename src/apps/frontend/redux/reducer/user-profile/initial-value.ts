import type { AsyncError, UserProfile, UserProfileResponse } from "../../../types";

export type userProfileSliceInitialState = {
    createUserProfileError: AsyncError,
    createUserProfileLoading: boolean,
    createUserProfileSuccess?: UserProfileResponse,
    getUserProfileError: AsyncError,
    getUserProfileLoading: boolean,
    getUserProfileSuccess?: UserProfile,
}

export const initialUserProfileState: userProfileSliceInitialState ={
    createUserProfileError: { code: "", message: "" },
    createUserProfileLoading: false,
    createUserProfileSuccess: undefined,
    getUserProfileError: { code: "", message: "" },
    getUserProfileLoading: false,
    getUserProfileSuccess: undefined,
}