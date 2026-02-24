import type { CreateUserParams } from "../types";
import { createUserModel } from "./authentication-schema";

export default class AuthenticationWriter {
  public static async createUser(params: CreateUserParams) {
    return createUserModel.create({
      name: params.name,
      email: params.email,
      password: params.password,
    });
  }
}
