import { ArrowRight, Bot, FileText, Target, TrendingUp } from 'lucide-react';

interface AboutProps {
  onGetStarted: () => void;
}

const aboutHighlights = [
  {
    icon: Target,
    title: 'Skill Discovery',
    description:
      'Identify strengths and skill gaps with guided assessments and structured learning paths.',
  },
  {
    icon: Bot,
    title: 'AI Career Advice',
    description:
      'Get practical, personalized suggestions for learning priorities, project ideas, and interview prep.',
  },
  {
    icon: FileText,
    title: 'Resume AI Assistant',
    description:
      'Generate role-focused resumes that translate your skills into recruiter-friendly impact statements.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Tracking',
    description:
      'Track your progress over time and understand which skills unlock better career opportunities.',
  },
];

const About = ({ onGetStarted }: AboutProps) => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-primary-100 mb-4">
            About SkillSphere
          </h2>
          <p className="text-xl text-primary-700 dark:text-primary-300 max-w-3xl mx-auto">
            SkillSphere helps people understand what they are good at, what to improve next, and how
            to present those skills confidently in the job market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {aboutHighlights.map((item) => {
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
              What You Can Do with SkillSphere
            </h3>
            <p className="text-primary-100 text-center max-w-3xl mx-auto mb-8">
              From skill assessment to resume optimization, everything is designed to help you take
              clear action on your career growth.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-primary-50">
                <p className="font-semibold mb-1">1. Discover</p>
                <p className="text-sm">Assess current skills and map a focused growth plan.</p>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-primary-50">
                <p className="font-semibold mb-1">2. Improve</p>
                <p className="text-sm">Follow AI-backed advice for projects, learning, and practice.</p>
              </div>
              <div className="bg-white/10 border border-white/20 rounded-xl p-4 text-primary-50">
                <p className="font-semibold mb-1">3. Present</p>
                <p className="text-sm">Build resume content aligned to your target roles.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={onGetStarted}
                className="group px-8 py-4 bg-white hover:bg-primary-50 text-primary-700 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#contact"
                className="px-8 py-4 bg-transparent hover:bg-primary-500/20 text-white rounded-xl font-medium transition-colors border-2 border-white"
              >
                Talk to Us
              </a>
            </div>

            <p className="text-sm text-primary-100 mt-6 text-center">
              Personalized guidance | Resume-ready output | Career-focused growth
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
