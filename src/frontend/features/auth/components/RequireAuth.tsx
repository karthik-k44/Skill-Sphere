import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PageLoader } from "@/frontend/components/feedback/PageLoader";
import { paths } from "@/frontend/config/paths";
import { authService } from "../services";

/** Route guard for the dashboard. Remembers where the user was headed so login can send them back. */
export const RequireAuth = () => {
  const location = useLocation();
  const { data: user, isPending } = authService.useSession();

  if (isPending) return <PageLoader label="Restoring your session" />;
  if (!user) return <Navigate to={paths.login} replace state={{ from: location.pathname }} />;
  return <Outlet />;
};
