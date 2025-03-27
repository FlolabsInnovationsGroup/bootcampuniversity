'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Building2, GraduationCap, Target, Code, Brain, Database, Briefcase, Server, Cloud, Globe, Shield } from 'lucide-react';

// Define industry sectors instead of companies
const industrySectors = [
  {
    name: 'Web Development',
    icon: Code,
    description: 'Building modern web applications with React, Next.js, and other cutting-edge frameworks.',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/20',
  },
  {
    name: 'Cloud Computing',
    icon: Cloud,
    description: 'Working with AWS, Azure, and other cloud platforms to build scalable infrastructure.',
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/20',
  },
  {
    name: 'AI & Machine Learning',
    icon: Brain,
    description: 'Building intelligent systems and models that learn from data and make predictions.',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/20',
  },
  {
    name: 'Data Engineering',
    icon: Database,
    description: 'Creating robust data pipelines and storage solutions for big data applications.',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/20',
  },
  {
    name: 'DevOps',
    icon: Server,
    description: 'Streamlining development and operations with CI/CD pipelines and infrastructure as code.',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/20',
  },
  {
    name: 'Cybersecurity',
    icon: Shield,
    description: 'Protecting systems and data from threats and vulnerabilities through secure coding practices.',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/20',
  },
  {
    name: 'Global Tech Companies',
    icon: Globe,
    description: 'Opportunities at companies solving problems at global scale with innovative technologies.',
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/20',
  },
  {
    name: 'Tech Startups',
    icon: Briefcase,
    description: 'Working with innovative startups building the next generation of technology solutions.',
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/20',
  },
];

const stats = [
  {
    label: 'Industry Sectors',
    value: '8+',
    icon: <Building2 className="h-5 w-5 text-primary-500" />,
    bgColor: 'bg-primary-100 dark:bg-primary-900/20'
  },
  {
    label: 'Initial Student Capacity',
    value: '100+', 
    icon: <GraduationCap className="h-5 w-5 text-secondary-500" />,
    bgColor: 'bg-secondary-100 dark:bg-secondary-900/20'
  },
  {
    label: 'Target Placement Rate',
    value: '90%+',
    icon: <Target className="h-5 w-5 text-accent-500" />,
    bgColor: 'bg-accent-100 dark:bg-accent-900/20'
  },
];

const IndustrySectorCard = ({ sector, index }: { sector: typeof industrySectors[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const Icon = sector.icon;

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 dark:shadow-primary-500/5"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-6 space-y-4">
        <div className={`w-14 h-14 rounded-xl ${sector.bgColor} flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110`}>
          <Icon className={`w-7 h-7 ${sector.color}`} />
        </div>
        <h3 className="text-lg font-bold text-foreground">{sector.name}</h3>
        <p className="text-sm text-muted-foreground/90">{sector.description}</p>
      </div>
    </motion.div>
  );
};

const StatCard = ({ stat }: { stat: typeof stats[0] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.02 }}
      className="relative overflow-hidden rounded-xl bg-card p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 dark:shadow-primary-500/5"
    >
      <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full ${stat.bgColor} opacity-40 blur-3xl transition-all duration-500`} />
      <div className="relative">
        <div className={`w-14 h-14 mx-auto mb-4 rounded-xl ${stat.bgColor} flex items-center justify-center transform transition-transform duration-300 hover:scale-110`}>
          {stat.icon}
        </div>
        <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
        <div className="text-sm text-muted-foreground">{stat.label}</div>
      </div>
    </motion.div>
  );
};

const PartnerShowcase = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.03]" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary-50/20 via-primary-50/10 to-transparent dark:from-primary-950/20 dark:via-primary-950/10" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-secondary-50/20 via-secondary-50/10 to-transparent dark:from-secondary-950/20 dark:via-secondary-950/10" />

      <motion.div style={{ opacity }} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 style={{ y }} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Career{' '}
            <span className="text-gradient bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Opportunities
            </span>
          </motion.h2>
          <motion.p style={{ y }} transition={{ delay: 0.1 }} className="mt-6 text-lg text-muted-foreground">
            Our curriculum prepares you for roles across a wide range of tech sectors. Here are the industries where our graduates can build successful careers.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {industrySectors.map((sector, index) => (
            <IndustrySectorCard key={sector.name} sector={sector} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default PartnerShowcase;
