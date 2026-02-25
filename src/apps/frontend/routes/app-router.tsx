import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/dashboard";
import LandingPage from "../pages/landing-page";
import ProtectedRoute from "./protected-route";
import PublicRoute from "./public-route";
import { ROUTES } from "./types";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={ROUTES.DASHBOARD} element={<LandingPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.PORTAL} element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
};

export default AppRouter;
