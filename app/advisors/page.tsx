import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { advisors } from '@/lib/data/advisors';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { Badge } from '@/components/shared/Badge';
import { Linkedin, Twitter, Globe, Mail, Users } from 'lucide-react';

export const metadata = {
  title: 'Advisory Board | Innovation Bootcamp University',
  description: 'Meet our distinguished advisory board of industry experts, educators, and technology leaders guiding the direction of Innovation Bootcamp University.',
};

export default function AdvisorsPage() {
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
              <Users className="mr-1.5 h-3.5 w-3.5" />
              Advisory Board
            </Badge>
            <h1 className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              Meet Our Advisors
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
              Distinguished experts guiding the development of our programs
              and helping shape the future of tech education.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50 sm:text-4xl">
            Leadership & Expertise
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600 dark:text-gray-400">
            Our advisors bring decades of experience from academia, industry, and technology
            to help us create the most effective learning pathways for our students.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {advisors.map((advisor) => (
            <Card
              key={advisor.id}
              variant="glass"
              hover={true}
              className="flex flex-col overflow-hidden"
            >
              <div className="relative h-64 w-full overflow-hidden rounded-t-xl">
                <Image
                  src={advisor.image}
                  alt={advisor.name}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                  {advisor.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary-600 dark:text-primary-400">
                  {advisor.title}
                </p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {advisor.organization}
                </p>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-base text-gray-600 dark:text-gray-300">
                  {advisor.bio}
                </p>
              </CardContent>
              {advisor.links && (
                <CardFooter className="flex items-center space-x-3">
                  {advisor.links.linkedin && (
                    <a
                      href={advisor.links.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {advisor.links.twitter && (
                    <a
                      href={advisor.links.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                    >
                      <span className="sr-only">Twitter</span>
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {advisor.links.website && (
                    <a
                      href={advisor.links.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
                    >
                      <span className="sr-only">Website</span>
                      <Globe className="h-5 w-5" />
                    </a>
                  )}
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Join the Board CTA */}
      <div className="bg-gray-50/50 dark:bg-gray-900/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card
            variant="gradient"
            className="overflow-hidden bg-gradient-to-br from-primary-600 to-primary-400"
          >
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
              <div className="lg:self-center lg:max-w-3xl">
                <Badge variant="secondary" className="mb-6 border-2 border-white/20">
                  <Users className="mr-1.5 h-3.5 w-3.5" />
                  Join Our Board
                </Badge>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Become an Advisor
                </h2>
                <p className="mt-4 text-lg leading-6 text-white/90">
                  We're always looking for industry experts, educators, and technology leaders to join our advisory board
                  and help shape the future of tech education.
                </p>
                <Button
                  variant="secondary"
                  size="lg"
                  className="mt-8"
                  href="mailto:advisors@innovationbootcamp.edu"
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Us to Learn More
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}