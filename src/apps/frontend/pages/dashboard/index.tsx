import { useState, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Navbar } from "../../components";
import { NavbarItemsEnum, NavType } from "../../types/navbar";
import { ProtectedNavbar } from "../../constants/navbar"
import { ROUTES } from "../../routes/types";
import { UserProfileFormType } from "../../types/user-profile";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { GetUserProfile } from "../../redux/action";
import { resetAiAnalyzerState } from "../../redux/reducer/ai-analyzer";

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const dispatch = useAppDispatch();
 
  const { getUserProfileData } = useAppSelector((state) => state.userProfile);
  
  const [isActiveNavItem, setIsActiveNavItem] = useState<NavbarItemsEnum>(NavbarItemsEnum.HOME);
  
  const isUserProfileEmpty =
    !getUserProfileData?.userProfile ||
    Object.keys(getUserProfileData?.userProfile || {}).length === 0;

  useEffect(() => {
    if (userId) dispatch(GetUserProfile(userId)).catch(() => {});
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    dispatch(resetAiAnalyzerState());
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
        if (isUserProfileEmpty) {
          navigate(`${ROUTES.PROFILE}/${UserProfileFormType.CREATE}`);
        } else {
          navigate(`${ROUTES.PROFILE}/${UserProfileFormType.UPDATE}`);
        }
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
