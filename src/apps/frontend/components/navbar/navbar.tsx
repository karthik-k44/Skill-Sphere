import { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../../contexts/use-themes';

interface NavigationProps {
  onLoginClick: () => void;
}

export function Navigation({ onLoginClick }: NavigationProps) {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleAuthButtonClick = () => {
      localStorage.removeItem('authToken');
    onLoginClick();
  };

  return (
    <nav className="fixed top-0 w-full bg-white/90 dark:bg-black/90 backdrop-blur-md z-40 border-b border-primary-200 dark:border-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                BrandName
              </h1>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-center space-x-8">
                <a href="#features" className="text-primary-900 dark:text-primary-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Features
                </a>
                <a href="#about" className="text-primary-900 dark:text-primary-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  About
                </a>
                <a href="#pricing" className="text-primary-900 dark:text-primary-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Pricing
                </a>
                <a href="#contact" className="text-primary-900 dark:text-primary-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-primary-100 dark:bg-primary-950/40 hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon size={20} className="text-primary-800 dark:text-primary-300" />
              ) : (
                <Sun size={20} className="text-primary-800 dark:text-primary-300" />
              )}
            </button>

            <button
              onClick={handleAuthButtonClick}
              className="hidden md:block px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
            >
              { 'Sign In'}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-950/40 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-primary-200 dark:border-primary-900 bg-white dark:bg-black">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <a href="#features" className="block px-3 py-2 rounded-lg text-primary-900 dark:text-primary-200 hover:bg-primary-100 dark:hover:bg-primary-950/40 transition-colors">
              Features
            </a>
            <a href="#about" className="block px-3 py-2 rounded-lg text-primary-900 dark:text-primary-200 hover:bg-primary-100 dark:hover:bg-primary-950/40 transition-colors">
              About
            </a>
            <a href="#pricing" className="block px-3 py-2 rounded-lg text-primary-900 dark:text-primary-200 hover:bg-primary-100 dark:hover:bg-primary-950/40 transition-colors">
              Pricing
            </a>
            <a href="#contact" className="block px-3 py-2 rounded-lg text-primary-900 dark:text-primary-200 hover:bg-primary-100 dark:hover:bg-primary-950/40 transition-colors">
              Contact
            </a>
            <button
              onClick={() => {
                handleAuthButtonClick();
                setIsMenuOpen(false);
              }}
              className="w-full px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors font-medium"
            >
              { 'Sign In'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
