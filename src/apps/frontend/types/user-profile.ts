
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
    country: string;
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

export enum UserProfileFormType{
    CREATE='create',
    UPDATE='update'
}

export enum UserSkillType{
    REACT='React',
    NODEJS='Node.js',
    PYTHON='Python',
    JAVA='Java',
    CSHARP='C#',
    RUBY='Ruby',
    GO='Go',
    PHP='PHP',
    SWIFT='Swift',
    KOTLIN='Kotlin',
    TYPESCRIPT='TypeScript',
    JAVASCRIPT='JavaScript',
    HTML='HTML',
    CSS='CSS',
    SQL='SQL',
    AWS='AWS',
    AZURE='Azure',
    GCP='GCP',
    JENKINS='Jenkins',
    DOCKER='Docker',
    KUBERNETES='Kubernetes',
    GIT='Git',
    LINUX='Linux',
    FRAMEWORKS='Frameworks',
    FORMIK='Formik',
    REACT_HOOK_FORM='React Hook Form',
    REDUX_TOOLKIT='Redux Toolkit',
    SPRING_BOOT='Spring Boot',
    SPRING_DATA_JPA='Spring Data JPA',
    SPRING_SECURITY='Spring Security',
    SPRING_CLOUD='Spring Cloud',
    OTHER='Other'    
}

export enum UserExperienceType{
    FRONTEND='Frontend',
    BACKEND='Backend',
    FULLSTACK='Fullstack',
    DEVOPS='DevOps',
    DATA_SCIENCE='Data Science',
    MACHINE_LEARNING='Machine Learning',
    AI='AI',
    MOBILE_DEVELOPMENT='Mobile Development',
    CLOUD_COMPUTING='Cloud Computing',
    OTHER='Other'
}

export enum UserSkillLevel{
    BEGINNER='Beginner',
    INTERMEDIATE='Intermediate',
    ADVANCED='Advanced',
    EXPERT='Expert'
}

export enum UserSkillRating{
    ONE='1',
    TWO='2',
    THREE='3',
    FOUR='4',
    FIVE='5'
}

export enum UserLanguageProficiency{
    NATIVE='Native',
    FLUENT='Fluent',
    ADVANCED='Advanced',
    INTERMEDIATE='Intermediate',
    CONVERSATIONAL='Conversational',
    BASIC='Basic'
}