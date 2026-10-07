export type ApiErrorBody = {
  message: string;
  code: string;
  details?: unknown;
};

export const UserRoleTypeEnum = {
  USER: "user",
  ADMIN: "admin",
} as const;
export type UserRoleTypeEnum = (typeof UserRoleTypeEnum)[keyof typeof UserRoleTypeEnum];

export type SessionUserType = {
  id: string;
  name: string;
  email: string;
  role: UserRoleTypeEnum;
  isDemo: boolean;
};

export type SessionType = {
  accessToken: string;
  user: SessionUserType;
};
