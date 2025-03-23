import React from 'react';
import Link from 'next/link';
import { ArrowRight, Code, Brain, Bot } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-secondary-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-urbanist-text font-extrabold tracking-tight mb-6">
              <span className="text-slate-900 dark:text-white">Learn, Earn &</span>{' '}
              <span className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
                Master Tech Skills
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0">
              Join our innovative tiered program where you learn from industry experts,
              work on real projects, and get paid while mastering your craft.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/apply"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-slate-700 dark:text-white bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                How It Works
              </Link>
            </div>
          </div>

          <div className="relative lg:block">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Floating cards */}
              <div className="absolute top-0 -left-4 w-72 h-72 bg-secondary-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-72 h-72 bg-accent-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>

              {/* Track cards */}
              <div className="relative space-y-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                        <Code className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Web Development</h3>
                      <p className="text-slate-500 dark:text-slate-400">Full-stack mastery</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-700 ml-12">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-secondary-100 dark:bg-secondary-900/30 rounded-lg">
                        <Brain className="h-6 w-6 text-secondary-600 dark:text-secondary-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">AI & ML</h3>
                      <p className="text-slate-500 dark:text-slate-400">Future-ready skills</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-700">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-accent-100 dark:bg-accent-900/30 rounded-lg">
                        <Bot className="h-6 w-6 text-accent-600 dark:text-accent-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Robotics</h3>
                      <p className="text-slate-500 dark:text-slate-400">Hardware & software</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;