import React, { useState } from "react";
import { NavbarItemsEnum, NavType, type NavbarItem } from "../../types/navbar";
// import { useTheme } from "../../contexts/use-themes";
import { LogIn, LogOut, Menu, X } from "lucide-react";
import Text from "../typography/text";
import Button from "../button";

interface NavbarProps {
  navType: NavType;
  onLoginClick: () => void;
  navbarItems: NavbarItem[];
  isActiveNavItem?: NavbarItemsEnum;
  setIsActiveNavItem?: (value: NavbarItemsEnum) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  navType,
  onLoginClick,
  navbarItems,
  setIsActiveNavItem,
  isActiveNavItem,
}) => {
  // const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAuthButtonClick = () => {
    localStorage.removeItem("authToken");
    onLoginClick();
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 dark:bg-black/90 backdrop-blur-md z-9 border-b border-primary-200 dark:border-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1
                className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent hover:cursor-pointer"
              >
                Skill Sphere
              </h1>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-8">
                {navbarItems.map((item) => (
                  <div
                    onClick={() => {
                      setIsActiveNavItem?.(item.value);
                    }}
                    className="hover:cursor-pointer"
                  >
                    <Text font="LabelSmall" tabletFont="LabelMedium" color={isActiveNavItem === item.value ? "text-primary" : undefined}>
                      {item.label}
                    </Text>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-primary-100 dark:bg-primary-950/40 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon
                  size={20}
                  className="text-primary-800 dark:text-primary-300"
                />
              ) : (
                <Sun
                  size={20}
                  className="text-primary-800 dark:text-primary-300"
                />
              )}
            </button> */}
            {navType === NavType?.PUBLIC ? (
              <div className="hidden md:block">
                <Button
                  onClick={handleAuthButtonClick}
                >
                  <div className="flex items-center gap-2">
                    <LogIn size={16} />
                    <span>Sign In</span>
                  </div>
                </Button>
              </div>
            ):(
                <div className="hidden md:block">
                  <Button onClick={onLoginClick}>
                    <div className="flex items-center gap-2">
                      <LogOut className="rotate-180" size={16} />
                      <span>Logout</span>
                    </div>
                  </Button>
                </div>
            )}   
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-primary-100 dark:bg-primary-950/40 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors z-50 relative"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black/50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen w-[65%] bg-white dark:bg-black z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } border-r border-primary-200 dark:border-primary-900 shadow-2xl`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-primary-200 dark:border-primary-900 flex items-center h-16">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Skill Sphere
            </h1>
          </div>

          <div className="px-4 py-4 space-y-2 overflow-y-auto flex-1">
            {navbarItems.map((item) => (
              <div
                key={item.value}
                onClick={() => {
                  setIsActiveNavItem?.(item.value);
                  setIsMenuOpen(false);
                }}
                className={`hover:cursor-pointer p-3 rounded-lg transition-colors ${
                  isActiveNavItem === item.value
                    ? "bg-primary-50 dark:bg-primary-900/20"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <Text
                  font="LabelMedium"
                  color={
                    isActiveNavItem === item.value ? "text-primary" : undefined
                  }
                >
                  {item.label}
                </Text>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-primary-200 dark:border-primary-900">
            {navType === NavType?.PUBLIC ? (
              <Button
                onClick={() => {
                  handleAuthButtonClick();
                  setIsMenuOpen(false);
                }}
              >
                <div className="flex items-center justify-center gap-2">
                  <LogIn size={16} />
                  <span>Sign In</span>
                </div>
              </Button>
            ) : (
              <Button onClick={onLoginClick}>
                 <div className="flex items-center gap-2">
                   <LogOut className="rotate-180" size={16} />
                   <span>Logout</span>
                 </div>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
