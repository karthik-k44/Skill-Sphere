import {
  Briefcase,
  GraduationCap,
  Award,
  Globe,
  Heart,
  ExternalLink,
  Calendar,
  Code
} from 'lucide-react';
import type { UserProfileResponse } from '../../../types';

interface HomePageProps {
  userData: UserProfileResponse;
}

export default function HomePage({ userData }: HomePageProps) {
  const formatDate = (dateInput: string | Date) => {
    const date = new Date(dateInput);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  };

  const calculateDuration = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const months = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years > 0) {
      return remainingMonths > 0 ? `${years}y ${remainingMonths}m` : `${years}y`;
    }
    return `${remainingMonths}m`;
  };

  const getRatingColor = (rating: string) => {
    const num = parseInt(rating);
    if (num >= 4) return 'bg-emerald-500';
    if (num >= 3) return 'bg-primary-500';
    return 'bg-amber-500';
  };

  const getProficiencyWidth = (proficiency: string) => {
    const levels: { [key: string]: string } = {
      'Native': 'w-full',
      'Fluent': 'w-5/6',
      'Advanced': 'w-4/6',
      'Intermediate': 'w-3/6',
      'Conversational': 'w-2/6',
      'Basic': 'w-1/6'
    };
    return levels[proficiency] || 'w-1/6';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-primary-50 to-slate-100">
      <div className="">


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Code className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-800">Skills</h2>
              </div>
              <div className="space-y-4">
                {userData?.skills?.map((skill, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">{skill?.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{skill?.level}</span>
                        <span className="text-sm font-bold text-primary-600">{skill?.rating}/5</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className={`h-full ${getRatingColor(skill?.rating)} transition-all duration-500 ease-out`}
                        style={{ width: `${(parseInt(skill?.rating) / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
              </div>
              <div className="space-y-6">
                {userData?.experience?.map((exp, index) => (
                  <div key={index} className="relative pl-8 pb-8 border-l-2 border-primary-200 last:pb-0">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 bg-primary-600 rounded-full border-4 border-white" />
                    <div className="bg-gradient-to-br from-primary-50 to-slate-50 rounded-lg p-5">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">{exp?.role}</h3>
                      <p className="text-primary-600 font-semibold mb-3">{exp?.company}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(exp?.startDate.toString())} - {formatDate(exp?.endDate.toString())}</span>
                        <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                          {calculateDuration(exp?.startDate.toString(), exp?.endDate.toString())}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-2">Skills Achieved:</p>
                          <div className="flex flex-wrap gap-2">
                            {exp?.skillAchieved?.map((skill, idx) => (
                              <span key={idx} className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700 mb-2">Domains:</p>
                          <div className="flex flex-wrap gap-2">
                            {exp?.domainsWorked?.map((domain, idx) => (
                              <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                                {domain}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-800">Education</h2>
              </div>
              <div className="space-y-4">
                {userData?.education?.map((edu, index) => (
                  <div key={index} className="bg-gradient-to-br from-slate-50 to-primary-50 rounded-lg p-5 border border-slate-200">
                    <h3 className="text-lg font-bold text-gray-800">{edu?.degree}</h3>
                    <p className="text-primary-600 font-semibold mb-2">{edu?.institution}</p>
                    <p className="text-gray-600 mb-3">{edu?.fieldOfStudy}</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(edu?.startDate?.toString())} - {formatDate(edu?.endDate?.toString())}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-8">
            <section className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
              </div>
              <div className="space-y-4">
                {userData?.projects?.map((project, index) => (
                  <div key={index} className="bg-gradient-to-br from-primary-50 to-slate-50 rounded-lg p-4 border border-slate-200 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-800 mb-2">{project?.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{project?.description}</p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
                    >
                      View Project <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-800">Certifications</h2>
              </div>
              <div className="space-y-3">
                {userData?.certifications?.map((cert, index) => (
                  <a
                    key={index}
                    href={cert?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 p-3 bg-gradient-to-br from-emerald-50 to-slate-50 rounded-lg border border-slate-200 hover:shadow-md transition-shadow"
                  >
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm leading-tight">{cert?.name}</p>
                      <span className="text-xs text-primary-600 hover:text-primary-700 inline-flex items-center gap-1 mt-1">
                        Verify <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Globe className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-800">Languages</h2>
              </div>
              <div className="space-y-4">
                {userData?.languages?.map((lang, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">{lang?.name}</span>
                      <span className="text-sm text-gray-500">{lang?.proficiency}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-primary-500 to-primary-600 ${getProficiencyWidth(lang?.proficiency)} transition-all duration-500`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center gap-2 mb-6">
                <Heart className="w-6 h-6 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-800">Interests</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {userData?.interests?.map((interest, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-primary-100 to-slate-100 text-gray-700 rounded-full text-sm font-medium border border-slate-200 hover:shadow-md transition-shadow"
                  >
                    {interest?.name}
                  </span>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
