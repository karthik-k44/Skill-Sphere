import { Link, useLocation, useNavigate } from "react-router-dom";
import { paths } from "@/frontend/config/paths";
import { useDocumentTitle } from "@/frontend/hooks/use-document-title";
import { AuthLayout } from "./components/AuthLayout";
import { DemoLoginButton } from "./components/DemoLoginButton";
import { LoginForm } from "./components/LoginForm";

const Login = () => {
  useDocumentTitle("Log in");
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = (location.state as { from?: string } | null)?.from ?? paths.app.dashboard;

  const GoToApp = () => navigate(redirectTo, { replace: true });

  return (
    <AuthLayout
      title="Welcome back"
      description="Log in to pick up where you left off."
      footer={
        <>
          New to SkillSphere?{" "}
          <Link to={paths.signup} className="font-medium text-primary underline-offset-4 hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm onSuccess={GoToApp} />
      <DemoLoginButton onSuccess={GoToApp} />
    </AuthLayout>
  );
};

export default Login;
