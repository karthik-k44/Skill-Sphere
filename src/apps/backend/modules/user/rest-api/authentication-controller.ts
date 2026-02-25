import type { Request, Response } from "express";
import type { CreateUserParams, LoginParams } from "../types";
import AuthenticationService from "../authentication-services";
import type { AuthenticatedRequest } from "../../../middlewares/auth-middleware";

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

  public static login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body as LoginParams;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "email and password are required",
        });
      }

      const user = await AuthenticationService.loginService({ email, password });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        data: user,
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

  public static getCurrentUser = async (req: Request, res: Response) => {
    try {
      const request = req as AuthenticatedRequest;

      if (!request.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const user = await AuthenticationService.getCurrentUser(request.user.userId);

      return res.status(200).json({
        success: true,
        message: "User profile fetched successfully",
        data: user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: (error as Error).message,
      });
    }
  };

  public static refreshToken = async (req: Request, res: Response) => {
    try {
      const request = req as AuthenticatedRequest;

      if (!request.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }

      const user = await AuthenticationService.getCurrentUser(request.user.userId);
      const authToken = AuthenticationService.issueToken(user);

      return res.status(200).json({
        success: true,
        message: "Token refreshed successfully",
        data: authToken,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: (error as Error).message,
      });
    }
  };
}
