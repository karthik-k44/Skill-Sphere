import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserType, type User } from "../modules/user/types";

dotenv.config();

export type AuthTokenPayload = {
  userId: string;
  email: string;
  role: UserType;
};

const generateToken = (user: User): string => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign(
    {
      userId: user._id,
      email: user.email,
      role: user.role || UserType.USER,
    },
    jwtSecret,
    { expiresIn: "6d" },
  );
};

export default generateToken;
