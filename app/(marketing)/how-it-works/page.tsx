import { ArrowRight, BookOpen, Users, Code, Award } from 'lucide-react'
import Link from 'next/link'

const steps = [
  {
    title: 'Learn by Doing',
    description: 'Hands-on experience with real-world projects and industry-standard tools.',
    icon: Code,
  },
  {
    title: 'Expert Mentorship',
    description: 'Get guidance from industry professionals and experienced instructors.',
    icon: Users,
  },
  {
    title: 'Structured Learning',
    description: 'Follow a carefully designed curriculum that builds your skills progressively.',
    icon: BookOpen,
  },
  {
    title: 'Career Ready',
    description: 'Graduate with a portfolio of projects and the skills employers want.',
    icon: Award,
  },
]

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
          How It Works
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          Our unique approach to tech education combines hands-on learning with expert mentorship
        </p>
        <Link
          href="/programs"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200"
        >
          Explore Programs
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>

      {/* Steps Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <div
              key={step.title}
              className="flex flex-col items-center text-center p-6 bg-white dark:bg-slate-800 rounded-2xl"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/20 mb-4">
                <Icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {step.description}
              </p>
            </div>
          )
        })}
      </div>

      {/* Program Structure */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
          Program Structure
        </h2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="relative pl-8 before:absolute before:left-3 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary-600/20">
            <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-primary-600 dark:bg-primary-400" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              4-Week Intensive Program
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Each program runs for 4 weeks with daily hands-on sessions and project work.
            </p>
          </div>

          <div className="relative pl-8 before:absolute before:left-3 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary-600/20">
            <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-primary-600 dark:bg-primary-400" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Project-Based Learning
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Build real-world projects that demonstrate your skills to potential employers.
            </p>
          </div>

          <div className="relative pl-8 before:absolute before:left-3 before:top-0 before:bottom-0 before:w-0.5 before:bg-primary-600/20">
            <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-primary-600 dark:bg-primary-400" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Career Support
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Get help with your resume, portfolio, and job search strategy after graduation.
            </p>
          </div>

          <div className="relative pl-8">
            <div className="absolute left-0 top-2 w-6 h-6 rounded-full bg-primary-600 dark:bg-primary-400" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Industry Network
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Connect with our network of industry partners and alumni for job opportunities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 