import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import type { User } from '../modules/user/types';
dotenv.config();

interface generateTokenParams {
 user: User
}
const generateToken: React.FC<generateTokenParams> = (user) => {
  return jwt.sign({ userId: user.user._id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
};

export default generateToken