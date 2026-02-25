import React, { useState } from "react";
import { NavbarItemsEnum, NavType, type NavbarItem } from "../../types/navbar";
import { useTheme } from "../../contexts/use-themes";
import { Menu, Moon, Sun, X } from "lucide-react";
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
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAuthButtonClick = () => {
    localStorage.removeItem("authToken");
    onLoginClick();
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 dark:bg-black/90 backdrop-blur-md z-40 border-b border-primary-200 dark:border-primary-900">
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
            <button
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
            </button>
            {navType === NavType?.PUBLIC ? (
                <button
                  onClick={handleAuthButtonClick}
                  className="hidden md:block px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
                >
                  {"Sign In"}
                </button>

            ):(
                <Button onClick={onLoginClick}>{"Logout"}</Button>
            )}
                
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-primary-100 dark:bg-primary-950/40 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-primary-200 dark:border-primary-900 bg-white dark:bg-black">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navbarItems.map((item) => (
              <div
                onClick={() => {
                  setIsMenuOpen(false);
                }}
                className="hover:cursor-pointer"
              >
                <Text font="LabelSmall" tabletFont="LabelMedium">
                  {item.label}
                </Text>
              </div>
            ))}
            {navType === NavType?.PUBLIC ? (
              <button
                onClick={() => {
                  handleAuthButtonClick();
                  setIsMenuOpen(false);
                }}
                className="w-full px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
              >
                {"Sign In"}
              </button>
            ) : (
              <Button onClick={onLoginClick}>{"Logout"}</Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
