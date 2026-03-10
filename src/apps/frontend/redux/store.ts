import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer/authentication";
import userProfileSlice from "./reducer/user-profile";


export const store = configureStore({
  reducer: {
    auth: authSlice,
    userProfile: userProfileSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
