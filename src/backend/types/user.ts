export const UserRoleTypeEnum = {
  USER: "user",
  ADMIN: "admin",
} as const;
export type UserRoleTypeEnum = (typeof UserRoleTypeEnum)[keyof typeof UserRoleTypeEnum];

export type AuthUserResponseType = {
  id: string;
  name: string;
  email: string;
  role: UserRoleTypeEnum;
  isDemo: boolean;
};

export type SessionResponseType = {
  accessToken: string;
  user: AuthUserResponseType;
};
