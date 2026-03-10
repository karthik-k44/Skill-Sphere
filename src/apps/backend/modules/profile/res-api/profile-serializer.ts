import type { UserProfileResponse } from "../../../../frontend/types";
import { UserType, type User } from "../../user/types";
import type {  UserProfile, } from "../types";


export const serializeUserProfileAsJSON = (userProfile: UserProfileResponse, user: User): UserProfile => ({
    userProfile:{
        _id: userProfile?._id,
        userId: userProfile?.userId,
        phoneNumber: userProfile?.phoneNumber,
        address: userProfile?.address,
        skills: userProfile?.skills,
        experience: userProfile?.experience,
        education: userProfile?.education,
        projects: userProfile?.projects,
        certifications: userProfile?.certifications,
        languages: userProfile?.languages,
        interests: userProfile?.interests,
        createdAt: userProfile?.createdAt,
        updatedAt: userProfile?.updatedAt,
    },
    user:{
        name: user?.name,
        email: user?.email,
        role: user?.role || UserType.USER,
    }
    
});
