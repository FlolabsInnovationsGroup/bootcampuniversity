'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Building2, Users, Trophy, ArrowRight } from 'lucide-react';

const partners = [
  {
    name: 'TechCorp',
    logo: '/partners/techcorp.svg',
    type: 'Enterprise',
    hires: '50+',
    description: 'Leading technology solutions provider with a focus on cloud computing and AI.',
  },
  {
    name: 'InnovateLabs',
    logo: '/partners/innovatelabs.svg',
    type: 'Startup',
    hires: '20+',
    description: 'Innovative startup studio working on cutting-edge web3 and AI projects.',
  },
  {
    name: 'GlobalTech',
    logo: '/partners/globaltech.svg',
    type: 'Enterprise',
    hires: '100+',
    description: 'Global technology consulting firm specializing in digital transformation.',
  },
  {
    name: 'FutureSoft',
    logo: '/partners/futuresoft.svg',
    type: 'Scale-up',
    hires: '30+',
    description: 'Rapidly growing software company focused on enterprise solutions.',
  },
];

const stats = [
  {
    icon: Building2,
    value: '100+',
    label: 'Partner Companies',
    color: 'text-primary-600 dark:text-primary-400',
    bgColor: 'bg-primary-100 dark:bg-primary-900/20',
  },
  {
    icon: Users,
    value: '500+',
    label: 'Students Placed',
    color: 'text-secondary-600 dark:text-secondary-400',
    bgColor: 'bg-secondary-100 dark:bg-secondary-900/20',
  },
  {
    icon: Trophy,
    value: '95%',
    label: 'Placement Rate',
    color: 'text-accent-600 dark:text-accent-400',
    bgColor: 'bg-accent-100 dark:bg-accent-900/20',
  },
];

const PartnerCard = ({ partner, index }: { partner: typeof partners[0]; index: number }) => {
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
      className="group relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 dark:shadow-primary-500/5"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-6 space-y-6">
        <div className="w-full h-16 relative flex items-center justify-center rounded-lg bg-muted/30 overflow-hidden group-hover:bg-muted/50 transition-colors duration-300">
          <Image
            src={partner.logo}
            alt={partner.name}
            width={120}
            height={40}
            className="object-contain filter dark:invert-[.85] opacity-90 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105"
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-foreground">{partner.name}</h3>
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300">
              {partner.type}
            </span>
          </div>
          <p className="text-sm text-muted-foreground/90">{partner.description}</p>
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div>
              <p className="text-sm font-semibold text-foreground">{partner.hires}</p>
              <p className="text-xs text-muted-foreground">Students Hired</p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group/btn inline-flex items-center justify-center w-9 h-9 rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-300"
              type="button"
              aria-label="View partner details"
            >
              <ArrowRight className="w-4 h-4 transform group-hover/btn:translate-x-0.5 transition-transform duration-300" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const StatCard = ({ stat }: { stat: typeof stats[0] }) => {
  const Icon = stat.icon;

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
          <Icon className={`w-7 h-7 ${stat.color}`} />
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
            Trusted by{' '}
            <span className="text-gradient bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </motion.h2>
          <motion.p style={{ y }} transition={{ delay: 0.1 }} className="mt-6 text-lg text-muted-foreground">
            Partner with leading tech companies that value our graduates and provide exceptional career opportunities.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {stats.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <PartnerCard key={partner.name} partner={partner} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default PartnerShowcase;
