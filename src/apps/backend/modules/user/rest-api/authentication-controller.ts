import type { Request, Response } from "express";
import type { CreateUserParams, LoginParams } from "../types";
import AuthenticationService from "../authentication-services";

export class AuthenticationController {
  public static signUp = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body as CreateUserParams;

      if (!name || !email || !password) {
        return res.status(400).json({
          success: false,
          message: "name, email and password are required",
        });
      }

      const user = await AuthenticationService.createUser({
        name,
        email,
        password,
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      const message = (error as Error).message;
      const isConflict = message === "User already exists";

      return res.status(isConflict ? 409 : 500).json({
        success: false,
        message: isConflict ? message : "Internal server error",
        error: isConflict ? undefined : message,
      });
    }
  };

  public static login = async (_req: Request, res: Response) => {
    try {
      const { email, password } = _req.body as LoginParams;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "email and password are required",
        });
      }

      const token = await AuthenticationService.loginService({ email, password });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        authToken: token,
      });
    } catch (error) {
      const message = (error as Error).message;
      const isAuthError = message === "User not found" || message === "Invalid password";

      return res.status(isAuthError ? 401 : 500).json({
        success: false,
        message: isAuthError ? "Invalid email or password" : "Internal server error",
        error: isAuthError ? undefined : message,
      });
    }
  };
}
