import { ArrowRight, Sparkles } from 'lucide-react';
import type React from 'react';

interface HeroProps {
  onGetStarted: () => void;
  onExploreFeatures: () => void;
}

const Home: React.FC<HeroProps> = ({ onGetStarted, onExploreFeatures }) => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6">
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              Smart career growth starts with a complete profile
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-primary-100 mb-6 leading-tight">
            Turn Your Skills
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Into a Career-Ready Profile
            </span>
          </h1>

          <p className="text-xl text-primary-700 dark:text-primary-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Skill Sphere helps you organize your skills, education, experience,
            projects, and certifications in one place, then use AI insights to
            understand your strengths and improve what comes next.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onGetStarted}
              className="group px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>Create Your Profile</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onExploreFeatures}
              className="px-8 py-4 bg-white dark:bg-black hover:bg-primary-50 dark:hover:bg-primary-950/40 text-black dark:text-primary-100 rounded-xl font-medium transition-colors border border-primary-200 dark:border-primary-900 flex items-center space-x-2"
            >
              <Sparkles size={20} />
              <span>Explore Features</span>
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-black dark:text-primary-100 mb-1">Profile</div>
              <div className="text-sm text-primary-700 dark:text-primary-300">Skills, education, and projects in one place</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black dark:text-primary-100 mb-1">AI</div>
              <div className="text-sm text-primary-700 dark:text-primary-300">Strengths, gaps, and practical next steps</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black dark:text-primary-100 mb-1">Growth</div>
              <div className="text-sm text-primary-700 dark:text-primary-300">A dashboard focused on career improvement</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
