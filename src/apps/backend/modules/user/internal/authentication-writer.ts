import type { CreateUserParams } from "../types";
import { createUserModel } from "./authentication-schema";

export default class AuthenticationWriter {
  public static async createUser(params: CreateUserParams) {
    try {
      const user = await createUserModel.create(params);
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }
}
