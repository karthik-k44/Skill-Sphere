export type AsyncError = {
  code: string;
  message: string;
};

export type {
  ApiResponse,
  LoginParams,
  LoginResponse,
  SignUpParams,
  SignUpResponse,
} from "./authentication";

export { AuthType } from "./authentication";

export { FeaturesData } from "./navbar";
