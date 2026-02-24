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
        <Route path={ROUTES.LANDING} element={<LandingPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
