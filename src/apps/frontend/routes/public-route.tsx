import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "./types";

const PublicRoute = () => {
  const token = localStorage.getItem("authToken");

  if (token) {
    return <Navigate to={ROUTES.PORTAL} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
