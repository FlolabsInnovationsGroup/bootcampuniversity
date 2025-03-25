import Link from 'next/link'
import { ArrowRight, CheckCircle } from 'lucide-react'

const features = [
  'Machine Learning fundamentals and algorithms',
  'Deep Learning and Neural Networks',
  'Natural Language Processing',
  'Computer Vision applications',
  'AI model deployment and scaling',
  'Real-world AI project experience',
]

const curriculum = [
  {
    week: 1,
    title: 'Foundations of AI & ML',
    topics: ['Python for AI', 'Math Fundamentals', 'Data Processing', 'Basic Statistics'],
  },
  {
    week: 2,
    title: 'Machine Learning',
    topics: ['Supervised Learning', 'Unsupervised Learning', 'Model Evaluation', 'Feature Engineering'],
  },
  {
    week: 3,
    title: 'Deep Learning',
    topics: ['Neural Networks', 'CNN', 'RNN', 'Transformers'],
  },
  {
    week: 4,
    title: 'Applied AI',
    topics: ['NLP', 'Computer Vision', 'Model Deployment', 'Ethics in AI'],
  },
]

export default function AiMlPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
          AI & Machine Learning Program
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          Master artificial intelligence and machine learning to build the future of technology
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