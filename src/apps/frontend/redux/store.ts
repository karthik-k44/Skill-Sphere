import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer/authentication";
import userProfileSlice from "./reducer/user-profile";
import aiAnalyzerSlice from "./reducer/ai-analyzer";


export const store = configureStore({
  reducer: {
    auth: authSlice,
    userProfile: userProfileSlice,
    aiAnalyzer: aiAnalyzerSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
