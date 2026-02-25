import express from "express";
import { authMiddleware } from "../../../middlewares/auth-middleware";
import { AuthenticationController } from "./authentication-controller";

const router = express.Router();

router.post("/signup", AuthenticationController.signUp);
router.post("/login", AuthenticationController.login);
router.get("/current-user", authMiddleware, AuthenticationController.getCurrentUser);
router.get("/refresh-token", authMiddleware, AuthenticationController.refreshToken);

export default router;
