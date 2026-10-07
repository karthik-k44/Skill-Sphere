import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/frontend/components/ui/sidebar";
import { Logo } from "@/frontend/components/layout/Logo";
import { UserMenu } from "@/frontend/components/layout/UserMenu";
import { navigation } from "@/frontend/config/navigation";
import { paths } from "@/frontend/config/paths";

export const AppSidebar = () => {
  const { pathname } = useLocation();
  const { setOpenMobile } = useSidebar();

  const IsActive = (path: string) =>
    path === paths.app.dashboard ? pathname === path : pathname === path || pathname.startsWith(`${path}/`);

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="h-14 justify-center">
        <Logo to={paths.app.dashboard} className="px-1 group-data-[collapsible=icon]:[&>span:last-child]:hidden" />
      </SidebarHeader>
      <SidebarContent>
        {navigation.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild isActive={IsActive(item.path)} tooltip={item.title}>
                      <NavLink to={item.path} end={item.path === paths.app.dashboard} onClick={() => setOpenMobile(false)}>
                        <item.icon />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
