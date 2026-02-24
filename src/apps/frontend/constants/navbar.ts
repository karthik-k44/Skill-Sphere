import { NavbarItemsEnum, type NavbarItem } from "../types/navbar";

export const PublicNavbar : NavbarItem[] = [
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
        label: 'Dashboard',
        value: NavbarItemsEnum.DASHBOARD
    },
    {
        label: 'Profile',
        value: NavbarItemsEnum.PROFILE
    }
]