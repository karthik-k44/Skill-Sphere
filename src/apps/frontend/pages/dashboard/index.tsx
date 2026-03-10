import { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Navbar } from "../../components";
import { NavbarItemsEnum, NavType } from "../../types/navbar";
import { ProtectedNavbar } from "../../constants/navbar"
import { ROUTES } from "../../routes/types";
import { UserProfileFormType } from "../../types/user-profile";

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isActiveNavItem, setIsActiveNavItem] = useState<NavbarItemsEnum>(NavbarItemsEnum.HOME);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate(ROUTES.DASHBOARD);
  };

  useEffect(() => {
    const path = location.pathname;
    if (path.includes(ROUTES.RESUME_BUILDER)) {
      setIsActiveNavItem(NavbarItemsEnum.RESUME_BUILDER);
    } else if (path.includes(ROUTES.AI_ANALYZER)) {
      setIsActiveNavItem(NavbarItemsEnum.AI_ANALYZER);
    } else if (path.includes(ROUTES.PROFILE)) {
      setIsActiveNavItem(NavbarItemsEnum.PROFILE);
    } else {
      setIsActiveNavItem(NavbarItemsEnum.HOME);
    }
  }, [location.pathname]);

  const handleNavChange = (item: NavbarItemsEnum) => {
    setIsActiveNavItem(item);
    switch (item) {
      case NavbarItemsEnum.RESUME_BUILDER:
        navigate(ROUTES.RESUME_BUILDER);
        break;
      case NavbarItemsEnum.AI_ANALYZER:
        navigate(ROUTES.AI_ANALYZER);
        break;
      case NavbarItemsEnum.PROFILE:
        navigate(`${ROUTES.PROFILE}/${UserProfileFormType.UPDATE}`);
        break;
      case NavbarItemsEnum.HOME:
      default:
        navigate(ROUTES.PORTAL);
        break;
    }
  };

  return (
    <div>
      <Navbar
        navType={NavType.PROTECTED}
        onLoginClick={handleLogout}
        navbarItems={ProtectedNavbar}
        setIsActiveNavItem={handleNavChange}
        isActiveNavItem={isActiveNavItem}
      />
      <Outlet />
    </div>
  );
};

export default DashboardPage;
