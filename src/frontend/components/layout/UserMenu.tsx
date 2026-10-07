import { useNavigate } from "react-router-dom";
import { ChevronsUpDown, LogOut, Moon, Sun } from "lucide-react";
import { Avatar, AvatarFallback } from "@/frontend/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/frontend/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/frontend/components/ui/sidebar";
import { paths } from "@/frontend/config/paths";
import { authService } from "@/frontend/features/auth/services";
import { useTheme } from "@/frontend/hooks/use-theme";
import { ThemeTypeEnum } from "@/frontend/types";
import { Initials } from "@/frontend/utils/format";

export const UserMenu = () => {
  const navigate = useNavigate();
  const { data: user } = authService.useSession();
  const logout = authService.useLogoutMutation();
  const { resolvedTheme, setTheme } = useTheme();

  const OnLogout = () => logout.mutate(undefined, { onSettled: () => navigate(paths.home) });

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent">
              <Avatar className="size-8 rounded-lg">
                <AvatarFallback className="rounded-lg bg-primary/15 text-primary">{Initials(user?.name)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs text-muted-foreground">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="end" className="w-(--radix-dropdown-menu-trigger-width) min-w-56">
            <DropdownMenuLabel className="font-normal text-muted-foreground">
              Signed in as {user?.email}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => setTheme(resolvedTheme === "dark" ? ThemeTypeEnum.LIGHT : ThemeTypeEnum.DARK)}
            >
              {resolvedTheme === "dark" ? <Sun /> : <Moon />}
              {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={OnLogout} disabled={logout.isPending}>
              <LogOut /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
