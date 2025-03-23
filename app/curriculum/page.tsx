import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { tracks } from '@/lib/data/tracks';
import { externalResources } from '@/lib/data/curriculum';
import { ExternalResourceCard } from '@/components/curriculum/ExternalResourcecard';

export const metadata = {
  title: 'Curriculum | Innovation Bootcamp University',
  description: 'Explore our comprehensive curriculum combining industry-standard learning resources with hands-on project experience.',
};

export default function CurriculumPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-teal-500 py-16">
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 opacity-20" width="404" height="404" fill="none" viewBox="0 0 404 404">
            <defs>
              <pattern id="pattern-squares" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" fill="white" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#pattern-squares)" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
              Our Curriculum
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-white/90">
              A modern approach to tech education combining industry-standard learning resources 
              with hands-on project experience.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Learning Approach
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Our curriculum integrates theoretical learning through established platforms with
            practical, hands-on experience on real projects.
          </p>
        </div>

        {/* Learning Approach */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 rounded-md p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Theoretical Learning</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Learn at your own pace with high-quality resources from industry-leading platforms like GitHub Education, 
                AWS Training, Google, and Hugging Face. These resources are carefully curated to provide solid 
                theoretical foundations and technical knowledge.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-2 text-gray-600">Self-paced learning modules</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-2 text-gray-600">Industry-recognized certifications</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-2 text-gray-600">Guided tutorials and exercises</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 rounded-md p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Practical Experience</h3>
              </div>
              <p className="text-gray-600 mb-6">
                Apply what you've learned through guided projects and real-world applications. 
                Work collaboratively with other students and mentors to build practical skills 
                that employers value.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-2 text-gray-600">Hands-on projects with real-world applications</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-2 text-gray-600">Collaborative team environments</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="ml-2 text-gray-600">Portfolio-building opportunities</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Tracks */}
        <div className="mt-16 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Learning Tracks</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {tracks.map((track) => (
              <div key={track.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Image
                      src={track.icon}
                      alt={track.title}
                      width={32}
                      height={32}
                      className="h-8 w-8"
                    />
                    <h3 className="ml-3 text-lg font-semibold text-gray-900">{track.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-6">{track.description}</p>
                  <Link
                    href={`/tracks/${track.slug}/curriculum`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <span>View Curriculum</span>
                    <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* External Resources */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Learning Platforms We Use</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {externalResources.map((resource) => (
              <ExternalResourceCard
                key={resource.id}
                title={resource.title}
                provider={resource.provider}
                description={resource.description}
                image={resource.image}
                url={resource.url}
                badgeText={resource.badgeText}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tier Structure */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Tiered Learning Structure
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Progress through our three-tier program as you build skills and gain real-world experience.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-gray-50"></div>
            <div className="relative max-w-7xl mx-auto">
              <div className="max-w-3xl mx-auto">
                <dl className="rounded-lg bg-white shadow-lg sm:grid sm:grid-cols-3">
                  <div className="flex flex-col border-b border-gray-100 p-6 text-center sm:border-0 sm:border-r">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">Tier 1: Bootcamp</dt>
                    <dd className="order-1 text-5xl font-extrabold text-blue-600">3-6 mo</dd>
                    <dd className="order-3 mt-4 text-sm text-gray-500">Self-paced learning & guided projects</dd>
                  </div>
                  <div className="flex flex-col border-t border-b border-gray-100 p-6 text-center sm:border-0 sm:border-l sm:border-r">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">Tier 2: Apprenticeship</dt>
                    <dd className="order-1 text-5xl font-extrabold text-indigo-600">6-12 mo</dd>
                    <dd className="order-3 mt-4 text-sm text-gray-500">Paid work experience on real projects</dd>
                  </div>
                  <div className="flex flex-col border-t border-gray-100 p-6 text-center sm:border-0 sm:border-l">
                    <dt className="order-2 mt-2 text-lg font-medium leading-6 text-gray-500">Tier 3: Masters</dt>
                    <dd className="order-1 text-5xl font-extrabold text-teal-600">Ongoing</dd>
                    <dd className="order-3 mt-4 text-sm text-gray-500">Advanced skills & leadership roles</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/tracks/how-it-works"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Learn How It Works
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-8">
              Frequently Asked Questions
            </h2>
            <dl className="mt-6 space-y-6 divide-y divide-gray-200">
              <div className="pt-6">
                <dt className="text-lg font-medium text-gray-900">
                  Do I need prior experience to join your program?
                </dt>
                <dd className="mt-2 text-gray-600">
                  Our programs are designed to accommodate students with varying levels of experience. While some prior knowledge in your chosen track can be helpful, it's not required for Tier 1. We provide comprehensive learning resources to help you build foundational skills from the ground up.
                </dd>
              </div>
              <div className="pt-6">
                <dt className="text-lg font-medium text-gray-900">
                  How much time should I dedicate to the program?
                </dt>
                <dd className="mt-2 text-gray-600">
                  For Tier 1, we recommend at least 15-20 hours per week for optimal progress. The program is self-paced, so you can adjust based on your schedule. Tiers 2 and 3 typically require a full-time commitment as they involve working on real client projects.
                </dd>
              </div>
              <div className="pt-6">
                <dt className="text-lg font-medium text-gray-900">
                  Will I receive a certificate upon completion?
                </dt>
                <dd className="mt-2 text-gray-600">
                  Yes! Upon completing Tier 1, you'll receive a certificate from Innovation Bootcamp University. You'll also earn certifications from our partner platforms like GitHub, AWS, and others as you complete their respective modules.
                </dd>
              </div>
              <div className="pt-6">
                <dt className="text-lg font-medium text-gray-900">
                  How do you ensure the curriculum stays up-to-date?
                </dt>
                <dd className="mt-2 text-gray-600">
                  We regularly review and update our curriculum in collaboration with industry partners and advisors. By leveraging external platforms that are constantly updated, we ensure our students learn the latest technologies and methodologies used in the industry.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-lg shadow-xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center lg:max-w-3xl">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to start your learning journey?</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-indigo-100">
                  Apply now to join our next cohort and take the first step toward a rewarding tech career.
                </p>
                <a
                  href="/apply"
                  className="mt-8 bg-white border border-transparent rounded-md shadow px-6 py-3 inline-flex items-center text-base font-medium text-blue-600 hover:bg-indigo-50"
                >
                  Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}