const Footer = () => {
  const currentYear = new Date().getFullYear();
  const platformHighlights = ['Profile Builder', 'AI Analyzer', 'Career Growth'];
  const gettingStarted = [
    'Create your account',
    'Complete your profile',
    'Review AI insights',
    'Keep your data updated',
  ];
  const builtFor = [
    'Students',
    'Job seekers',
    'Career switchers',
    'Growing professionals',
  ];

  return (
    <footer className="bg-primary-50 dark:bg-black border-t border-primary-200 dark:border-primary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-4">
              Skill Sphere
            </h3>
            <p className="text-primary-700 dark:text-primary-300 mb-4 max-w-md">
              Skill Sphere helps users build professional profiles, organize skills and experience,
              and use AI guidance to identify the next step in their career growth.
            </p>
            <div className="flex flex-wrap gap-3">
              {platformHighlights.map((item) => (
                <span
                  key={item}
                  className="px-3 py-2 text-sm bg-white dark:bg-primary-950/30 rounded-lg border border-primary-200 dark:border-primary-900 text-primary-700 dark:text-primary-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-black dark:text-primary-100 mb-4">Getting Started</h4>
            <ul className="space-y-2">
              {gettingStarted.map((item) => (
                <li key={item} className="text-primary-700 dark:text-primary-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-black dark:text-primary-100 mb-4">Built For</h4>
            <ul className="space-y-2">
              {builtFor.map((item) => (
                <li key={item} className="text-primary-700 dark:text-primary-300">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-200 dark:border-primary-900 flex flex-col md:flex-row justify-between items-center">
          <p className="text-primary-700 dark:text-primary-300 text-sm mb-4 md:mb-0">
            {currentYear} Skill Sphere. Profile building and AI-guided career growth in one workspace.
          </p>
          <div className="flex space-x-6 text-sm">
            <span className="text-primary-700 dark:text-primary-300">Profile-first</span>
            <span className="text-primary-700 dark:text-primary-300">AI-guided</span>
            <span className="text-primary-700 dark:text-primary-300">Career-focused</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
