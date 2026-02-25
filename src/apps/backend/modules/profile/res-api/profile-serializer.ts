import type { User } from "../../user/types";
import type { UserProfile, UserProfileResponse } from "../types";


export const serializeUserProfileAsJSON = (userProfile: UserProfileResponse, user: User): UserProfile => ({
    _id: userProfile._id,
    userId: userProfile.userId,
    phoneNumber: userProfile.phoneNumber,
    address: userProfile.address,
    skills: userProfile.skills,
    experience: userProfile.experience,
    education: userProfile.education,
    projects: userProfile.projects,
    certifications: userProfile.certifications,
    languages: userProfile.languages,
    interests: userProfile.interests,
    createdAt: userProfile.createdAt,
    updatedAt: userProfile.updatedAt,
    email: user.email,
    name: user.name,
    role: user.role || '',
});
