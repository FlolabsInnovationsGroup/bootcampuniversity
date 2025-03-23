import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/shared';
import { Lightbulb } from 'lucide-react';

// Utility function to get tailwind classes based on color name
const getColorClass = (type: string, color: string) => {
  const colorMap: Record<string, Record<string, string>> = {
    bg: {
      blue: 'bg-primary-600',
      indigo: 'bg-indigo-600',
      teal: 'bg-teal-600',
      purple: 'bg-purple-600',
      pink: 'bg-pink-600',
    },
    'bg-light': {
      blue: 'bg-primary-100 dark:bg-primary-900/20',
      indigo: 'bg-indigo-100 dark:bg-indigo-900/20',
      teal: 'bg-teal-100 dark:bg-teal-900/20',
      purple: 'bg-purple-100 dark:bg-purple-900/20',
      pink: 'bg-pink-100 dark:bg-pink-900/20',
    },
    'bg-gradient': {
      blue: 'bg-primary-50 dark:bg-primary-900/10',
      indigo: 'bg-indigo-50 dark:bg-indigo-900/10',
      teal: 'bg-teal-50 dark:bg-teal-900/10',
      purple: 'bg-purple-50 dark:bg-purple-900/10',
      pink: 'bg-pink-50 dark:bg-pink-900/10',
    },
    border: {
      blue: 'border-primary-600 dark:border-primary-400',
      indigo: 'border-indigo-600 dark:border-indigo-400',
      teal: 'border-teal-600 dark:border-teal-400',
      purple: 'border-purple-600 dark:border-purple-400',
      pink: 'border-pink-600 dark:border-pink-400',
    },
    text: {
      blue: 'text-primary-600 dark:text-primary-400',
      indigo: 'text-indigo-600 dark:text-indigo-400',
      teal: 'text-teal-600 dark:text-teal-400',
      purple: 'text-purple-600 dark:text-purple-400',
      pink: 'text-pink-600 dark:text-pink-400',
    },
    'text-dark': {
      blue: 'text-primary-800 dark:text-primary-200',
      indigo: 'text-indigo-800 dark:text-indigo-200',
      teal: 'text-teal-800 dark:text-teal-200',
      purple: 'text-purple-800 dark:text-purple-200',
      pink: 'text-pink-800 dark:text-pink-200',
    },
    focus: {
      blue: 'focus:ring-primary-500',
      indigo: 'focus:ring-indigo-500',
      teal: 'focus:ring-teal-500',
      purple: 'focus:ring-purple-500',
      pink: 'focus:ring-pink-500',
    },
    hover: {
      blue: 'hover:bg-primary-700',
      indigo: 'hover:bg-indigo-700',
      teal: 'hover:bg-teal-700',
      purple: 'hover:bg-purple-700',
      pink: 'hover:bg-pink-700',
    },
  };

  return colorMap[type][color] || '';
};

