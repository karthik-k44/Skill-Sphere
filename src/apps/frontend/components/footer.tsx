import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-50 dark:bg-black border-t border-primary-200 dark:border-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-4">
              BrandName
            </h3>
            <p className="text-primary-700 dark:text-primary-300 mb-4 max-w-md">
              Building the future of digital experiences with powerful tools and seamless collaboration.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white dark:bg-primary-950/30 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors border border-primary-200 dark:border-primary-900">
                <Twitter size={20} className="text-primary-700 dark:text-primary-300" />
              </a>
              <a href="#" className="p-2 bg-white dark:bg-primary-950/30 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors border border-primary-200 dark:border-primary-900">
                <Github size={20} className="text-primary-700 dark:text-primary-300" />
              </a>
              <a href="#" className="p-2 bg-white dark:bg-primary-950/30 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors border border-primary-200 dark:border-primary-900">
                <Linkedin size={20} className="text-primary-700 dark:text-primary-300" />
              </a>
              <a href="#" className="p-2 bg-white dark:bg-primary-950/30 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors border border-primary-200 dark:border-primary-900">
                <Mail size={20} className="text-primary-700 dark:text-primary-300" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-black dark:text-primary-100 mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Features</a></li>
              <li><a href="#" className="text-primary-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="text-primary-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Security</a></li>
              <li><a href="#" className="text-primary-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Roadmap</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-black dark:text-primary-100 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-primary-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">About</a></li>
              <li><a href="#" className="text-primary-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-primary-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-primary-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-200 dark:border-primary-900 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-700 dark:text-primary-300 text-sm mb-4 md:mb-0">
            {currentYear} BrandName. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-primary-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-primary-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-primary-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
