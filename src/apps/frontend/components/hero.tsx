import { ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onGetStarted: () => void;
}

export function Hero({ onGetStarted }: HeroProps) {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full mb-6">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              New: Introducing v2.0 with Advanced Features
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Build Your Dream
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Digital Experience
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-3xl mx-auto leading-relaxed">
            Transform your ideas into reality with our powerful platform.
            Create, collaborate, and scale with ease. Join thousands of teams
            building the future.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onGetStarted}
              className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button className="px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium transition-colors border border-gray-200 dark:border-gray-700 flex items-center space-x-2">
              <Play size={20} />
              <span>Watch Demo</span>
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">50K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">24/7</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
