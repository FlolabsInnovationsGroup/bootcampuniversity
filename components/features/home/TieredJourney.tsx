'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Rocket, Trophy, Sparkles } from 'lucide-react';

const tiers = [
  {
    level: 'Tier 1',
    title: 'Foundation Builder',
    icon: Code2,
    color: 'from-blue-500 to-blue-600',
    darkColor: 'dark:from-blue-600 dark:to-blue-700',
    iconBg: 'bg-blue-100 dark:bg-blue-900/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    earnings: '$500-1000',
    duration: '2-3 months',
    skills: ['HTML/CSS', 'JavaScript', 'Git Basics', 'UI/UX Fundamentals'],
    description: 'Build a strong foundation in web development fundamentals while earning your first rewards.'
  },
  {
    level: 'Tier 2',
    title: 'Skill Accelerator',
    icon: Rocket,
    color: 'from-purple-500 to-purple-600',
    darkColor: 'dark:from-purple-600 dark:to-purple-700',
    iconBg: 'bg-purple-100 dark:bg-purple-900/20',
    iconColor: 'text-purple-600 dark:text-purple-400',
    earnings: '$1000-2500',
    duration: '3-4 months',
    skills: ['React/Next.js', 'Node.js', 'Database Design', 'API Development'],
    description: 'Accelerate your learning with advanced concepts and start building full-stack applications.'
  },
  {
    level: 'Tier 3',
    title: 'Professional Developer',
    icon: Trophy,
    color: 'from-green-500 to-green-600',
    darkColor: 'dark:from-green-600 dark:to-green-700',
    iconBg: 'bg-green-100 dark:bg-green-900/20',
    iconColor: 'text-green-600 dark:text-green-400',
    earnings: '$2500-5000',
    duration: '4-6 months',
    skills: ['System Design', 'Cloud Services', 'DevOps', 'Team Leadership'],
    description: 'Work on complex projects and prepare for professional software engineering roles.'
  }
];

const TierCard = ({ tier, index }: { tier: typeof tiers[0]; index: number }) => {
  const Icon = tier.icon;
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className="relative group"
    >
      {index < tiers.length - 1 && (
        <>
          <div className="hidden md:block absolute top-1/2 left-[90%] w-[20%] h-1 bg-gradient-to-r from-slate-200/50 to-transparent dark:from-slate-700/50 transform -translate-y-1/2 z-0" />
          <motion.div 
            initial={{ width: '0%' }}
            whileInView={{ width: '20%' }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden md:block absolute top-1/2 left-[90%] h-1 bg-gradient-to-r from-primary-500 to-secondary-500 transform -translate-y-1/2 z-1"
          />
          <div className="hidden md:flex absolute top-1/2 left-[110%] -translate-y-1/2 z-10">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500"
            />
          </div>
        </>
      )}
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 bg-white dark:bg-slate-800/90 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden backdrop-blur-sm border border-slate-200/10"
      >
        <motion.div 
          whileHover={{ y: -2 }}
          className={`p-8 bg-gradient-to-br ${tier.color} ${tier.darkColor}`}
        >
          <div className="flex items-center justify-between mb-6">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`w-14 h-14 rounded-xl ${tier.iconBg} flex items-center justify-center shadow-lg`}
            >
              <Icon className={`w-7 h-7 ${tier.iconColor}`} />
            </motion.div>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium backdrop-blur-sm"
            >
              {tier.level}
            </motion.span>
          </div>
          <motion.h3 
            whileHover={{ x: 5 }}
            className="text-2xl font-bold text-white mb-3"
          >
            {tier.title}
          </motion.h3>
          <p className="text-white/90 text-base leading-relaxed">{tier.description}</p>
        </motion.div>

        <div className="p-8">
          <div className="grid grid-cols-2 gap-4 mb-8">
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }}
              className="text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/10 backdrop-blur-sm"
            >
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Potential Earnings</p>
              <motion.p 
                whileHover={{ scale: 1.1 }}
                className="text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent"
              >
                {tier.earnings}
              </motion.p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }}
              className="text-center p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/10 backdrop-blur-sm"
            >
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Duration</p>
              <motion.p 
                whileHover={{ scale: 1.1 }}
                className="text-xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent"
              >
                {tier.duration}
              </motion.p>
            </motion.div>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-4">Key Skills</h4>
            <div className="flex flex-wrap gap-2">
              {tier.skills.map((skill, idx) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="px-3 py-1.5 text-sm rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 border border-slate-200/10 backdrop-blur-sm"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const TieredJourney = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    <section ref={containerRef} className="relative py-32 bg-slate-50/80 dark:bg-slate-900/80 backdrop-blur-xl">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-secondary-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-accent-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <motion.div 
        style={{ opacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            style={{ y }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6 border border-primary-200/20 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Your Learning Journey
          </motion.div>

          <motion.h2
            style={{ y }}
            className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight"
          >
            Earn More as You{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Learn More
            </span>
          </motion.h2>

          <motion.p
            style={{ y }}
            className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            Our tiered program structure ensures you're constantly growing while earning.
            Each tier brings new challenges, higher earnings, and greater opportunities.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {tiers.map((tier, index) => (
            <TierCard key={tier.level} tier={tier} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TieredJourney;