import type { CreateUserParams } from "../types";
import { createUserModel } from "./authentication-schema";

export default class AuthenticationWriter {
    public static async createUser(params: CreateUserParams): Promise<CreateUserParams> {
        const user = new createUserModel({
            name: params.name,
            email: params.email,
            password: params.password
        });
        return createUserModel.create(user) as Promise<CreateUserParams>;
    }
}