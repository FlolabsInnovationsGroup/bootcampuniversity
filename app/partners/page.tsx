import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/shared';
import { Handshake } from 'lucide-react';
import { partners, getPartnersByType } from '@/lib/data/partners';

export const metadata = {
  title: 'Partners | Innovation Bootcamp University',
  description: 'Our strategic partnerships with universities, industry leaders, and technology providers enhance the educational experience at Innovation Bootcamp University.',
};

export default function PartnersPage() {
  const universityPartners = getPartnersByType('university');
  const technologyPartners = getPartnersByType('technology');
  const industryPartners = getPartnersByType('industry');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-950 dark:to-gray-900/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-400 py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-primary-400/90" />
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
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 border-2 border-white/20">
              <Handshake className="mr-1.5 h-3.5 w-3.5" />
              Strategic Partnerships
            </Badge>
            <h1 className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              Our Partners
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
              We collaborate with leading institutions and technology providers to deliver 
              a world-class educational experience.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50 sm:text-4xl">
            Strategic <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Partnerships</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Our partnerships enhance your learning experience by providing industry-standard tools, 
            academic validation, and real-world project opportunities.
          </p>
        </div>

        {/* University Partners */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-8">Academic Institutions</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {universityPartners.map((partner) => (
              <div key={partner.id} className="flex bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="flex-shrink-0 flex items-center justify-center w-24 sm:w-32 bg-gray-50 dark:bg-gray-900 p-4">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={80}
                    className="max-h-16 w-auto object-contain"
                  />
                </div>
                <div className="flex-1 px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">{partner.name}</h3>
                  {partner.location && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">{partner.location}</p>
                  )}
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{partner.description}</p>
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300"
                    >
                      Visit website
                      <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Partners */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-8">Technology Partners</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {technologyPartners.map((partner) => (
              <div key={partner.id} className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition duration-300 hover:shadow-xl">
                <div className="h-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={120}
                    height={60}
                    className="max-h-10 w-auto object-contain"
                  />
                </div>
                <div className="px-6 py-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">{partner.name}</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">{partner.description}</p>
                  {partner.website && (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 group-hover:translate-x-0.5 transition-transform duration-150"
                    >
                      Learn more
                      <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Partners (if any) */}
        {industryPartners.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-8">Industry Partners</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {industryPartners.map((partner) => (
                <div key={partner.id} className="group bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition duration-300 hover:shadow-xl">
                  <div className="h-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={60}
                      className="max-h-10 w-auto object-contain"
                    />
                  </div>
                  <div className="px-6 py-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">{partner.name}</h3>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">{partner.description}</p>
                    {partner.website && (
                      <a
                        href={partner.website}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 group-hover:translate-x-0.5 transition-transform duration-150"
                      >
                        Learn more
                        <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Partnership CTA */}
      <div className="bg-gray-50/50 dark:bg-gray-900/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400"></div>
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
            <div className="relative pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center lg:max-w-3xl">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Become a Partner</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-white/90">
                  Join our network of educational and industry partners to help shape the future of tech education
                  and connect with talented emerging professionals.
                </p>
                <a
                  href="mailto:partnerships@innovationbootcamp.edu"
                  className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white"
                >
                  Contact Our Partnership Team
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}