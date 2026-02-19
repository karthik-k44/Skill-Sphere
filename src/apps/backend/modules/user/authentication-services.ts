import generateToken from "../../utils/auth-token.util";
import { createUserModel } from "./internal/authentication-schema";
import AuthenticationWriter from "./internal/authentication-writer";
import type { CreateUserParams, LoginParams, User } from "./types";
import bcrypt from  'bcrypt'

export default class AuthenticationService {
  public static async createUser(
    params: CreateUserParams,
  ): Promise<User> {
    const isUserExist = await createUserModel.findOne({ email: params.email });
    if (isUserExist) {
      throw new Error("User already exists");
    }
    const user = await AuthenticationWriter.createUser({
      name: params.name,
      email: params.email,
      password: params.password,
    });

    return {
      _id: String(user._id),
      name: String(user.name),
      email: String(user.email),
    };
  }

  public static async loginService(
    params: LoginParams
  ): Promise<string> {
    const user = await createUserModel.findOne({ email: params.email });
    if (!user) {
      throw new Error("User not found");
    }

    const ismatch= await bcrypt.compare(params.password, user.password as string)
    if (!ismatch) {
      throw new Error("Invalid password");
    }

    const token = generateToken({ user: user as unknown as User });

    return token as string;
  }
}