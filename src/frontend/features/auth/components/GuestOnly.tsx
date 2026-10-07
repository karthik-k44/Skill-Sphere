import { useRef } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { PageLoader } from "@/frontend/components/feedback/PageLoader";
import { paths } from "@/frontend/config/paths";
import { authService } from "../services";

/**
 * Keeps already-signed-in visitors off the login and signup pages.
 * It only judges the session as it was on arrival: when the user signs in *here*, the form
 * decides where to go next (back to the page they came from, or the profile after signup).
 */
export const GuestOnly = () => {
  const { data: user, isPending } = authService.useSession();
  const signedInOnArrival = useRef<boolean | null>(null);

  if (isPending) return <PageLoader />;
  signedInOnArrival.current ??= Boolean(user);
  if (signedInOnArrival.current) return <Navigate to={paths.app.dashboard} replace />;
  return <Outlet />;
};
