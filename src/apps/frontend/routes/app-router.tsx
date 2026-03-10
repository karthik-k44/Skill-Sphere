import { Navigate, Route, Routes } from "react-router-dom";
import DashboardPage from "../pages/dashboard";
import LandingPage from "../pages/landing-page";
import ProtectedRoute from "./protected-route";
import PublicRoute from "./public-route";
import { ROUTES } from "./types";
import ResumeBuilder from "../pages/dashboard/resume-builder";
import Home from "../pages/dashboard/home";
import AIAnalyzer from "../pages/dashboard/ai-analyzer";
import Profile from "../pages/dashboard/profile";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path={ROUTES.DASHBOARD} element={<LandingPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.PORTAL} element={<DashboardPage />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.RESUME_BUILDER} element={<ResumeBuilder />} />
          <Route path={ROUTES.AI_ANALYZER} element={<AIAnalyzer />} />
          <Route path={`${ROUTES.PROFILE}/:type`} element={<Profile />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
};

export default AppRouter;
