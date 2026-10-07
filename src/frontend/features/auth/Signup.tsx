import { Link, useNavigate } from "react-router-dom";
import { paths } from "@/frontend/config/paths";
import { useDocumentTitle } from "@/frontend/hooks/use-document-title";
import { AuthLayout } from "./components/AuthLayout";
import { DemoLoginButton } from "./components/DemoLoginButton";
import { SignupForm } from "./components/SignupForm";

const Signup = () => {
  useDocumentTitle("Create account");
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="Create your account"
      description="It takes a minute. Import your resume next to skip the typing."
      footer={
        <>
          Already have an account?{" "}
          <Link to={paths.login} className="font-medium text-primary underline-offset-4 hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <SignupForm onSuccess={() => navigate(paths.app.profile, { replace: true })} />
      <DemoLoginButton onSuccess={() => navigate(paths.app.dashboard, { replace: true })} />
    </AuthLayout>
  );
};

export default Signup;
