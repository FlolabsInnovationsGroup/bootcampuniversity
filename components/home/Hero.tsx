'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronRight, Star, Users, Briefcase, GraduationCap, Building2 } from 'lucide-react';

// Stats Card Component
const StatsCard = ({ label, value, icon: Icon }: { label: string; value: string; icon: React.ElementType }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className="relative group"
  >
    <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 rounded-xl blur-lg group-hover:opacity-100 opacity-0 transition-opacity duration-500" />
    <div className="relative card flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
      <div className="w-12 h-12 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center mb-3">
        <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
      </div>
      <div className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-1">
        {value}
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-400">{label}</div>
    </div>
  </motion.div>
);

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const stats = [
    { icon: GraduationCap, value: "95%", label: "Employment Rate" },
    { icon: Briefcase, value: "$75K", label: "Avg Starting Salary" },
    { icon: Users, value: "1000+", label: "Graduates" },
    { icon: Building2, value: "50+", label: "Partner Companies" },
  ];

  return (
    <motion.div
      ref={containerRef}
      style={{ opacity, scale, y }}
      className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden py-20 sm:py-32 bg-slate-50 dark:bg-slate-900"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid opacity-20 dark:opacity-10" />
        <motion.div
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px'],
            opacity: [0.3, 0.2],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
          className="absolute inset-0 bg-gradient-radial from-primary-500/30 to-transparent bg-[length:50px_50px]"
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full max-w-6xl mx-auto">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-primary-500/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: 1,
            }}
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary-500/30 rounded-full blur-3xl"
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center rounded-full px-4 py-1 mb-8 bg-primary-50 dark:bg-primary-500/10 border border-primary-100 dark:border-primary-500/20 backdrop-blur-sm"
        >
          <Star className="w-4 h-4 text-primary-600 dark:text-primary-400" />
          <span className="ml-2 text-sm font-medium text-primary-600 dark:text-primary-400">
            Applications Open for 2024
          </span>
          <ChevronRight className="w-4 h-4 ml-1 text-primary-600 dark:text-primary-400" />
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white mb-6"
        >
          Launch Your Tech Career with{' '}
          <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Innovation Bootcamp
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10"
        >
          Transform your future with hands-on training, expert mentorship, and real-world projects. 
          Join a community of innovators and kickstart your journey in tech.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <Link 
            href="/apply" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25 group"
          >
            Apply Now
            <motion.div
              className="ml-2"
              initial={false}
              animate={{ x: 0 }}
              whileHover={{ x: 4 }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </Link>
          <Link 
            href="/programs" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium transition-all duration-200"
          >
            Explore Programs
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-5xl"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <StatsCard {...stat} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;