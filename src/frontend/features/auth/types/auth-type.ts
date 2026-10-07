import { z } from "zod";
import type { SessionType, SessionUserType, UserRoleTypeEnum } from "@/frontend/services/type";

export type AuthUserResponseType = SessionUserType;
export type SessionResponseType = SessionType;

export const LoginSchema = z.object({
  email: z.string().trim().min(1, "Email is required").pipe(z.email("Enter a valid email address")),
  password: z.string().min(1, "Password is required"),
});

export const SignupSchema = z
  .object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(80),
    email: z.string().trim().min(1, "Email is required").pipe(z.email("Enter a valid email address")),
    password: z.string().min(8, "Use at least 8 characters").max(128),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

export type LoginInput = z.infer<typeof LoginSchema>;
export type SignupFormValues = z.infer<typeof SignupSchema>;
export type SignupInput = Omit<SignupFormValues, "confirmPassword">;

/** Every auth type under one name — `TAuthType["User"]` etc. */
export type TAuthType = {
  User: AuthUserResponseType;
  Session: SessionResponseType;
  Role: UserRoleTypeEnum;
  LoginInput: LoginInput;
  SignupInput: SignupInput;
  SignupFormValues: SignupFormValues;
};
