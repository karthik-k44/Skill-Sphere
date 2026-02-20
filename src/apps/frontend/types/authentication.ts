export type SignUpParams = {
  name: string;
  email: string;
  password: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type SignUpResponse = ApiResponse<{
  id: string;
  name: string;
  email: string;
}>;

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
