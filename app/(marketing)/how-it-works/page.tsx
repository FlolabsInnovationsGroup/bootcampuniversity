import { ArrowRight, BookOpen, Users, Code, Award, DollarSign, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const steps = [
  {
    title: 'Foundation Learning',
    description: 'Begin with structured learning to build essential technical skills.',
    icon: BookOpen,
  },
  {
    title: 'Transition to Earning',
    description: 'Apply your skills to real projects and start earning while you continue learning.',
    icon: DollarSign,
  },
  {
    title: 'Professional Growth',
    description: 'Take on leadership roles in projects and increase your earning potential.',
    icon: TrendingUp,
  },
  {
    title: 'Career Advancement',
    description: 'Graduate with the skills, portfolio, and experience employers are looking for.',
    icon: Award,
  },
]

const tiers = [
  {
    tier: 1,
    name: 'Foundation Builder',
    subtitle: 'Learning Phase',
    description: 'In Tier 1, you pay for education to build a solid foundation in technical skills.',
    features: [
      'Structured curriculum in your chosen track',
      'Hands-on projects with real-world applications',
      'Personalized mentorship and support',
      'Community of like-minded learners',
    ],
    duration: '2-3 months',
    investment: '$500/month',
  },
  {
    tier: 2,
    name: 'Skill Accelerator',
    subtitle: 'Start Earning',
    description: 'In Tier 2, you start earning while you continue to learn more advanced skills.',
    features: [
      'Work on client projects with supervision',
      'Learn advanced topics in your specialty',
      'Receive compensation for your contributions',
      'Build professional portfolio of work',
    ],
    duration: '3-4 months',
    earning: 'Start earning income',
  },
  {
    tier: 3,
    name: 'Professional Developer',
    subtitle: 'Earn More',
    description: 'In Tier 3, you take on leadership roles and increase your earning potential.',
    features: [
      'Lead project teams and mentor others',
      'Develop specialized expertise',
      'Increase your compensation',
      'Prepare for career advancement or entrepreneurship',
    ],
    duration: '4-6 months',
    earning: 'Increased earnings',
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
          Our cooperative education model transitions you from student to paid professional
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
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
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

      {/* Three Tiers Section */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
          Three-Tier Education Model
        </h2>
        
        <div className="space-y-8">
          {tiers.map((tier, index) => (
            <div 
              key={tier.tier}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="md:w-1/3">
                  <div className="inline-block rounded-lg bg-primary-50 dark:bg-primary-900/20 px-3 py-1 text-sm font-medium text-primary-600 dark:text-primary-400 mb-3">
                    Tier {tier.tier}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {tier.name}
                  </h3>
                  <p className="text-lg text-primary-600 dark:text-primary-400 mb-3">
                    {tier.subtitle}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {tier.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="font-medium text-slate-700 dark:text-slate-300 mr-2">Duration:</span>
                      <span className="text-slate-600 dark:text-slate-400">{tier.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium text-slate-700 dark:text-slate-300 mr-2">
                        {index === 0 ? 'Investment:' : 'Earnings:'}
                      </span>
                      <span className="text-slate-600 dark:text-slate-400">
                        {index === 0 ? tier.investment : tier.earning}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                    What you'll get:
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {tier.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start space-x-2"
                      >
                        <div className="w-1.5 h-1.5 mt-2 rounded-full bg-primary-600 dark:bg-primary-400 flex-shrink-0" />
                        <span className="text-slate-600 dark:text-slate-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Comparison With Traditional Education */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm p-8 mb-16">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
          Why Choose Cooperative Education?
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-700">
              Traditional Education
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 mt-2 rounded-full bg-slate-400 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-400">High upfront costs ($15,000-$20,000+)</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 mt-2 rounded-full bg-slate-400 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-400">Long period before earning income</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 mt-2 rounded-full bg-slate-400 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-400">Often lacks real-world experience</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 mt-2 rounded-full bg-slate-400 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-400">Gap between education and employment</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-primary-600 dark:text-primary-400 pb-2 border-b border-primary-200 dark:border-primary-900/30">
              Our Cooperative Model
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 mt-2 rounded-full bg-primary-600 dark:bg-primary-400 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-400">Lower initial investment ($500/month)</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 mt-2 rounded-full bg-primary-600 dark:bg-primary-400 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-400">Start earning in 2-3 months</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 mt-2 rounded-full bg-primary-600 dark:bg-primary-400 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-400">Work on real client projects from Tier 2</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 mt-2 rounded-full bg-primary-600 dark:bg-primary-400 flex-shrink-0" />
                <span className="text-slate-600 dark:text-slate-400">Seamless transition from learning to earning</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
          Apply today and begin your journey from student to paid professional with our innovative cooperative education model.
        </p>
        <Link
          href="/apply"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200"
        >
          Apply Now
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </div>
    </div>
  )
} 