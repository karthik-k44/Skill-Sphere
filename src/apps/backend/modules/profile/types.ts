
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
    skillAchieved: string[];
    domainsWorked: string[];
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

export type UserAddress = {
    street: string;
    city: string;
    state: string;
    zipCode: string;
}

export type Skills = {
    name: string;
    level: string;
    rating: string;
}


export type CreateUserProfileParams={
    userId: string;
    phoneNumber: string;
    address: UserAddress;
    skills: Skills[];
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

export type UserProfile = {
    userProfile:UserProfileResponse
    user:{
        name: string;
        email: string;
        role: string;
    }
}
