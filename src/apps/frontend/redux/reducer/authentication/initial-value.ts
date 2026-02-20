import type { AsyncError } from "../../../types";

export type AuthSliceType = {
  loginError: AsyncError;
  isLoginSuccess?: boolean;
  isLoggingLoading: boolean;
  signUpError: AsyncError;
  isSignUpLoading: boolean;
  isSignUpSuccess?: boolean;
};

export const initialAuthState: AuthSliceType = {
    loginError: { code: "", message: "" },
    isLoginSuccess: false,
    isLoggingLoading: false,
    signUpError: { code: "", message: "" },
    isSignUpLoading: false,
    isSignUpSuccess: false,
};
