import { ArrowRight, Book, Clock, Users, Shield, Award, MessageSquare, HelpCircle } from 'lucide-react'
import Link from 'next/link'

const sections = [
  {
    title: 'Academic Policies',
    icon: Book,
    items: [
      'Attendance Requirements',
      'Grading System',
      'Academic Integrity',
      'Project Submissions',
    ],
  },
  {
    title: 'Program Schedule',
    icon: Clock,
    items: [
      'Daily Schedule',
      'Important Dates',
      'Break Periods',
      'Make-up Sessions',
    ],
  },
  {
    title: 'Student Conduct',
    icon: Shield,
    items: [
      'Code of Conduct',
      'Online Etiquette',
      'Collaboration Guidelines',
      'Academic Honesty',
    ],
  },
  {
    title: 'Support Services',
    icon: Users,
    items: [
      'Technical Support',
      'Academic Support',
      'Career Services',
      'Mental Health Resources',
    ],
  },
  {
    title: 'Certification',
    icon: Award,
    items: [
      'Requirements',
      'Assessment Criteria',
      'Portfolio Review',
      'Certificate Issuance',
    ],
  },
  {
    title: 'Communication',
    icon: MessageSquare,
    items: [
      'Office Hours',
      'Mentor Meetings',
      'Discussion Forums',
      'Feedback Channels',
    ],
  },
]

export default function HandbookPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
          Student Handbook
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          Everything you need to know about your journey with Innovation Bootcamp University
        </p>
        <Link
          href="/faqs"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200"
        >
          View FAQs
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>

      {/* Sections Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <div
              key={section.title}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/20">
                  <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {section.title}
                </h3>
              </div>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center space-x-2 text-slate-600 dark:text-slate-400"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Need Help Section */}
      <div className="mt-16 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 text-center">
        <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/20 mb-4">
          <HelpCircle className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Need Additional Help?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
          Can't find what you're looking for? Our support team is here to help you with any questions or concerns.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
        >
          Contact Support
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  )
} 