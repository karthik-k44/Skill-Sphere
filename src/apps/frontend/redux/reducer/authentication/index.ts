import { createSlice } from "@reduxjs/toolkit";
import { initialAuthState } from "./initial-value";
import { createUser, loginUser } from "./action";

const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state) => {
            state.isSignUpLoading = true;
        });
        builder.addCase(createUser.fulfilled, (state) => {
            state.isSignUpLoading = false;
            state.isSignUpSuccess = true;
        });
        builder.addCase(createUser.rejected, (state, action) => {
            state.isSignUpLoading = false;
            state.signUpError = {
                code: action.error.code || "",
                message: action.error.message || "",
            };
        });
        builder.addCase(loginUser.pending, (state) => {
            state.isLoggingLoading = true;
        });
        builder.addCase(loginUser.fulfilled, (state) => {
            state.isLoggingLoading = false;
            state.isLoginSuccess = true;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoggingLoading = false;
            state.loginError = {
                code: action.error.code || "",
                message: action.error.message || "",
            };
        });
    },
});

export default authSlice.reducer;