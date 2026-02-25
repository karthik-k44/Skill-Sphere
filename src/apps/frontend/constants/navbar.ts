import { NavbarItemsEnum, type NavbarItem } from "../types/navbar";

export const PublicNavbar : NavbarItem[] = [
    {
        label: 'Home',
        value: NavbarItemsEnum.HOME 
    },
    {
        label: 'Features',
        value: NavbarItemsEnum.FEATURES
    },
    {
        label: 'About',
        value: NavbarItemsEnum.ABOUT
    },
    {
        label: 'Contact',
        value: NavbarItemsEnum.CONTACT
    }
]



export const ProtectedNavbar : NavbarItem[] = [
    {
        label: 'Home',
        value: NavbarItemsEnum.HOME 
    },
    {
        label: 'AI Analyzer',
        value: NavbarItemsEnum.AI_ANALYZER
    },
    {
        label: 'Resume Builder',
        value: NavbarItemsEnum.RESUME_BUILDER
    },
    {
        label: 'Profile',
        value: NavbarItemsEnum.PROFILE
    }
]