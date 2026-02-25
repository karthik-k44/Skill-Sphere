import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CreateUserProfileParams, UserProfile, UserProfileResponse } from "../../../types";
import { UserProfileService } from "../../../services";

const CreateUserProfile = createAsyncThunk(
    'CreateUserProfile',
    async(params: CreateUserProfileParams): Promise<UserProfileResponse> => UserProfileService.createUserProfile(params),
)

const GetUserProfile = createAsyncThunk(
    'GetUserProfile',
    async(userId: string): Promise<UserProfile> => UserProfileService.getUserProfileByUserId(userId),
)

export { CreateUserProfile, GetUserProfile };