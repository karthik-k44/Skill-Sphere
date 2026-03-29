import { ArrowRight } from 'lucide-react';
import { AboutHighlights } from '../../constants';

interface AboutProps {
  onGetStarted: () => void;
  onContactClick: () => void;
}

const About = ({ onGetStarted, onContactClick }: AboutProps) => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-primary-100 mb-4">
            About Skill Sphere
          </h2>
          <p className="text-xl text-primary-700 dark:text-primary-300 max-w-3xl mx-auto">
            Skill Sphere is a career support platform for learners and job seekers who want to build
            a stronger profile, understand their current strengths, and improve with clear next steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {AboutHighlights.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="bg-white dark:bg-black rounded-2xl border border-primary-100 dark:border-primary-900 p-7 shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-5">
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-black dark:text-primary-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-primary-700 dark:text-primary-300 leading-relaxed">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="relative overflow-hidden bg-gradient-to-r from-primary-700 to-primary-900 rounded-3xl p-10 md:p-14 shadow-2xl">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />

          <div className="relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
              How Skill Sphere Supports Your Growth
            </h3>
            <p className="text-primary-100 text-center max-w-3xl mx-auto mb-8">
              Create an account, complete your profile, and turn scattered experience into a clearer
              career story with AI-backed feedback.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-primary-50">
                <p className="font-semibold mb-1">1. Create Account</p>
                <p className="text-sm">Sign up and access your personal dashboard inside Skill Sphere.</p>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-primary-50">
                <p className="font-semibold mb-1">2. Complete Profile</p>
                <p className="text-sm">Add skills, education, experience, projects, certifications, and interests.</p>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-primary-50">
                <p className="font-semibold mb-1">3. Review Insights</p>
                <p className="text-sm">Generate AI feedback to understand strengths, focus areas, and next actions.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onGetStarted}
                className="group px-8 py-4 bg-white hover:bg-primary-50 text-primary-700 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>Start Building</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onContactClick}
                className="px-8 py-4 bg-transparent hover:bg-primary-500/20 text-white rounded-xl font-medium transition-colors border-2 border-white"
              >
                Need Help?
              </button>
            </div>

            <p className="text-sm text-primary-100 mt-6 text-center">
              Profile building | AI guidance | Career-focused improvement
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
