import Link from 'next/link'
import { ArrowRight, Briefcase, Building2, Users } from 'lucide-react'

const opportunities = [
  {
    title: 'Internships',
    description: 'Find internship opportunities with our partner companies and start your career journey.',
    icon: Briefcase,
    href: '/internships',
    cta: 'View Internships',
  },
  {
    title: 'Industry Partners',
    description: 'Explore our network of industry partners and the opportunities they offer to our students.',
    icon: Building2,
    href: '/partners',
    cta: 'Meet Our Partners',
  },
  {
    title: 'Become an Advisor',
    description: 'Share your expertise and help shape the next generation of tech professionals.',
    icon: Users,
    href: '/advisor',
    cta: 'Join as Advisor',
  },
]

export default function OpportunitiesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
          Opportunities
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          Discover ways to advance your career and connect with industry leaders
        </p>
      </div>

      {/* Opportunities Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {opportunities.map((opportunity) => {
          const Icon = opportunity.icon
          return (
            <div
              key={opportunity.title}
              className="flex flex-col bg-white dark:bg-slate-800 rounded-2xl p-6"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/20 mb-4">
                <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {opportunity.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 flex-grow">
                {opportunity.description}
              </p>
              <Link
                href={opportunity.href}
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200 mt-auto"
              >
                {opportunity.cta}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          )
        })}
      </div>

      {/* Stats Section */}
      <div className="mt-16 grid md:grid-cols-3 gap-8">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            500+
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Available Internships
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            100+
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Industry Partners
          </div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center">
          <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
            50+
          </div>
          <div className="text-sm text-slate-600 dark:text-slate-400">
            Expert Advisors
          </div>
        </div>
      </div>
    </div>
  )
} 