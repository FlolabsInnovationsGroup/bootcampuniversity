'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Rocket, DollarSign, Clock, Users, Sparkles } from 'lucide-react';

const stats = [
  {
    icon: Clock,
    value: '6',
    unit: 'months',
    label: 'Average Time to First Job',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
  },
  {
    icon: DollarSign,
    value: '75k',
    unit: 'USD',
    label: 'Average Starting Salary',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
  },
  {
    icon: Users,
    value: '95',
    unit: '%',
    label: 'Employment Rate',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
  },
];

const features = [
  'Learn from industry experts',
  'Build real-world projects',
  'Get paid while you learn',
  'Land a high-paying tech job',
  'No upfront costs',
  'Career support & mentorship'
];

const CallToAction = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 to-white/80 dark:from-slate-900/80 dark:to-slate-900/90 backdrop-blur-xl" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-secondary-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-accent-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <motion.div 
        style={{ opacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div>
            <motion.div
              style={{ y }}
              className="mb-12"
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6 border border-primary-200/20 backdrop-blur-sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Transform Your Career
              </motion.div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                Start Your Tech Career{' '}
                <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                  Without Risk
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                Join our innovative program where you'll learn, earn, and build your way to a successful career in tech. No upfront costs, just your commitment to success.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              style={{ y }}
              className="grid grid-cols-3 gap-6 mb-12"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05 }}
                    className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/10 p-6 text-center shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <div className={`w-12 h-12 mx-auto mb-4 rounded-xl ${stat.bgColor} flex items-center justify-center shadow-lg`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className="flex items-baseline justify-center gap-1 mb-2">
                      <div className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
                        {stat.unit}
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              style={{ y }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/apply"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium shadow-lg shadow-primary-500/25 transition-all duration-200"
                >
                  Apply Now
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/curriculum"
                  className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/80 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium border border-slate-200/10 backdrop-blur-sm hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all duration-200"
                >
                  View Curriculum
                  <Rocket className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Features List */}
          <motion.div
            style={{ y }}
            className="lg:pl-16 xl:pl-24"
          >
            <div className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200/10 p-8 md:p-12 shadow-xl">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5" />
              
              <div className="relative">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                  Program Highlights
                </h3>
                <div className="grid gap-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 group"
                    >
                      <motion.div 
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shadow-lg"
                      >
                        <svg
                          className="w-5 h-5 text-primary-600 dark:text-primary-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </motion.div>
                      <span className="text-lg text-slate-700 dark:text-slate-300 group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-200">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default CallToAction; 