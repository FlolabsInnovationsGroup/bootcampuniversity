import React from 'react';
import Link from 'next/link';
import { Badge } from '@/components/shared';
import { BookOpen } from 'lucide-react';

interface Track {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  icon: React.ReactNode;
  skills: string[];
  platforms: string[];
  color: string;
  careerPaths: string[];
}

export default function TracksOverview() {
  const tracks = [
    {
      id: 'web-development',
      title: 'Web Development',
      description: 'Master front-end and back-end technologies to build modern, responsive web applications.',
      longDescription: 'Our Web Development track covers the full stack from HTML/CSS fundamentals to advanced React and Node.js development. You\'ll learn how to build interactive, data-driven applications while following industry best practices for deployment and performance optimization.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-blue-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
        </svg>
      ),
      skills: ['JavaScript/TypeScript', 'React & Next.js', 'Node.js & Express', 'Database Management'],
      platforms: ['GitHub Education', 'AWS Educate', 'Vercel'],
      color: 'blue',
      careerPaths: ['Front-End Developer', 'Back-End Developer', 'Full-Stack Engineer', 'DevOps Engineer']
    },
    {
      id: 'ai-ml',
      title: 'AI & Machine Learning',
      description: 'Develop expertise in artificial intelligence, machine learning algorithms, and their real-world applications.',
      longDescription: 'Our AI & Machine Learning track provides comprehensive training in the theoretical foundations and practical implementations of AI. From statistical methods to neural networks, you\'ll gain hands-on experience with cutting-edge tools and frameworks used by industry leaders.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-indigo-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.611L5 14.5" />
        </svg>
      ),
      skills: ['Python', 'TensorFlow & PyTorch', 'Natural Language Processing', 'Computer Vision'],
      platforms: ['Hugging Face', 'Google AI Education', 'NVIDIA Deep Learning Institute'],
      color: 'indigo',
      careerPaths: ['Machine Learning Engineer', 'AI Researcher', 'Data Scientist', 'NLP Engineer']
    },
    {
      id: 'robotics',
      title: 'Robotics',
      description: 'Build and program robots, learn control systems, and understand the integration of hardware and software.',
      longDescription: 'Our Robotics track covers the entire robotics development process from mechanical design to control systems programming. You\'ll work with real robots and simulators, learning how to develop intelligent systems that can navigate and interact with the physical world.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-purple-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
        </svg>
      ),
      skills: ['ROS (Robot Operating System)', 'Embedded Systems', 'Sensor Integration', 'Control Systems'],
      platforms: ['NVIDIA Robotics', 'Arduino Education', 'AWS RoboMaker'],
      color: 'purple',
      careerPaths: ['Robotics Engineer', 'Automation Engineer', 'IoT Developer', 'Embedded Systems Engineer']
    },
    {
      id: 'ux-ui',
      title: 'UX/UI Design',
      description: 'Master the principles of user experience and interface design to create beautiful, functional products.',
      longDescription: 'Our UX/UI Design track teaches you to create intuitive, aesthetically pleasing digital experiences. From user research methods to advanced prototyping tools, you\'ll develop the skills needed to design products that delight users while meeting business objectives.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-pink-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      ),
      skills: ['User Research', 'Wireframing & Prototyping', 'Visual Design', 'User Testing'],
      platforms: ['Figma Education', 'Adobe Creative Cloud', 'Sketch'],
      color: 'pink',
      careerPaths: ['UX Designer', 'UI Designer', 'Product Designer', 'Interaction Designer']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-950 dark:to-gray-900/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-400 py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-primary-400/90" />
          <svg
            className="absolute bottom-0 left-0 transform translate-x-1/4 translate-y-1/4 opacity-20"
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
              Learning Paths
            </Badge>
            <h1 className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              Learning Tracks
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
              Choose your path to a rewarding tech career with our specialized tracks.
              Each track follows our tiered approach from learning to earning.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50">
              Specialized Paths to <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Tech Excellence</span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our carefully curated tracks provide targeted learning paths in high-demand tech fields.
              All tracks follow our three-tier system that combines theory with real-world practice.
            </p>
          </div>

          {/* Tracks Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {tracks.map((track) => (
              <div 
                key={track.id}
                className="group relative rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800 transform transition duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-200 dark:border-gray-700"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-${track.color}-600`}></div>
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className={`w-16 h-16 rounded-lg bg-${track.color}-100 dark:bg-${track.color}-900/20 flex items-center justify-center mr-6`}>
                      {track.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">{track.title}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {track.longDescription}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-2">Core Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {track.skills.map((skill, index) => (
                        <Badge 
                          key={index} 
                          variant="secondary"
                          className={`bg-${track.color}-100 dark:bg-${track.color}-900/20 text-${track.color}-800 dark:text-${track.color}-300`}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-2">Learning Platforms:</h4>
                    <div className="flex flex-wrap gap-2">
                      {track.platforms.map((platform, index) => (
                        <Badge 
                          key={index}
                          variant="secondary"
                          className="bg-transparent border border-gray-200 dark:border-gray-700"
                        >
                          {platform}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="font-medium text-gray-900 dark:text-gray-50 mb-2">Career Paths:</h4>
                    <ul className="text-gray-600 dark:text-gray-400 list-disc pl-5 space-y-1">
                      {track.careerPaths.map((path, index) => (
                        <li key={index}>{path}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href={`/tracks/${track.id}`}
                      className={`inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-${track.color}-600 hover:bg-${track.color}-700 dark:hover:bg-${track.color}-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${track.color}-500 transition-colors duration-200`}
                    >
                      Explore Curriculum
                    </Link>
                    <Link
                      href={`/apply?track=${track.id}`}
                      className="inline-flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
                    >
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Track Comparison */}
        <div className="bg-gray-50/50 dark:bg-gray-900/50 rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              Track Comparison
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Compare features across our different learning tracks
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-50">Feature</th>
                  {tracks.map((track) => (
                    <th key={track.id} scope="col" className="px-3 py-3.5 text-center text-sm font-semibold text-gray-900 dark:text-gray-50">
                      {track.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Tier 1 Duration</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">3-4 months</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">4-6 months</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">4-6 months</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">3-4 months</td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Cost</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">$1,500</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">$2,000</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">$2,000</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">$1,500</td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Prerequisites</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">None</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">Basic programming</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">Basic programming</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">None</td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Job Market Demand</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">Very High</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">Very High</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">High</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">High</td>
                </tr>
                <tr>
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900">Tier 2/3 Positions Available</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">Numerous</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">Multiple</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">Limited</td>
                  <td className="px-3 py-4 text-sm text-center text-gray-500">Multiple</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Cross-track skills */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Cross-Track Skills
            </h2>
            <p className="mt-2 text-gray-600 max-w-3xl mx-auto">
              All our tracks include these foundational skills to prepare you for success in the tech industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Collaboration & Teamwork</h3>
              <p className="text-gray-600">
                Learn to work effectively in agile teams, use version control systems, and 
                communicate technical concepts clearly to diverse stakeholders.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <div className="rounded-full bg-teal-100 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-teal-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Project Management</h3>
              <p className="text-gray-600">
                Master the fundamentals of project planning, task management, and 
                delivering results on time with the right balance of quality and efficiency.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <div className="rounded-full bg-purple-100 w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-600">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Business Acumen</h3>
              <p className="text-gray-600">
                Understand how tech projects align with business goals, learn to identify
                opportunities, and develop solutions that create measurable value.
              </p>
            </div>
          </div>
        </div>

        {/* Learning Approach */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Our Learning Approach
            </h2>
            <p className="mt-2 text-gray-600 max-w-3xl mx-auto">
              We believe in a comprehensive approach that combines theory, practice, and real-world experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow border border-gray-100">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Hands-On Project Experience</h3>
              <p className="text-gray-600 mb-4">
                Knowledge without application has limited value. That's why we emphasize real-world 
                projects from day one. As you progress through the tiers, you'll work on increasingly 
                complex projects with actual clients.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Tier 1: Guided projects with clear requirements
                </li>
                <li className="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Tier 2: Real client projects with mentorship
                </li>
                <li className="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Tier 3: Leading project teams and complex initiatives
                </li>
                <li className="flex items-center text-gray-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Portfolio development throughout all tiers
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Apply now to begin your path to a rewarding tech career through our unique earn-and-learn model.
            Have questions? Contact our admissions team for more information.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/apply"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Apply Now
            </Link>
            <Link
              href="mailto:admissions@innovationbootcamp.edu"
              className="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Contact Admissions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}