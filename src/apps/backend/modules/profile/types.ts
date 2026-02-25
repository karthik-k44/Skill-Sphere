
export type UserEducation ={
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: Date;
    endDate: Date;
}

export type UserExperience = {
    company: string;
    role: string;
    startDate: Date;
    endDate: Date;
}

export type UserProjects = {
    title: string;
    description: string;
    link: string;
}

export type UserCertifications = {
    name: string;
    link: string;
}

export type UserLanguages = {
    name: string;
    proficiency: string;
}

export type UserInterests = {
    name: string;
}

export type CreateUserProfileParams={
    userId: string;
    phoneNumber: string;
    address: string;
    skills: string[];
    experience: UserExperience[];
    education: UserEducation[];
    projects: UserProjects[];
    certifications: UserCertifications[];
    languages:UserLanguages[];
    interests: UserInterests[];
}

export type UserProfileResponse = CreateUserProfileParams & {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}

export type UserProfile = UserProfileResponse & {
    name: string;
    email: string;
    role: string;
}
