import Link from 'next/link'
import { ArrowRight, Building2, MapPin, Clock, Briefcase } from 'lucide-react'

const internships = [
  {
    company: 'TechCorp',
    position: 'Full Stack Developer Intern',
    location: 'San Francisco, CA',
    type: 'Full-time',
    duration: '3 months',
    description: 'Join our engineering team and work on cutting-edge web applications using React and Node.js.',
    logo: '🏢',
  },
  {
    company: 'AI Solutions',
    position: 'Machine Learning Intern',
    location: 'Remote',
    type: 'Full-time',
    duration: '6 months',
    description: 'Work on real-world AI projects and help develop machine learning models.',
    logo: '🤖',
  },
  {
    company: 'RoboTech',
    position: 'Robotics Engineering Intern',
    location: 'Boston, MA',
    type: 'Full-time',
    duration: '4 months',
    description: 'Help design and build next-generation robotics systems.',
    logo: '🦾',
  },
  {
    company: 'DataViz Inc',
    position: 'Data Science Intern',
    location: 'Remote',
    type: 'Part-time',
    duration: '6 months',
    description: 'Analyze complex datasets and create meaningful visualizations.',
    logo: '📊',
  },
]

export default function InternshipsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
          Internship Opportunities
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          Kickstart your career with hands-on experience at leading tech companies
        </p>
        <Link
          href="/apply"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200"
        >
          Apply Now
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>

      {/* Internships List */}
      <div className="space-y-6">
        {internships.map((internship) => (
          <div
            key={internship.position}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6"
          >
            <div className="flex items-start space-x-4">
              <div className="text-4xl">{internship.logo}</div>
              <div className="flex-grow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                    {internship.position}
                  </h3>
                  <Link
                    href="/apply"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200"
                  >
                    Apply
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>
                <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                  <div className="flex items-center">
                    <Building2 className="w-4 h-4 mr-1" />
                    {internship.company}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {internship.location}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {internship.duration}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {internship.type}
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400">
                  {internship.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Don't see what you're looking for?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
          New opportunities are added regularly. Submit your application and we'll match you with the right company.
        </p>
        <Link
          href="/apply"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
        >
          Submit Application
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  )
} 