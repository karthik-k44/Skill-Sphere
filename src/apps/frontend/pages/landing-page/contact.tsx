import type { FormEvent } from 'react';
import { Clock3, Send } from 'lucide-react';
import { ContactMethods } from '../../constants';
import { Button } from '../../components';

const Contact = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-primary-50 dark:bg-black"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-primary-100 mb-4">
            Need Help Getting Started?
          </h2>
          <p className="text-xl text-primary-700 dark:text-primary-300 max-w-2xl mx-auto">
            Share your goal, the role you are targeting, or the part of Skill
            Sphere you want help with while building your profile and reviewing
            your AI insights.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {ContactMethods.map((method) => {
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
                  <p className="font-semibold">Best Results Tip</p>
                  <p className="text-primary-100 text-sm">
                    Complete your profile with skills, experience, projects, and
                    certifications before running the AI analyzer for more
                    useful feedback.
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
                    placeholder="Your Name"
                    className="w-full rounded-xl border border-primary-200 dark:border-primary-900 bg-white dark:bg-primary-950/30 px-4 py-3 text-black dark:text-primary-100 placeholder:text-primary-500 dark:placeholder:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black dark:text-primary-100 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-primary-200 dark:border-primary-900 bg-white dark:bg-primary-950/30 px-4 py-3 text-black dark:text-primary-100 placeholder:text-primary-500 dark:placeholder:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="currentRole"
                    className="block text-sm font-medium text-black dark:text-primary-100 mb-2"
                  >
                    Current Role
                  </label>
                  <input
                    id="currentRole"
                    type="text"
                    placeholder="Frontend Developer"
                    className="w-full rounded-xl border border-primary-200 dark:border-primary-900 bg-white dark:bg-primary-950/30 px-4 py-3 text-black dark:text-primary-100 placeholder:text-primary-500 dark:placeholder:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="helpTopic"
                    className="block text-sm font-medium text-black dark:text-primary-100 mb-2"
                  >
                    What Do You Need Help With?
                  </label>
                  <select
                    id="helpTopic"
                    className="w-full rounded-xl border border-primary-200 dark:border-primary-900 bg-white dark:bg-primary-950/30 px-4 py-3 text-black dark:text-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option>Creating my profile</option>
                    <option>Updating skills and experience</option>
                    <option>Understanding skill gaps</option>
                    <option>Using the AI analyzer</option>
                    <option>General question</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-black dark:text-primary-100 mb-2"
                >
                  What Is Your Goal?
                </label>
                <textarea
                  id="message"
                  rows={6}
                  required
                  placeholder="Tell us the role you are targeting, what part of your profile is incomplete, or what kind of AI feedback you want."
                  className="w-full rounded-xl border border-primary-200 dark:border-primary-900 bg-white dark:bg-primary-950/30 px-4 py-3 text-black dark:text-primary-100 placeholder:text-primary-500 dark:placeholder:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>

              <div className='w-full justify-end flex'>
                <div className="w-fit">
                  <Button>
                    <div className="flex items-center gap-2 justify-center">
                      Submit Request
                      <Send size={18} />
                    </div>
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
