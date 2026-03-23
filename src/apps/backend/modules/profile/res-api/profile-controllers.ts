import type { Request, Response } from "express";
import type { CreateUserProfileParams } from "../types";
import UserProfileService from "../profile-services";
import type { AuthenticatedRequest } from "../../../middlewares/auth-middleware";
export class UserProfileController {
    public static createUserProfile = async (req: Request, res: Response) => {
        try {
            const request = req as AuthenticatedRequest;
            const body = (req.body || {}) as CreateUserProfileParams;
            const userId = request.user?.userId;

            if (!userId) {
                return res.status(401).json({ success: false, message: "Unauthorized" });
            }

            if ( !body.phoneNumber) {
                return res.status(400).json({
                    success: false,
                    message: "phoneNumber is required",
                });
            }

            const profile = await UserProfileService.createUserProfile({
                userId,
                phoneNumber: body.phoneNumber,
                address: body.address,
                skills: Array.isArray(body.skills) ? body.skills : [],
                experience: Array.isArray(body.experience) ? body.experience : [],
                education: Array.isArray(body.education) ? body.education : [],
                projects: Array.isArray(body.projects) ? body.projects : [],
                certifications: Array.isArray(body.certifications) ? body.certifications : [],
                languages: Array.isArray(body.languages) ? body.languages : [],
                interests: Array.isArray(body.interests) ? body.interests : [],
            });
            return res.status(201).json({ success: true, data: profile });
        } catch (error) {
            return res.status(500).json({ success: false, message: (error as Error).message });
        }
    };

    public static getUserProfileByUserId = async (req: Request, res: Response) => {
        const { userId } = req.params;
        try {  
            const profile = await UserProfileService.getUserProfile(userId);
            return res.status(200).json(profile);
        } catch (error) {
            return res.status(500).json({ error: (error as Error).message });
        }
    };

    public static updateUserProfile = async (req: Request, res: Response) => {
        const { userId } = req.params;
        const body = (req.body) as CreateUserProfileParams;
        try {
            const profile = await UserProfileService.updateUserProfile(userId, body);
            return res.status(200).json(profile);
        } catch (error) {
           return res.status(500).json({ error: (error as Error).message });
        }
    }
}   
