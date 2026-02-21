import express from "express";
import type { AuthenticatedRequest } from "../../../middlewares/auth-middleware";
import { authMiddleware } from "../../../middlewares/auth-middleware";
import { permissionMiddleware } from "../../../middlewares/permission-middleware";
import { UserType } from "../../user/types";

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  permissionMiddleware(UserType.USER, UserType.ADMIN),
  (req, res) => {
    const request = req as AuthenticatedRequest;

    return res.status(200).json({
      success: true,
      message: "Dashboard data fetched successfully",
      data: {
        welcome: `Welcome back, ${request.user?.name ?? "User"}!`,
        metrics: {
          activeCourses: 4,
          completedCourses: 12,
          skillScore: 87,
        },
      },
    });
  },
);

router.get(
  "/admin",
  authMiddleware,
  permissionMiddleware(UserType.ADMIN),
  (_req, res) => {
    return res.status(200).json({
      success: true,
      message: "Admin dashboard data fetched successfully",
      data: {
        users: 124,
        reports: 7,
      },
    });
  },
);

export default router;
