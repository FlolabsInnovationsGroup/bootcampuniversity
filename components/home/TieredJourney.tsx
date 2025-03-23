import React from 'react';
import { GraduationCap, Code, Brain, Rocket, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const tiers = [
  {
    icon: Code,
    name: 'Bootcamp',
    duration: '8-12 weeks',
    description: 'Master the fundamentals through intensive, hands-on training with industry experts.',
    features: [
      'Foundational programming concepts',
      'Industry-standard tools & practices',
      'Project-based learning',
      'Mentorship support'
    ],
    color: 'primary'
  },
  {
    icon: Brain,
    name: 'Apprenticeship',
    duration: '6-12 months',
    description: 'Get paid while working on real projects and continuing your technical education.',
    features: [
      'Paid work experience',
      'Real client projects',
      'Advanced technical training',
      'Career development'
    ],
    color: 'secondary'
  },
  {
    icon: Rocket,
    name: 'Career Launch',
    duration: 'Ongoing',
    description: 'Launch your tech career with our network of industry partners and continued support.',
    features: [
      'Job placement assistance',
      'Industry networking',
      'Advanced certifications',
      'Leadership opportunities'
    ],
    color: 'accent'
  }
];

const TieredJourney = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900" />
      
      {/* Decorative shapes */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
      <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-secondary-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-accent-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 mb-6">
            <GraduationCap className="w-4 h-4 text-primary-500" />
            <span className="text-sm font-medium text-slate-900 dark:text-white">Your Learning Journey</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-urbanist-text font-extrabold tracking-tight mb-6">
            <span className="text-slate-900 dark:text-white">A </span>
            <span className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
              Tiered Approach
            </span>
            <span className="text-slate-900 dark:text-white"> to Success</span>
          </h2>
          
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Our unique three-tiered program ensures you build a strong foundation,
            gain real experience, and launch a successful tech career.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl border border-slate-100 dark:border-slate-700 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Hover gradient effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 via-secondary-500/0 to-accent-500/0 group-hover:from-primary-500/5 group-hover:via-secondary-500/5 group-hover:to-accent-500/5 transition-colors duration-500" />
                
                <div className="relative">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${tier.color}-100 dark:bg-${tier.color}-900/30`}>
                      <Icon className={`w-6 h-6 text-${tier.color}-500 dark:text-${tier.color}-400`} />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium bg-${tier.color}-100 dark:bg-${tier.color}-900/30 text-${tier.color}-600 dark:text-${tier.color}-400`}>
                      {tier.duration}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {tier.name}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-300 mb-6">
                    {tier.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle className={`w-5 h-5 mt-0.5 text-${tier.color}-500 dark:text-${tier.color}-400 flex-shrink-0`} />
                        <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Progress indicator */}
                  <div className="flex items-center gap-2 mb-6">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full flex-1 ${
                          i <= index
                            ? `bg-${tier.color}-500 dark:bg-${tier.color}-400`
                            : 'bg-slate-200 dark:bg-slate-700'
                        }`}
                      />
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    href={`/apply?tier=${tier.name.toLowerCase()}`}
                    className={`inline-flex items-center justify-center w-full px-4 py-2 rounded-lg bg-${tier.color}-100 dark:bg-${tier.color}-900/30 text-${tier.color}-600 dark:text-${tier.color}-400 hover:bg-${tier.color}-200 dark:hover:bg-${tier.color}-900/50 transition-colors duration-200`}
                  >
                    Learn more
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TieredJourney;