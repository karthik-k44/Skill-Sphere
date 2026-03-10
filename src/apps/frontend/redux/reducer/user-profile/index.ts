import { createSlice } from "@reduxjs/toolkit";
import { initialUserProfileState } from "./initial-value";
import { CreateUserProfile, GetUserProfile } from "./action";

const userProfileSlice = createSlice({
    name: "userProfile",
    initialState: initialUserProfileState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(CreateUserProfile.pending, (state) => {
            state.createUserProfileLoading = true;
        });
        builder.addCase(CreateUserProfile.fulfilled, (state, action) => {
            state.createUserProfileLoading = false;
            state.createUserProfileData = action.payload;
        });
        builder.addCase(CreateUserProfile.rejected, (state, action) => {
            state.createUserProfileLoading = false;
            state.createUserProfileError = {
                code: action.error.code || "",
                message: action.error.message || "",
            };
        });
        builder.addCase(GetUserProfile.pending, (state) => {
            state.getUserProfileLoading = true;
        });
        builder.addCase(GetUserProfile.fulfilled, (state, action) => {
            state.getUserProfileLoading = false;
            state.getUserProfileData = action.payload;
        });
        builder.addCase(GetUserProfile.rejected, (state, action) => {
            state.getUserProfileLoading = false;
            state.getUserProfileError = {
                code: action.error.code || "",
                message: action.error.message || "",
            };
        });
    },
});

export default userProfileSlice.reducer;
