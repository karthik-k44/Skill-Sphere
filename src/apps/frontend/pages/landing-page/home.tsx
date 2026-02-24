import { ArrowRight, Play } from 'lucide-react';
import type React from 'react';

interface HeroProps {
  onGetStarted: () => void;
}

const Home: React.FC<HeroProps> = ({ onGetStarted }) => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6">
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              New: Introducing v2.0 with Advanced Features
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-primary-100 mb-6 leading-tight">
            Build Your Dream
            <br />
            <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              Digital Experience
            </span>
          </h1>

          <p className="text-xl text-primary-700 dark:text-primary-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Transform your ideas into reality with our powerful platform.
            Create, collaborate, and scale with ease. Join thousands of teams
            building the future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onGetStarted}
              className="group px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="px-8 py-4 bg-white dark:bg-black hover:bg-primary-50 dark:hover:bg-primary-950/40 text-black dark:text-primary-100 rounded-xl font-medium transition-colors border border-primary-200 dark:border-primary-900 flex items-center space-x-2">
              <Play size={20} />
              <span>Watch Demo</span>
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-black dark:text-primary-100 mb-1">50K+</div>
              <div className="text-sm text-primary-700 dark:text-primary-300">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black dark:text-primary-100 mb-1">98%</div>
              <div className="text-sm text-primary-700 dark:text-primary-300">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-black dark:text-primary-100 mb-1">24/7</div>
              <div className="text-sm text-primary-700 dark:text-primary-300">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
