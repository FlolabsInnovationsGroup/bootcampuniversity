import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/shared';
import { Briefcase } from 'lucide-react';

export default function InternshipsPage() {
  const featuredProjects = [
    {
      id: 'robotics-assistant',
      title: 'Robotic Assistant',
      description: 'Developing an AI-powered robotic assistant for educational environments',
      image: '/projects/robotics-assistant.jpg',
      track: 'Robotics',
      trackColor: 'purple',
      skills: ['ROS', 'Computer Vision', 'Deep Learning', 'Embedded Systems'],
      tier: 'Tier 2 & 3'
    },
    {
      id: 'ai-travel-agent',
      title: 'AI Travel Agent',
      description: 'Building an AI agent to automate and personalize travel recommendations',
      image: '/projects/ai-travel.jpg',
      track: 'AI & Machine Learning',
      trackColor: 'indigo',
      skills: ['NLP', 'Recommendation Systems', 'API Integration', 'User Modeling'],
      tier: 'Tier 2 & 3'
    },
    {
      id: 'bootcamp-platform',
      title: 'Bootcamp Platform',
      description: 'Creating the website and learning management system for Innovation Bootcamp',
      image: '/projects/bootcamp-platform.jpg',
      track: 'Web Development',
      trackColor: 'blue',
      skills: ['Next.js', 'React', 'Node.js', 'MongoDB'],
      tier: 'All Tiers'
    },
    {
      id: 'experience-design',
      title: 'UX/UI Revamp',
      description: 'Redesigning user interfaces for better accessibility and conversion rates',
      image: '/projects/ux-revamp.jpg',
      track: 'UX/UI Design',
      trackColor: 'pink',
      skills: ['User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
      tier: 'All Tiers'
    }
  ];

  const pastProjects = [
    {
      title: 'Smart Home Automation System',
      description: 'Developed a complete smart home solution with voice control and mobile app integration',
      results: 'Deployed to 5 test homes with 95% user satisfaction rate',
      track: 'Robotics',
      tier: 'Tier 2'
    },
    {
      title: 'E-commerce Personalization Engine',
      description: 'Built AI-powered recommendation system to improve product discovery',
      results: '32% increase in click-through rates for recommended products',
      track: 'AI & Machine Learning',
      tier: 'Tier 2'
    },
    {
      title: 'Healthcare Management Dashboard',
      description: 'Created an intuitive dashboard for healthcare providers to monitor patient data',
      results: 'Reduced administrative time by 40% in pilot program',
      track: 'Web Development',
      tier: 'Tier 2'
    }
  ];

  const testimonials = [
    {
      quote: "The co-op model at Innovation Bootcamp gave me real-world experience that was immediately valuable to employers. I started in Tier 1 with basic knowledge and progressed to Tier 3 where I led development teams. The progression felt natural and supportive.",
      name: "Jamie Chen",
      role: "Former Tier 3 Student, now Software Engineer at TechCorp",
      image: "/testimonials/jamie.jpg"
    },
    {
      quote: "Working on actual client projects while still learning was initially intimidating, but the mentorship structure made it approachable. By the time I reached Tier 2, I was confidently contributing to complex projects that now form the cornerstone of my portfolio.",
      name: "Marcus Johnson",
      role: "Former Tier 2 Student, now UX Designer at DesignHub",
      image: "/testimonials/marcus.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-950 dark:to-gray-900/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-400 py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-primary-400/90" />
          <svg
            className="absolute bottom-0 left-0 transform -translate-y-1/4 opacity-20"
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
              <Briefcase className="mr-1.5 h-3.5 w-3.5" />
              Co-op Program
            </Badge>
            <h1 className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              Co-op Projects
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
              Experience real-world projects as part of our unique co-op model.
              Learn by doing while contributing to actual client solutions.
            </p>
          </div>
        </div>
      </div>

      {/* Co-op Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">
              Why We Call It a <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Co-op</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Rather than traditional internships, we've adopted a cooperative education 
              (co-op) model that better reflects our integrated approach to learning and working.
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">Real Client Projects</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    You'll work on actual projects for real clients, not simulated exercises.
                    This means your contributions have real impact and build a professional portfolio.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">Progressive Responsibility</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    As you advance through our tiers, you'll take on increasingly complex 
                    roles and responsibilities, from guided tasks to team leadership.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">Mentorship Structure</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    You'll receive guidance from experienced professionals and, as you 
                    advance, have opportunities to mentor newer students in the program.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 lg:mt-0">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-8 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-50">Co-op Structure By Tier</h3>
              </div>
              <div className="px-6 py-8">
                <dl className="space-y-8">
                  <div>
                    <dt className="text-base font-medium text-primary-600 dark:text-primary-400">Tier 1: Learning Phase</dt>
                    <dd className="mt-2 text-gray-600 dark:text-gray-400">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Guided mini-projects with clear requirements</li>
                        <li>Regular feedback and code reviews</li>
                        <li>Collaboration with peers on team projects</li>
                        <li>Focused on building foundational skills</li>
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-base font-medium text-indigo-600 dark:text-indigo-400">Tier 2: Apprenticeship</dt>
                    <dd className="mt-2 text-gray-600 dark:text-gray-400">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Paid contributions to client projects</li>
                        <li>Assigned focused responsibilities</li>
                        <li>Direct mentorship from senior team members</li>
                        <li>Developing specialization in your track</li>
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt className="text-base font-medium text-teal-600 dark:text-teal-400">Tier 3: Masters Program</dt>
                    <dd className="mt-2 text-gray-600 dark:text-gray-400">
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Leading development teams</li>
                        <li>Mentoring Tier 1 and 2 students</li>
                        <li>Client communication and project planning</li>
                        <li>Full professional compensation</li>
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">
              Current <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Projects</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              These are some of the active projects our students are currently working on.
              Each project offers opportunities for students across different tiers.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {featuredProjects.map((project) => (
              <div 
                key={project.id} 
                className="group bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700 transition duration-300 hover:shadow-xl"
              >
                <div className="relative h-48 bg-gray-300 dark:bg-gray-700">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                    [Project Image: {project.title}]
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {project.track}
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-transparent border border-gray-200 dark:border-gray-700">
                      {project.tier}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-50 mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">{project.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-2">Skills Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <Link
                      href={`#${project.id}`}
                      className="text-primary-600 dark:text-primary-400 hover:text-primary-500 dark:hover:text-primary-300 font-medium flex items-center group-hover:translate-x-0.5 transition-transform duration-150"
                    >
                      More details
                      <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Projects */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">
              Past <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Success Stories</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              These completed projects demonstrate the real-world impact our students have made.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Project
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Results
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Track & Tier
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {pastProjects.map((project, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                      {project.title}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-400">
                      {project.description}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500 dark:text-gray-400">
                      {project.results}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <span className="block mb-1">{project.track}</span>
                      <Badge variant="secondary" className="text-xs">
                        {project.tier}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">
              Student <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Experiences</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Hear from students who have gone through our co-op program.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 mr-4"></div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-50">{testimonial.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 relative overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-400"></div>
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
          <div className="relative px-8 py-12 md:px-12">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Join Our Next Cohort?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Apply now to start your journey from learning to earning through our unique co-op model.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link
                  href="/apply"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-primary-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white"
                >
                  Apply Now
                </Link>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md shadow-sm text-white bg-transparent hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}