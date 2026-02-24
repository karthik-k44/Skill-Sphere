import type { FormEvent } from 'react';
import { Clock3, Mail, MapPin, PhoneCall, Send } from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email Us',
    value: 'hello@skillsphere.dev',
    caption: 'We usually respond within 24 hours.',
  },
  {
    icon: PhoneCall,
    title: 'Call Us',
    value: '+1 (555) 743-1009',
    caption: 'Mon to Fri, 9:00 AM to 6:00 PM PST.',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    value: '221 Market St, San Francisco, CA',
    caption: 'Come by for product demos and onboarding.',
  },
];

const Contact = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-50 dark:bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-primary-100 mb-4">
            Let&apos;s Build Together
          </h2>
          <p className="text-xl text-primary-700 dark:text-primary-300 max-w-2xl mx-auto">
            Tell us what you&apos;re building and we&apos;ll help you get started with the right plan.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div
                  key={method.title}
                  className="bg-white dark:bg-black rounded-2xl p-6 border border-primary-100 dark:border-primary-900 shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-black dark:text-primary-100">
                        {method.title}
                      </h3>
                      <p className="text-primary-800 dark:text-primary-200 font-medium">
                        {method.value}
                      </p>
                      <p className="text-sm text-primary-700 dark:text-primary-300 mt-1">
                        {method.caption}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="bg-gradient-to-r from-primary-700 to-primary-900 rounded-2xl p-6 text-white shadow-xl">
              <div className="flex items-start gap-3">
                <Clock3 size={20} className="mt-1" />
                <div>
                  <p className="font-semibold">Priority Support Window</p>
                  <p className="text-primary-100 text-sm">
                    Enterprise customers can request implementation calls with our solutions team.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 bg-white dark:bg-black rounded-3xl p-8 md:p-10 border border-primary-100 dark:border-primary-900 shadow-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-black dark:text-primary-100 mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    placeholder="Jane Cooper"
                    className="w-full rounded-xl border border-primary-200 dark:border-primary-900 bg-white dark:bg-primary-950/30 px-4 py-3 text-black dark:text-primary-100 placeholder:text-primary-500 dark:placeholder:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="workEmail"
                    className="block text-sm font-medium text-black dark:text-primary-100 mb-2"
                  >
                    Work Email
                  </label>
                  <input
                    id="workEmail"
                    type="email"
                    required
                    placeholder="jane@company.com"
                    className="w-full rounded-xl border border-primary-200 dark:border-primary-900 bg-white dark:bg-primary-950/30 px-4 py-3 text-black dark:text-primary-100 placeholder:text-primary-500 dark:placeholder:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-black dark:text-primary-100 mb-2"
                  >
                    Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    placeholder="SkillSphere Inc."
                    className="w-full rounded-xl border border-primary-200 dark:border-primary-900 bg-white dark:bg-primary-950/30 px-4 py-3 text-black dark:text-primary-100 placeholder:text-primary-500 dark:placeholder:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="teamSize"
                    className="block text-sm font-medium text-black dark:text-primary-100 mb-2"
                  >
                    Team Size
                  </label>
                  <select
                    id="teamSize"
                    className="w-full rounded-xl border border-primary-200 dark:border-primary-900 bg-white dark:bg-primary-950/30 px-4 py-3 text-black dark:text-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option>1-10</option>
                    <option>11-50</option>
                    <option>51-200</option>
                    <option>201-1000</option>
                    <option>1000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-black dark:text-primary-100 mb-2"
                >
                  How can we help?
                </label>
                <textarea
                  id="message"
                  rows={6}
                  required
                  placeholder="Tell us about your use case, goals, and timeline."
                  className="w-full rounded-xl border border-primary-200 dark:border-primary-900 bg-white dark:bg-primary-950/30 px-4 py-3 text-black dark:text-primary-100 placeholder:text-primary-500 dark:placeholder:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors font-medium inline-flex items-center justify-center gap-2"
              >
                Send Message
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
