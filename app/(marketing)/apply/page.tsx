'use client';

import { ArrowRight, Info } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const DynamicApply = dynamic(() => import('@/components/features/home/Apply'), {
  ssr: false,
  loading: () => (
    <div className="min-h-[600px] animate-pulse bg-slate-100 dark:bg-slate-800/50 rounded-2xl" />
  ),
});

export default function ApplyPage() {
  const [activeTab, setActiveTab] = useState<'tier1' | 'tier2' | 'tier3'>('tier1');

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl mb-4">
          Apply to Innovation Bootcamp University
            </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          Join our cooperative education program and transition from student to paid professional
            </p>
      </div>

      {/* Cooperative Education Model Explanation */}
      <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 mb-16">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
          Our Cooperative Education Model
              </h2>
        
        <div className="flex flex-wrap justify-center mb-8">
          <button
            onClick={() => setActiveTab('tier1')}
            className={`px-6 py-3 m-2 rounded-lg font-medium transition-all ${
              activeTab === 'tier1'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            Tier 1: Learning Phase
          </button>
          <button
            onClick={() => setActiveTab('tier2')}
            className={`px-6 py-3 m-2 rounded-lg font-medium transition-all ${
              activeTab === 'tier2'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            Tier 2: Start Earning
          </button>
          <button
            onClick={() => setActiveTab('tier3')}
            className={`px-6 py-3 m-2 rounded-lg font-medium transition-all ${
              activeTab === 'tier3'
                ? 'bg-primary-600 text-white'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            Tier 3: Earn More
          </button>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl p-6">
          {activeTab === 'tier1' && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Tier 1: Foundation Builder - Learning Phase
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                In the first tier, you invest in your education to build a solid foundation of technical skills. This phase focuses on intensive learning through structured curriculum, hands-on projects, and mentorship.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-primary-600">•</div>
                  <span className="text-slate-600 dark:text-slate-400">Duration: 2-3 months</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-primary-600">•</div>
                  <span className="text-slate-600 dark:text-slate-400">Investment: $500/month</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-primary-600">•</div>
                  <span className="text-slate-600 dark:text-slate-400">Focus on core technical skills and fundamentals</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-primary-600">•</div>
                  <span className="text-slate-600 dark:text-slate-400">Personalized learning path and regular feedback</span>
                </li>
              </ul>
            </div>
          )}
            
          {activeTab === 'tier2' && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Tier 2: Skill Accelerator - Start Earning
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                In the second tier, you transition from paying to earning as you apply your skills on real-world projects. You'll continue learning advanced topics while earning income through client work.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-primary-600">•</div>
                  <span className="text-slate-600 dark:text-slate-400">Duration: 3-4 months</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-primary-600">•</div>
                  <span className="text-slate-600 dark:text-slate-400">Start earning while continuing your education</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-primary-600">•</div>
                  <span className="text-slate-600 dark:text-slate-400">Work on real client projects with supervision</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-primary-600">•</div>
                  <span className="text-slate-600 dark:text-slate-400">Build professional portfolio and gain practical experience</span>
                </li>
              </ul>
            </div>
          )}
            
          {activeTab === 'tier3' && (
            <div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                Tier 3: Professional Developer - Earn More
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                In the third tier, you take on leadership roles on projects and continue advancing your skills. Your earnings increase as you demonstrate expertise and take on more responsibility.
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-primary-600">•</div>
                  <span className="text-slate-600 dark:text-slate-400">Duration: 4-6 months</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-primary-600">•</div>
                  <span className="text-slate-600 dark:text-slate-400">Increased earnings with leadership responsibilities</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-primary-600">•</div>
                  <span className="text-slate-600 dark:text-slate-400">Lead project teams and mentor junior developers</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 text-primary-600">•</div>
                  <span className="text-slate-600 dark:text-slate-400">Opportunity for permanent placement or entrepreneurship support</span>
                </li>
              </ul>
            </div>
          )}
            </div>
            
        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg max-w-2xl">
            <Info className="w-5 h-5 mr-3 flex-shrink-0" />
            <p className="text-sm">
              Our cooperative education model is designed to make quality tech education accessible while ensuring you gain practical experience and start earning income sooner.
            </p>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <DynamicApply />
    </div>
  );
}