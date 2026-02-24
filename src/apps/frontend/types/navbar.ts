import { BarChart, Cloud, Shield, Smartphone, Users, Zap } from "lucide-react";

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
    
}

export const FeaturesData = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Experience blazing-fast performance with our optimized infrastructure and global CDN.',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description: 'Enterprise-grade security with end-to-end encryption and compliance certifications.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work seamlessly with your team with real-time collaboration and shared workspaces.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Ready',
    description: 'Fully responsive design that works perfectly on all devices and screen sizes.',
  },
  {
    icon: Cloud,
    title: 'Cloud Powered',
    description: 'Reliable cloud infrastructure with 99.9% uptime and automatic backups.',
  },
  {
    icon: BarChart,
    title: 'Analytics Dashboard',
    description: 'Get insights with detailed analytics and reporting tools to track your progress.',
  },
];