export type CreateUserParams = {
  name: string;
  email: string;
  password: string;
};

export enum UserType {
  USER = 'user',
  ADMIN = 'admin',
}
export type User = {
  _id: string;
  name: string;
  email: string;
  role?: UserType;
  authToken?: string;
};

export type LoginParams = {
  email: string;
  password: string;
};

export type LoginResponse = {
  authToken: string;
  _id: string;
};
