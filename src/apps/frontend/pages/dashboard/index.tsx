import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardService, type DashboardData } from "../../services/dashboard.service";
import { Navbar } from "../../components";
import { NavType } from "../../types/navbar";
import { ProtectedNavbar } from "../../constants/navbar";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await DashboardService.getDashboardData();
        setDashboard(response.data ?? null);
      } catch (err) {
        localStorage.removeItem("authToken");
        setError(err instanceof Error ? err.message : "Unable to load dashboard");
        navigate("/", { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    void loadDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/", { replace: true });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar
        navType={NavType.PROTECTED}
        onLoginClick={handleLogout}
        navbarItems={ProtectedNavbar}
      />
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <p className="text-lg text-gray-700">
            {dashboard?.welcome ?? "Welcome!"}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-sm text-gray-500 mb-1">Active Courses</h2>
            <p className="text-2xl font-semibold text-gray-900">
              {dashboard?.metrics.activeCourses ?? 0}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-sm text-gray-500 mb-1">Completed Courses</h2>
            <p className="text-2xl font-semibold text-gray-900">
              {dashboard?.metrics.completedCourses ?? 0}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-5">
            <h2 className="text-sm text-gray-500 mb-1">Skill Score</h2>
            <p className="text-2xl font-semibold text-gray-900">
              {dashboard?.metrics.skillScore ?? 0}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
