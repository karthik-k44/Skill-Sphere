import generateToken from "../../utils/auth-token.util";
import { createUserModel } from "./internal/authentication-schema";
import AuthenticationWriter from "./internal/authentication-writer";
import { UserType, type CreateUserParams, type LoginParams, type LoginResponse, type User } from "./types";
import bcrypt from "bcrypt";

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

    const authToken =AuthenticationService.issueToken({
      _id: String(user._id),
      name: String(user.name),
      email: String(user.email),
      role: (user.role as UserType) || UserType.USER,
    });
  
    return {
      _id: String(user._id),
      name: String(user.name),
      email: String(user.email),
      role: (user.role as UserType) ||  UserType.USER,
      authToken: authToken,
    };
  }

  public static async loginService(
    params: LoginParams
  ): Promise<LoginResponse> {
    const user = await createUserModel.findOne({ email: params.email });
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(params.password, user.password as string);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const token = generateToken({
      _id: String(user._id),
      name: String(user.name),
      email: String(user.email),
      role: (user.role as UserType | undefined) ?? UserType.USER,
    });

    return {
      _id: String(user._id),
      authToken: token,
    };
  }

  public static async getCurrentUser(userId: string): Promise<User> {
    const user = await createUserModel.findById(userId).select("_id name email role");
    if (!user) {
      throw new Error("User not found");
    }

    return {
      _id: String(user._id),
      name: String(user.name),
      email: String(user.email),
      role: (user.role as UserType | undefined) ?? UserType.USER,
    };
  }

  public static issueToken(user: User): string {
    return generateToken(user);
  }
}
