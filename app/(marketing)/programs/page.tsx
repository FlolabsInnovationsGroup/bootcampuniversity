import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const programs = [
  {
    title: 'Web Development',
    description: 'Learn full-stack web development with modern technologies and frameworks.',
    href: '/programs/web-development',
    icon: '🌐',
  },
  {
    title: 'AI & Machine Learning',
    description: 'Master artificial intelligence and machine learning fundamentals and applications.',
    href: '/programs/ai-ml',
    icon: '🤖',
  },
  {
    title: 'Robotics',
    description: 'Build and program robots while learning mechanical and electrical engineering principles.',
    href: '/programs/robotics',
    icon: '🦾',
  },
]

export default function ProgramsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
          Our Programs
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Choose from our cutting-edge programs designed to launch your tech career
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {programs.map((program) => (
          <Link
            key={program.title}
            href={program.href}
            className="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="text-4xl mb-4">{program.icon}</div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400">
              {program.title}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              {program.description}
            </p>
            <div className="flex items-center text-primary-600 dark:text-primary-400 font-medium">
              Learn more
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 