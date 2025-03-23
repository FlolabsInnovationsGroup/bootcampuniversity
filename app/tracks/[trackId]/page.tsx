import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/shared/Badge';
import { TechnologyStack } from '@/components/tracks/TechnologyStack';
import { getTrackBySlug } from '@/lib/data/tracks';
import { getColorClass } from '@/lib/utils/tailwindhelpers';
import { GraduationCap } from 'lucide-react';

type PageProps = {
  params: Promise<{ trackId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | undefined;
};

export default async function TrackDetailPage({ 
  params,
  searchParams,
}: PageProps) {
  const resolvedParams = await params;
  const track = getTrackBySlug(resolvedParams.trackId);

  if (!track) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-950 dark:to-gray-900/50">
      {/* Hero Section */}
      <div className={`relative overflow-hidden bg-gradient-to-r ${getColorClass('bg-gradient', track.color)} py-20`}>
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${getColorClass('bg-gradient', track.color)}/90`} />
          <svg
            className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 opacity-20"
            width="404"
            height="404"
            fill="none"
            viewBox="0 0 404 404"
          >
            <defs>
              <pattern id="pattern-squares" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" fill="white" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#pattern-squares)" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2">
              <Badge variant="secondary" className="mb-6 border-2 border-white/20">
                <GraduationCap className="mr-1.5 h-3.5 w-3.5" />
                Learning Track
              </Badge>
              <h1 className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
                {track.title}
              </h1>
              <p className="mt-6 max-w-2xl text-xl text-white/90">
                {track.description}
              </p>
              <div className="mt-8 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link
                  href={`/tracks/${track.slug}/curriculum`}
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white transition-colors duration-200"
                >
                  View Curriculum
                </Link>
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md shadow-sm text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white transition-colors duration-200"
                >
                  Apply Now
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/2 mt-10 md:mt-0">
              <div className="relative mx-auto w-full rounded-lg shadow-xl overflow-hidden">
                <Image
                  src={track.image}
                  alt={track.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills & Career Paths */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">
                What You'll Learn
              </h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                Gain in-demand skills through our comprehensive curriculum that combines 
                theoretical learning with hands-on projects.
              </p>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-2">
              <div className="space-y-5">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">Skills You'll Develop</h3>
                <div className="flex flex-wrap gap-2">
                  {track.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-300">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-12 space-y-5">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">Career Paths</h3>
                <ul className="space-y-3">
                  {track.careers.map((career) => (
                    <li key={career} className="flex items-start">
                      <svg
                        className="h-5 w-5 text-green-500 mt-0.5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="ml-3 text-gray-700 dark:text-gray-300">{career}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="bg-gray-50/50 dark:bg-gray-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TechnologyStack 
            title="Technologies You'll Master"
            description="Our curriculum is built around industry-standard technologies that employers are actively seeking."
            technologies={track.technologies}
          />
        </div>
      </section>

      {/* Tier Journey */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">
              Your <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Learning Journey</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              From foundational concepts to advanced mastery, our tiered program provides a clear path to success.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Tier 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-2">Tier 1: Bootcamp</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Build a solid foundation with self-paced learning through industry platforms combined with guided projects.
                </p>
                <div className="mt-6">
                  <h4 className="text-sm font-medium uppercase text-gray-500 dark:text-gray-400 mb-2">What You'll Learn:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-600 dark:text-gray-300">Core concepts and fundamentals</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-600 dark:text-gray-300">Industry-standard tools and platforms</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-600 dark:text-gray-300">Guided project experience</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <Link
                    href={`/tracks/${track.slug}/curriculum`}
                    className="text-blue-600 dark:text-primary-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white transition-colors duration-200"
                  >
                    View Tier 1 Curriculum
                  </Link>
                </div>
              </div>
            </div>

            {/* Tier 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-2">Tier 2: Apprenticeship</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Gain hands-on experience working on real client projects while earning compensation as an apprentice.
                </p>
                <div className="mt-6">
                  <h4 className="text-sm font-medium uppercase text-gray-500 dark:text-gray-400 mb-2">What You'll Do:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-600 dark:text-gray-300">Work on real client projects</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-600 dark:text-gray-300">Receive direct mentorship</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-indigo-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-600 dark:text-gray-300">Build your professional portfolio</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <Link
                    href={`/tracks/${track.slug}/internships`}
                    className="text-indigo-600 dark:text-primary-600 hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white transition-colors duration-200"
                  >
                    Explore Apprenticeship Projects
                  </Link>
                </div>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 mb-2">Tier 3: Masters Program</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Advance to a fully paid position with leadership opportunities and continued professional growth.
                </p>
                <div className="mt-6">
                  <h4 className="text-sm font-medium uppercase text-gray-500 dark:text-gray-400 mb-2">Career Growth:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-teal-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-600 dark:text-gray-300">Take on leadership roles</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-teal-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-600 dark:text-gray-300">Mentor junior team members</span>
                    </li>
                    <li className="flex items-start">
                      <svg className="h-5 w-5 text-teal-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="ml-2 text-gray-600 dark:text-gray-300">Develop specialized expertise</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-6">
                  <Link
                    href="/tracks/how-it-works"
                    className="text-teal-600 dark:text-primary-600 hover:text-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white transition-colors duration-200"
                  >
                    Learn About the Master's Program
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-50/50 dark:bg-gray-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400"></div>
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
            <div className="relative pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center lg:max-w-3xl">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to start your journey?</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-white/90">
                  Join our next cohort and take the first step toward a rewarding career in {track.title}.
                </p>
                <Link
                  href="/apply"
                  className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white transition-colors duration-200"
                >
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}