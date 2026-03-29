import { BarChart, Bot, Briefcase, FileText, Shield, User } from "lucide-react";

export enum NavType {
    PUBLIC = 'PUBLIC',
    PROTECTED = 'PROTECTED',
    ADMIN = 'ADMIN'
} 


export type NavbarItem ={
    label: string;
    value: NavbarItemsEnum;
}

export enum NavbarItemsEnum {
    HOME = 'HOME',
    FEATURES = 'FEATURES',
    ABOUT = 'ABOUT',
    CONTACT = 'CONTACT',
    DASHBOARD = 'DASHBOARD',
    PROFILE = 'PROFILE',
    SETTINGS = 'SETTINGS',
    RESUME_BUILDER = 'RESUME_BUILDER',
    AI_ANALYZER = 'AI_ANALYZER',
    
}

export const FeaturesData = [
  {
    icon: Shield,
    title: 'Secure Authentication',
    description: 'Create an account and sign in to access your private Skill Sphere workspace.',
  },
  {
    icon: User,
    title: 'Personal Profile Builder',
    description: 'Add your personal details, role, skills, and other professional information in one structured flow.',
  },
  {
    icon: Briefcase,
    title: 'Experience and Projects',
    description: 'Document your work history, domains worked, and real projects so your profile reflects actual experience.',
  },
  {
    icon: FileText,
    title: 'Education and Credentials',
    description: 'Organize education, certifications, languages, and interests to create a more complete professional story.',
  },
  {
    icon: Bot,
    title: 'AI Profile Analyzer',
    description: 'Generate a summary of your strengths, focus areas, and action items based on the profile you build.',
  },
  {
    icon: BarChart,
    title: 'Growth Dashboard',
    description: 'Keep your career data in one place so you can review progress and improve your profile over time.',
  },
];
