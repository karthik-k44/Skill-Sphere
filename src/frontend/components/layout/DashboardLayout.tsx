import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarInset, SidebarProvider } from "@/frontend/components/ui/sidebar";
import { AppHeader } from "@/frontend/components/layout/AppHeader";
import { AppSidebar } from "@/frontend/components/layout/AppSidebar";
import { PageLoader } from "@/frontend/components/feedback/PageLoader";

export const DashboardLayout = () => {
  const { pathname } = useLocation();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <main className="flex flex-1 flex-col">
          <Suspense fallback={<PageLoader />}>
            {/* Keyed on the path so each page gets a short enter animation. */}
            <div
              key={pathname}
              className="mx-auto w-full max-w-7xl flex-1 animate-in p-4 duration-300 fade-in-0 slide-in-from-bottom-2 md:p-6 lg:p-8"
            >
              <Outlet />
            </div>
          </Suspense>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
