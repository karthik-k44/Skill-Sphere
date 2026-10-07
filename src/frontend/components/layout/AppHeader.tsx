import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { Badge } from "@/frontend/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/frontend/components/ui/breadcrumb";
import { Separator } from "@/frontend/components/ui/separator";
import { SidebarTrigger } from "@/frontend/components/ui/sidebar";
import { ThemeToggle } from "@/frontend/components/layout/ThemeToggle";
import { FindNavigationItem } from "@/frontend/config/navigation";
import { paths } from "@/frontend/config/paths";
import { authService } from "@/frontend/features/auth/services";

export const AppHeader = () => {
  const { pathname } = useLocation();
  const { data: user } = authService.useSession();
  const current = FindNavigationItem(pathname);
  const crumbs = current && current.path !== paths.app.dashboard ? [current] : [];

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            {crumbs.length ? (
              <BreadcrumbLink asChild>
                <Link to={paths.app.dashboard}>Dashboard</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {crumbs.map((crumb) => (
            <Fragment key={crumb.path}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex items-center gap-2">
        {user?.isDemo && (
          <Badge variant="outline" className="hidden border-warning/50 text-warning sm:inline-flex">
            Demo account
          </Badge>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
};
