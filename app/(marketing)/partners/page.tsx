import Link from 'next/link'
import { ArrowRight, Building2, Users, Briefcase, Globe2 } from 'lucide-react'

const partners = [
  {
    name: 'TechCorp',
    type: 'Technology',
    description: 'Leading provider of enterprise software solutions.',
    opportunities: ['Internships', 'Graduate Roles', 'Mentorship'],
    logo: '🏢',
  },
  {
    name: 'AI Solutions',
    type: 'Artificial Intelligence',
    description: 'Pioneering AI research and development company.',
    opportunities: ['Research Programs', 'Internships', 'Workshops'],
    logo: '🤖',
  },
  {
    name: 'RoboTech',
    type: 'Robotics',
    description: 'Innovative robotics and automation solutions.',
    opportunities: ['Lab Access', 'Internships', 'Project Collaboration'],
    logo: '🦾',
  },
  {
    name: 'DataViz Inc',
    type: 'Data Analytics',
    description: 'Data visualization and analytics platform.',
    opportunities: ['Training Programs', 'Internships', 'Certifications'],
    logo: '📊',
  },
]

const benefits = [
  {
    title: 'Access to Talent',
    description: 'Connect with skilled graduates and interns from our programs.',
    icon: Users,
  },
  {
    title: 'Industry Projects',
    description: 'Collaborate on real-world projects with our students.',
    icon: Briefcase,
  },
  {
    title: 'Global Network',
    description: 'Join our network of leading technology companies.',
    icon: Globe2,
  },
]

export default function PartnersPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
          Industry Partners
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          Collaborate with leading companies shaping the future of technology
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200"
        >
          Become a Partner
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>

      {/* Partners Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="bg-white dark:bg-slate-800 rounded-2xl p-6"
          >
            <div className="flex items-start space-x-4">
              <div className="text-4xl">{partner.logo}</div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-1">
                  {partner.name}
                </h3>
                <div className="text-sm text-primary-600 dark:text-primary-400 mb-2">
                  {partner.type}
                </div>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {partner.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {partner.opportunities.map((opportunity) => (
                    <span
                      key={opportunity}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                    >
                      {opportunity}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
          Partner Benefits
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="text-center"
              >
                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/20 mb-4">
                  <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Ready to Partner With Us?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          Join our network of industry partners and help shape the future of tech education.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
        >
          Get in Touch
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  )
} 