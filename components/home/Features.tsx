'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Gem, GraduationCap, Users, Wallet, Zap } from 'lucide-react';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  iconColor: string;
  delay: number;
}

const features: Feature[] = [
  {
    icon: GraduationCap,
    title: 'Learn from Industry Experts',
    description: 'Get mentored by experienced professionals who bring real-world expertise to your learning journey.',
    color: 'bg-primary-50 dark:bg-primary-950/50',
    iconColor: 'text-primary-600 dark:text-primary-400',
    delay: 0.1,
  },
  {
    icon: Wallet,
    title: 'Earn While You Learn',
    description: 'Start earning as you develop your skills through our innovative paid apprenticeship model.',
    color: 'bg-secondary-50 dark:bg-secondary-950/50',
    iconColor: 'text-secondary-600 dark:text-secondary-400',
    delay: 0.2,
  },
  {
    icon: Code,
    title: 'Hands-on Projects',
    description: 'Build real-world projects that demonstrate your capabilities to potential employers.',
    color: 'bg-accent-50 dark:bg-accent-950/50',
    iconColor: 'text-accent-600 dark:text-accent-400',
    delay: 0.3,
  },
  {
    icon: Users,
    title: 'Collaborative Learning',
    description: 'Join a community of learners and build your professional network from day one.',
    color: 'bg-primary-50 dark:bg-primary-950/50',
    iconColor: 'text-primary-600 dark:text-primary-400',
    delay: 0.4,
  },
  {
    icon: Gem,
    title: 'Industry-Recognized Skills',
    description: 'Gain certifications and skills that are in high demand across the tech industry.',
    color: 'bg-secondary-50 dark:bg-secondary-950/50',
    iconColor: 'text-secondary-600 dark:text-secondary-400',
    delay: 0.5,
  },
  {
    icon: Zap,
    title: 'Fast-Track Career Growth',
    description: 'Accelerate your career progression with our structured learning paths and job placement support.',
    color: 'bg-accent-50 dark:bg-accent-950/50',
    iconColor: 'text-accent-600 dark:text-accent-400',
    delay: 0.6,
  },
];

const FeatureCard = ({ feature }: { feature: Feature }) => {
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
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all duration-300 hover:shadow-xl dark:shadow-primary-500/5"
    >
      <div 
        className={`absolute -right-4 -top-4 h-32 w-32 rounded-full ${feature.color} opacity-40 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:opacity-60`} 
      />
      <div className="relative">
        <div 
          className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl ${feature.color} transition-transform duration-300 group-hover:scale-110`}
        >
          <feature.icon className={`h-7 w-7 ${feature.iconColor} transition-all duration-300 group-hover:scale-110`} />
        </div>
        <h3 className="mb-3 text-xl font-bold tracking-tight text-foreground">
          {feature.title}
        </h3>
        <p className="text-muted-foreground/90">
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
};

export default function Features() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    <section ref={containerRef} className="relative overflow-hidden py-24 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.03]" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary-50/20 via-primary-50/10 to-transparent dark:from-primary-950/20 dark:via-primary-950/10" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-secondary-50/20 via-secondary-50/10 to-transparent dark:from-secondary-950/20 dark:via-secondary-950/10" />

      <motion.div 
        style={{ opacity }}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <div className="max-w-2xl">
          <motion.h2
            style={{ y }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Why Choose{' '}
            <span className="text-gradient bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Innovation Bootcamp
            </span>
          </motion.h2>
          <motion.p
            style={{ y }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Our program is designed to transform beginners into industry-ready professionals through a unique combination of structured learning and practical experience.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </motion.div>
    </section>
  );
} 