export default function HowItWorks() {
  const tiers = [
    {
      id: 'tier1',
      name: 'Tier 1: Bootcamp',
      duration: '3-6 months',
      cost: '$1,000 - $2,000',
      earningPotential: 'Non-paid learning phase',
      description: 'Start your journey with our affordable bootcamp program. This tier focuses on building your foundation through industry-recognized online learning platforms combined with hands-on project experience.',
      features: [
        'Self-paced learning through GitHub, AWS, Hugging Face, and more',
        'Mentorship and guidance from industry professionals',
        'Practical experience through small-scale projects',
        'Certification upon completion',
        'Preparation for Tier 2 advancement'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-blue-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
        </svg>
      ),
      color: 'blue'
    },
    {
      id: 'tier2',
      name: 'Tier 2: Apprenticeship',
      duration: '6-12 months',
      cost: 'Paid position',
      earningPotential: 'Hourly/stipend compensation',
      description: 'Advance to our paid apprenticeship program where you\'ll continue your education while contributing to real-world projects. This co-op model provides invaluable experience while earning.',
      features: [
        'Paid work on actual client projects',
        'Continued learning through advanced modules',
        'Direct mentorship from senior team members',
        'Portfolio building with production-level work',
        'Development of specialization in your chosen track'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-indigo-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
        </svg>
      ),
      color: 'indigo'
    },
    {
      id: 'tier3',
      name: 'Tier 3: Masters Program',
      duration: 'Ongoing',
      cost: 'Full salary position',
      earningPotential: 'Competitive industry rates',
      description: 'Reach the pinnacle of our program as a fully paid team member with leadership opportunities and continued professional growth. At this level, you\'ll be contributing at a senior level.',
      features: [
        'Competitive salary and benefits',
        'Leadership positions on projects',
        'Opportunity to mentor Tier 1 and 2 students',
        'Advanced specialization in your field',
        'Industry networking and career advancement'
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-teal-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      ),
      color: 'teal'
    }
  ];

  const faqItems = [
    {
      question: "How does the tiered progression work?",
      answer: "Students start in Tier 1 (Bootcamp) where they build foundational skills through self-paced learning and guided projects. Upon successful completion, they can be invited to Tier 2 (Apprenticeship) where they work on real client projects while earning compensation. Top performers can advance to Tier 3 (Masters Program) where they take on leadership roles with full compensation."
    },
    {
      question: "What makes this different from traditional bootcamps?",
      answer: "Our program combines the best aspects of bootcamps, internships, and apprenticeships in a unified journey. Unlike traditional bootcamps that end after a few months, our tiered approach creates a clear pathway from learning to earning, with opportunities to advance within the same organization. We also integrate with established educational platforms rather than creating all content from scratch."
    },
    {
      question: "How much does it cost?",
      answer: "Tier 1 (Bootcamp) costs between $1,000-$2,000 - significantly less than most coding bootcamps which typically charge $10,000+. Tier 2 (Apprenticeship) and Tier 3 (Masters Program) are paid positions, meaning you'll be earning money rather than paying for education."
    },
    {
      question: "How long does each tier take to complete?",
      answer: "Tier 1 typically takes 3-6 months, depending on your learning pace and available time. Tier 2 usually lasts 6-12 months as you gain professional experience. Tier 3's duration is open-ended, functioning more like a traditional employment position with advancement opportunities."
    },
    {
      question: "Is advancement between tiers guaranteed?",
      answer: "Advancement depends on successful completion of each tier's requirements and available positions. While we strive to advance as many qualified students as possible, progression to higher tiers is merit-based and dependent on your performance, skills, and our current project needs."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-950 dark:to-gray-900/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-400 py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 to-primary-400/90" />
          <svg
            className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4 opacity-20"
            width="404"
            height="404"
            fill="none"
            viewBox="0 0 404 404"
          >
            <defs>
              <pattern id="pattern-squares" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" fill="white" />
              </pattern>
            </defs>
            <rect width="404" height="404" fill="url(#pattern-squares)" />
          </svg>
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 border-2 border-white/20">
              <Lightbulb className="mr-1.5 h-3.5 w-3.5" />
              Program Overview
            </Badge>
            <h1 className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
              How It Works
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-white/90">
              Our three-tier program creates a seamless journey from learning to earning, 
              combining theory with real-world experience.
            </p>
          </div>
        </div>
      </div>

      {/* Journey Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50 sm:text-4xl">
              The <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Earn & Learn</span> Journey
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Our revolutionary approach combines affordable education with practical experience, 
              creating a clear pathway to a successful tech career.
            </p>
          </div>

          {/* Journey path visual */}
          <div className="relative mb-16 hidden md:block">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t-4 border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-between">
              {tiers.map((tier, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`relative flex items-center justify-center w-16 h-16 rounded-full bg-white dark:bg-gray-900 border-4 ${getColorClass('border', tier.color)} z-10`}>
                    <span className="text-xl font-bold text-gray-900 dark:text-gray-100">{index + 1}</span>
                  </div>
                  <div className="mt-4 text-center">
                    <span className={getColorClass('text', tier.color) + " font-medium"}>Tier {index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Tier Descriptions */}
      <section className="py-12 bg-gray-50/50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {tiers.map((tier, index) => (
            <div 
              key={tier.id} 
              id={tier.id}
              className={`mb-16 last:mb-0 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} md:flex items-start gap-12`}
            >
              <div className="md:w-1/3 mb-8 md:mb-0">
                <div className={`p-8 rounded-lg ${getColorClass('bg-gradient', tier.color)} border-l-4 ${getColorClass('border', tier.color)}`}>
                  <div className="flex items-center mb-6">
                    <div className={`p-3 rounded-lg ${getColorClass('bg-light', tier.color)} mr-4`}>
                      {tier.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">{tier.name}</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Duration:</span>
                      <span className="text-gray-900 dark:text-gray-100">{tier.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Cost:</span>
                      <span className="text-gray-900 dark:text-gray-100">{tier.cost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400 font-medium">Earning:</span>
                      <span className="text-gray-900 dark:text-gray-100">{tier.earningPotential}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3">
                <h4 className={`${getColorClass('text', tier.color)} font-semibold mb-2`}>TIER {index + 1}</h4>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mb-4">{tier.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {tier.description}
                </p>
                <h4 className="text-lg font-medium text-gray-900 dark:text-gray-50 mb-4">What You&apos;ll Get:</h4>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${getColorClass('text', tier.color)} mr-2 mt-0.5`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                {index === 0 && (
                  <Link
                    href="/apply"
                    className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white ${getColorClass('bg', tier.color)} ${getColorClass('hover', tier.color)} focus:outline-none focus:ring-2 focus:ring-offset-2 ${getColorClass('focus', tier.color)}`}
                  >
                    Apply for Tier 1
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison with Traditional Options */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50 sm:text-4xl">
              How We Compare
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              See how our tiered approach compares to traditional education and training options.
            </p>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
              <thead className="text-xs text-gray-700 dark:text-gray-300 uppercase bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    Features
                  </th>
                  <th scope="col" className="px-6 py-4 text-center bg-gradient-to-r from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/20 border-b-2 border-primary-600 dark:border-primary-400">
                    <span className="font-bold text-primary-600 dark:text-primary-400">Innovation Bootcamp University</span>
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    Traditional Bootcamps
                  </th>
                  <th scope="col" className="px-6 py-4 text-center">
                    College Degrees
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    Cost
                  </td>
                  <td className="px-6 py-4 text-center bg-gradient-to-r from-primary-50 to-primary-100/50">
                    $1,000 - $2,000 (Tier 1)
                  </td>
                  <td className="px-6 py-4 text-center">
                    $10,000 - $20,000
                  </td>
                  <td className="px-6 py-4 text-center">
                    $40,000 - $120,000+
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    Duration
                  </td>
                  <td className="px-6 py-4 text-center bg-gradient-to-r from-primary-50 to-primary-100/50">
                    Flexible progression across tiers
                  </td>
                  <td className="px-6 py-4 text-center">
                    3-6 months
                  </td>
                  <td className="px-6 py-4 text-center">
                    2-4 years
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    Earning While Learning
                  </td>
                  <td className="px-6 py-4 text-center bg-gradient-to-r from-primary-50 to-primary-100/50">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Yes (in Tier 2 & 3)
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      No
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Limited (internships)
                    </span>
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    Real Project Experience
                  </td>
                  <td className="px-6 py-4 text-center bg-gradient-to-r from-primary-50 to-primary-100/50">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Extensive client projects
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Simulated projects
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Academic projects
                    </span>
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    Career Pathway
                  </td>
                  <td className="px-6 py-4 text-center bg-gradient-to-r from-primary-50 to-primary-100/50">
                    Clear progression to paid positions
                  </td>
                  <td className="px-6 py-4 text-center">
                    Job hunting after completion
                  </td>
                  <td className="px-6 py-4 text-center">
                    Job hunting after graduation
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    Industry-Recognized Learning
                  </td>
                  <td className="px-6 py-4 text-center bg-gradient-to-r from-primary-50 to-primary-100/50">
                    GitHub, AWS, Google, Hugging Face, etc.
                  </td>
                  <td className="px-6 py-4 text-center">
                    Proprietary curriculum
                  </td>
                  <td className="px-6 py-4 text-center">
                    Academic curriculum
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50" id="earn-learn">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about our unique earn-and-learn model.
            </p>
          </div>

          <div className="max-w-4xl mx-auto divide-y divide-gray-200">
            {faqItems.map((item, index) => (
              <div key={index} className="py-6">
                <h3 className="text-lg font-medium text-gray-900">
                  {item.question}
                </h3>
                <p className="mt-3 text-gray-600">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">
              Have more questions? We&apos;re here to help.
            </p>
            <Link
              href="/apply"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}