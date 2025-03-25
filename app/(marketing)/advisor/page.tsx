import Link from 'next/link'
import { ArrowRight, Users, Clock, Target, Award, Heart, Star } from 'lucide-react'

const requirements = [
  {
    title: '3+ Years Experience',
    description: 'Professional experience in tech industry',
    icon: Clock,
  },
  {
    title: 'Expertise',
    description: 'Deep knowledge in one or more of our program areas',
    icon: Target,
  },
  {
    title: 'Communication',
    description: 'Strong mentoring and communication skills',
    icon: Users,
  },
]

const benefits = [
  {
    title: 'Professional Growth',
    description: 'Develop leadership and mentoring skills',
    icon: Award,
  },
  {
    title: 'Network Expansion',
    description: 'Connect with other industry experts',
    icon: Users,
  },
  {
    title: 'Make an Impact',
    description: 'Shape the next generation of tech talent',
    icon: Heart,
  },
]

const testimonials = [
  {
    quote: "Being an advisor has been incredibly rewarding. It's amazing to see students grow and succeed in their careers.",
    author: 'Sarah Chen',
    role: 'Senior Software Engineer',
    company: 'TechCorp',
  },
  {
    quote: "The program is well-structured and the students are highly motivated. It's a great way to give back to the community.",
    author: 'Michael Rodriguez',
    role: 'AI Research Lead',
    company: 'AI Solutions',
  },
]

export default function AdvisorPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
          Become an Advisor
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          Share your expertise and help shape the next generation of tech professionals
        </p>
        <Link
          href="/apply"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200"
        >
          Apply Now
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>

      {/* Requirements Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
          Requirements
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {requirements.map((req) => {
            const Icon = req.icon
            return (
              <div
                key={req.title}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/20 mb-4">
                  <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  {req.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {req.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
          Why Become an Advisor?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 text-center"
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

      {/* Testimonials Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
          Advisor Testimonials
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6"
            >
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                "{testimonial.quote}"
              </p>
              <div>
                <div className="font-semibold text-slate-900 dark:text-white">
                  {testimonial.author}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {testimonial.role} at {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Ready to Make an Impact?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
          Join our network of industry experts and help shape the future of tech education.
        </p>
        <Link
          href="/apply"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
        >
          Apply as Advisor
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  )
} 