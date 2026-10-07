import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ToastManager } from "@/frontend/lib/toast-manager";
import { Get, Post } from "@/frontend/services/request";
import { RefreshSession, ReplaceSession, sessionKey } from "@/frontend/services/session-state";
import { GetAccessToken } from "@/frontend/services/token-store";
import type {
  AuthUserResponseType,
  LoginInput,
  SessionResponseType,
  SignupInput,
} from "../types";

const Login = (input: LoginInput) => Post<SessionResponseType>("/auth/login", input);
const Signup = (input: SignupInput) => Post<SessionResponseType>("/auth/signup", input);
const DemoLogin = () => Post<SessionResponseType>("/auth/demo");
const Logout = () => Post<void>("/auth/logout");
const GetMe = () => Get<AuthUserResponseType>("/auth/me");

/** On first load there is no token in memory; the refresh cookie (if any) restores the session. */
const ResolveSession = async (): Promise<AuthUserResponseType | null> => {
  if (GetAccessToken()) return GetMe();
  try {
    return (await RefreshSession()).user;
  } catch {
    return null;
  }
};

const authKeys = { session: sessionKey };

const useSession = () =>
  useQuery({ queryKey: authKeys.session, queryFn: ResolveSession, staleTime: Infinity, retry: false });

const useLoginMutation = () =>
  useMutation({
    mutationFn: Login,
    onSuccess: (session) => {
      ReplaceSession(session);
      ToastManager.Success(`Welcome back, ${session.user.name.split(" ")[0]}!`);
    },
  });

const useSignupMutation = () =>
  useMutation({
    mutationFn: Signup,
    onSuccess: (session) => {
      ReplaceSession(session);
      ToastManager.Success("Account created", "Let's build your profile.");
    },
  });

const useDemoLoginMutation = () =>
  useMutation({
    mutationFn: DemoLogin,
    onSuccess: (session) => {
      ReplaceSession(session);
      ToastManager.Info("You're exploring the demo account", "Data resets each time someone opens the demo.");
    },
    onError: (error) => ToastManager.Error(error, "Couldn't open the demo"),
  });

const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: Logout,
    // Sign out locally even if the request fails; the refresh cookie expires on its own.
    onSettled: () => {
      queryClient.clear();
      ReplaceSession(null);
    },
  });
};

export const authService = {
  keys: authKeys,
  Login,
  Signup,
  DemoLogin,
  Logout,
  GetMe,
  useSession,
  useLoginMutation,
  useSignupMutation,
  useDemoLoginMutation,
  useLogoutMutation,
};
