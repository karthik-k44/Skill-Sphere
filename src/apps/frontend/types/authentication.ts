export type SignUpParams = {
  name: string;
  email: string;
  password: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export enum UserType {
  USER = 'user',
  ADMIN = 'admin',
}

export type SignUpResponse = ApiResponse<{
  _id: string;
  name: string;
  email: string;
  role?: UserType;
}> & {
  authToken?: string;
};

export type LoginResponse = ApiResponse<null> & {
  authToken: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
};

export enum AuthType {
  SIGN_UP = 'SIGN_UP',
  LOGIN = 'LOGIN',
}
