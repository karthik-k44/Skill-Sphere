import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { PageLoader } from "@/frontend/components/feedback/PageLoader";
import { RouteError } from "@/frontend/components/feedback/RouteError";
import { DashboardLayout } from "@/frontend/components/layout/DashboardLayout";
import { paths } from "@/frontend/config/paths";
import { GuestOnly } from "@/frontend/features/auth/components/GuestOnly";
import { RequireAuth } from "@/frontend/features/auth/components/RequireAuth";

/** Each page is its own chunk; react-pdf, for example, only loads on the resume builder. */
const LoadPage = (load: () => Promise<{ default: React.ComponentType }>) => async () => ({
  Component: (await load()).default,
});

const routes: RouteObject[] = [
  {
    errorElement: <RouteError />,
    hydrateFallbackElement: <PageLoader />,
    children: [
      { path: paths.home, lazy: LoadPage(() => import("@/frontend/features/landing/Landing")) },
      { path: "/u/:slug", lazy: LoadPage(() => import("@/frontend/features/public-profile/PublicProfile")) },
      {
        element: <GuestOnly />,
        children: [
          { path: paths.login, lazy: LoadPage(() => import("@/frontend/features/auth/Login")) },
          { path: paths.signup, lazy: LoadPage(() => import("@/frontend/features/auth/Signup")) },
        ],
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: paths.app.dashboard,
            element: <DashboardLayout />,
            children: [
              { index: true, lazy: LoadPage(() => import("@/frontend/features/dashboard/Dashboard")) },
              { path: "profile", lazy: LoadPage(() => import("@/frontend/features/profile/Profile")) },
              { path: "analyzer", lazy: LoadPage(() => import("@/frontend/features/analyzer/Analyzer")) },
              { path: "job-match", lazy: LoadPage(() => import("@/frontend/features/job-match/JobMatch")) },
              { path: "roadmap", lazy: LoadPage(() => import("@/frontend/features/roadmap/Roadmap")) },
              { path: "resume", lazy: LoadPage(() => import("@/frontend/features/resume-builder/ResumeBuilder")) },
            ],
          },
        ],
      },
      { path: "*", lazy: LoadPage(() => import("@/frontend/features/not-found/NotFound")) },
    ],
  },
];

export const router = createBrowserRouter(routes);
