import { Zap, Shield, Users, Smartphone, Cloud, BarChart } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Experience blazing-fast performance with our optimized infrastructure and global CDN.',
  },
  {
    icon: Shield,
    title: 'Secure by Default',
    description: 'Enterprise-grade security with end-to-end encryption and compliance certifications.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Work seamlessly with your team with real-time collaboration and shared workspaces.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Ready',
    description: 'Fully responsive design that works perfectly on all devices and screen sizes.',
  },
  {
    icon: Cloud,
    title: 'Cloud Powered',
    description: 'Reliable cloud infrastructure with 99.9% uptime and automatic backups.',
  },
  {
    icon: BarChart,
    title: 'Analytics Dashboard',
    description: 'Get insights with detailed analytics and reporting tools to track your progress.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-50 dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-primary-100 mb-4">
            Everything You Need
          </h2>
          <p className="text-xl text-primary-700 dark:text-primary-300 max-w-2xl mx-auto">
            Powerful features to help you build, scale, and succeed in your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-white dark:bg-black rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-primary-100 dark:border-primary-900"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-black dark:text-primary-100 mb-3">
                  {feature.title}
                </h3>
                <p className="text-primary-700 dark:text-primary-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
