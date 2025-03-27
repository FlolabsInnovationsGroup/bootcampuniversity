import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

const features = [
  'Fundamentals of robotics and mechatronics',
  'Programming with ROS (Robot Operating System)',
  'Computer vision and sensor integration',
  'Control systems and automation',
  'Robotic design and prototyping',
  'Industry project experience with real robots',
]

const curriculum = [
  {
    week: 1,
    title: 'Robotics Fundamentals',
    topics: ['Introduction to Robotics', 'Python for Robotics', 'Mechanics', 'Electronics Basics'],
  },
  {
    week: 2,
    title: 'Robotic Control',
    topics: ['Control Theory', 'Microcontrollers', 'Actuators & Sensors', 'ROS Basics'],
  },
  {
    week: 3,
    title: 'Perception & Navigation',
    topics: ['Computer Vision', 'SLAM', 'Path Planning', 'Sensor Fusion'],
  },
  {
    week: 4,
    title: 'Advanced Applications',
    topics: ['AI for Robotics', 'Autonomous Systems', 'Robot Integration', 'Industry Applications'],
  },
]

export default function RoboticsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
          Robotics Program
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          Master robotics engineering and launch your career in the rapidly growing field of automation
        </p>
        <Link
          href="/apply"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200"
        >
          Apply Now
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-start space-x-3 p-4 bg-white dark:bg-slate-800 rounded-lg"
          >
            <CheckCircle className="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0" />
            <span className="text-slate-700 dark:text-slate-300">{feature}</span>
          </div>
        ))}
      </div>

      {/* Curriculum Section */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
          Program Curriculum
        </h2>
        <div className="space-y-6">
          {curriculum.map((week) => (
            <div
              key={week.week}
              className="bg-white dark:bg-slate-800 rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                Week {week.week}: {week.title}
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {week.topics.map((topic) => (
                  <div
                    key={topic}
                    className="flex items-center space-x-2 text-slate-600 dark:text-slate-400"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400" />
                    <span>{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 