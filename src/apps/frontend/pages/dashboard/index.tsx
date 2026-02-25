import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components";
import { NavbarItemsEnum, NavType } from "../../types/navbar";
import { ProtectedNavbar } from "../../constants/navbar"
import { ROUTES } from "../../routes/types";
import Home from "./home";
import ResumeBuilder from "./resume-builder";
import AIAnalyzer from "./ai-analyzer";
import Profile from "./profile";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [isActiveNavItem, setIsActiveNavItem] = useState<NavbarItemsEnum>(NavbarItemsEnum.HOME);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate(ROUTES.DASHBOARD);
  };

  return (
    <div>
      <Navbar
        navType={NavType.PROTECTED}
        onLoginClick={handleLogout}
        navbarItems={ProtectedNavbar}
        setIsActiveNavItem={setIsActiveNavItem}
        isActiveNavItem={isActiveNavItem}
      />
      {isActiveNavItem === NavbarItemsEnum.HOME && <Home />}
      {isActiveNavItem === NavbarItemsEnum.RESUME_BUILDER && <ResumeBuilder />}
      {isActiveNavItem === NavbarItemsEnum.AI_ANALYZER && <AIAnalyzer />}
      {isActiveNavItem === NavbarItemsEnum.PROFILE && <Profile />}
    </div>
  );
};

export default DashboardPage;
