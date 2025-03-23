import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getTrackBySlug } from '@/lib/data/tracks';
import { aiMlCurriculum } from '@/lib/data/curriculum';
import { CourseModule } from '@/components/curriculum/CourseModule';
import { ExternalResourceCard } from '@/components/curriculum/ExternalResourcecard';
import { Badge } from '@/components/shared/Badge';
import { BookOpen } from 'lucide-react';

type PageProps = {
  params: Promise<{ trackId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }> | undefined;
};

export default async function TrackCurriculumPage({ 
  params,
  searchParams,
}: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const track = getTrackBySlug(resolvedParams.trackId);

  if (!track) {
    notFound();
  }

  // For now, we'll use the AI/ML curriculum as a placeholder
  // In a real implementation, you would fetch the appropriate curriculum based on the track ID
  const curriculum = aiMlCurriculum;

  // Helper function to get gradient class based on track color
  const getGradientClass = (color: string) => {
    switch (color) {
      case 'blue':
        return 'from-primary-600 to-primary-400';
      case 'indigo':
        return 'from-indigo-600 to-indigo-400';
      case 'purple':
        return 'from-purple-600 to-purple-400';
      case 'green':
        return 'from-green-600 to-green-400';
      default:
        return 'from-primary-600 to-primary-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-950 dark:to-gray-900/50">
      {/* Hero Section */}
      <div className={`relative overflow-hidden bg-gradient-to-r ${getGradientClass(track.color)} py-20`}>
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${getGradientClass(track.color)}/90`} />
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
              <BookOpen className="mr-1.5 h-3.5 w-3.5" />
              Track Curriculum
            </Badge>
            <h1 className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              {track.title} Curriculum
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
              A comprehensive learning journey combining theory, practice, and real-world applications.
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <div className="md:flex md:items-center md:justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Curriculum Overview</h2>
              <p className="mt-2 text-lg text-gray-600">
                Our {track.title} track is designed to take you from foundations to professional mastery 
                through our three-tier program.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link
                href={`/tracks/${track.slug}`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Back to {track.title} Track
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Skills You'll Develop</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {track.skills.map((skill) => (
                <Badge key={skill} variant="default">
                  {skill}
                </Badge>
              ))}
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Technology Stack</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {track.technologies.map((tech) => (
                <div key={tech.name} className="flex flex-col items-center bg-white rounded-md p-4">
                  <Image 
                    src={tech.logo}
                    alt={tech.name}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain mb-2"
                  />
                  <span className="text-sm font-medium text-gray-900 text-center">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tier 1 Curriculum */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold mr-3">
              1
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Tier 1: Bootcamp</h2>
          </div>
          <p className="text-lg text-gray-600 mb-8">
            Build a solid foundation in {track.title} through self-paced learning modules and 
            guided projects. Typically takes 3-6 months to complete, depending on your learning pace.
          </p>
          
          <div className="space-y-6">
            {curriculum.tier1.map((module) => (
              <CourseModule
                key={module.id}
                title={module.title}
                description={module.description}
                duration={module.duration}
                level={module.level as 'beginner' | 'intermediate' | 'advanced'}
                resources={module.resources.map(resource => ({
                  ...resource,
                  type: resource.type as 'video' | 'article' | 'exercise' | 'project'
                }))}
                expanded={false}
              />
            ))}
          </div>
        </div>

        {/* Tier 2 Curriculum */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold mr-3">
              2
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Tier 2: Apprenticeship</h2>
          </div>
          <p className="text-lg text-gray-600 mb-8">
            Advance to a paid apprenticeship position where you'll work on real projects while continuing 
            your education through advanced modules. Typically lasts 6-12 months.
          </p>
          
          <div className="space-y-6">
            {curriculum.tier2.map((module) => (
              <CourseModule
                key={module.id}
                title={module.title}
                description={module.description}
                duration={module.duration}
                level={module.level as 'beginner' | 'intermediate' | 'advanced'}
                resources={module.resources.map(resource => ({
                  ...resource,
                  type: resource.type as 'video' | 'article' | 'exercise' | 'project'
                }))}
                expanded={false}
              />
            ))}
          </div>
          <div className="mt-8 bg-indigo-50 border border-indigo-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Project-Based Learning</h3>
            <p className="text-gray-600 mb-4">
              In addition to the advanced modules, Tier 2 involves significant hands-on work on real client projects. 
              Some example projects include:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-indigo-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-2 text-gray-600">Building customer-facing products for real clients</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-indigo-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-2 text-gray-600">Collaborative development with other apprentices and senior developers</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-indigo-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-2 text-gray-600">Regular code reviews and professional development feedback</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link 
                href={`/tracks/${track.slug}/internships`}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Learn more about our project-based learning
              </Link>
            </div>
          </div>
        </div>

        {/* Tier 3 Curriculum */}
        <div className="mb-16">
          <div className="flex items-center mb-8">
            <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold mr-3">
              3
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Tier 3: Masters Program</h2>
          </div>
          <p className="text-lg text-gray-600 mb-8">
            Reach the pinnacle of our program as a fully paid team member with leadership opportunities and continued professional growth.
          </p>
          
          <div className="space-y-6">
            {curriculum.tier3.map((module) => (
              <CourseModule
                key={module.id}
                title={module.title}
                description={module.description}
                duration={module.duration}
                level={module.level as 'beginner' | 'intermediate' | 'advanced'}
                resources={module.resources.map(resource => ({
                  ...resource,
                  type: resource.type as 'video' | 'article' | 'exercise' | 'project'
                }))}
                expanded={false}
              />
            ))}
          </div>
          <div className="mt-8 bg-teal-50 border border-teal-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Advanced Career Development</h3>
            <p className="text-gray-600 mb-4">
              In Tier 3, you'll continue to expand your technical expertise while developing leadership skills 
              and mentoring junior team members. You'll also have opportunities to:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-teal-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-2 text-gray-600">Lead project teams and guide technical decision-making</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-teal-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-2 text-gray-600">Mentor Tier 1 and Tier 2 students</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-teal-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-2 text-gray-600">Develop specialized expertise in your chosen area</span>
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-teal-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="ml-2 text-gray-600">Contribute to open-source projects and community-building</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Resources */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">External Learning Resources</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our curriculum integrates high-quality learning resources from industry-leading platforms. 
            Here are some of the key platforms you'll use during your learning journey:
          </p>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ExternalResourceCard
              title="GitHub Learning Resources"
              provider="GitHub"
              description="Interactive courses to learn GitHub and programming concepts through hands-on exercises."
              image="/images/external/github-education.jpg"
              url="https://skills.github.com/"
              badgeText="FREE"
            />
            <ExternalResourceCard
              title="AWS Training"
              provider="Amazon Web Services"
              description="Access to AWS cloud computing resources and training for students and educators."
              image="/images/external/aws-education.jpg"
              url="https://aws.amazon.com/education/awseducate/"
              badgeText="FREE"
            />
            <ExternalResourceCard
              title={track.id === 'ai-ml' ? "Hugging Face NLP Course" : "Platform-Specific Training"}
              provider={track.id === 'ai-ml' ? "Hugging Face" : "Various Providers"}
              description={track.id === 'ai-ml' ? "A free course about natural language processing with transformers and deep learning." : "Specialized training courses for your specific track."}
              image="/images/external/huggingface-courses.jpg"
              url={track.id === 'ai-ml' ? "https://huggingface.co/course/chapter1/1" : "#"}
              badgeText="FREE"
            />
          </div>
        </div>

        {/* Next Steps CTA */}
        <div className="mt-16">
          <div className="bg-blue-600 rounded-lg shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="p-8 md:p-12 md:w-2/3">
                <h2 className="text-2xl font-bold text-white">Ready to begin your learning journey?</h2>
                <p className="mt-2 text-lg text-white/90">
                  Apply now to join our next cohort and take the first step toward mastering {track.title}.
                </p>
                <div className="mt-6 flex space-x-4">
                  <Link
                    href="/apply"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-blue-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
                  >
                    Apply Now
                  </Link>
                  <Link
                    href={`/tracks/${track.slug}`}
                    className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <div className="hidden md:block md:w-1/3 bg-blue-800 p-12">
                <div className="h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Educational Partners</h3>
                    <ul className="space-y-4">
                      <li className="flex items-center text-white">
                        <svg className="h-6 w-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Texas A&M University-Corpus Christi</span>
                      </li>
                      <li className="flex items-center text-white">
                        <svg className="h-6 w-6 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Austin Community College</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <Link 
                      href="/partners"
                      className="text-white hover:text-blue-300 font-medium inline-flex items-center"
                    >
                      View All Partners
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}