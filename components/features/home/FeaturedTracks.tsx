'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Brain, Bot, ArrowRight, Users, Clock, Briefcase } from 'lucide-react';

type ColorType = 'primary' | 'secondary' | 'accent';

const colorClasses: Record<ColorType, { bg: string; text: string; border: string }> = {
  primary: {
    bg: 'bg-primary-100 dark:bg-primary-900/30',
    text: 'text-primary-600 dark:text-primary-400',
    border: 'border-primary-200/10'
  },
  secondary: {
    bg: 'bg-secondary-100 dark:bg-secondary-900/30',
    text: 'text-secondary-600 dark:text-secondary-400',
    border: 'border-secondary-200/10'
  },
  accent: {
    bg: 'bg-accent-100 dark:bg-accent-900/30',
    text: 'text-accent-600 dark:text-accent-400',
    border: 'border-accent-200/10'
  }
};

const tracks = [
  {
    icon: Code,
    name: 'Web Development',
    description: 'Master full-stack development with modern frameworks and cloud technologies. Graduate with a job-ready portfolio and GitHub presence.',
    students: 45,
    duration: '24 weeks',
    color: 'primary' as ColorType,
    technologies: ['React', 'Node.js', 'AWS', 'TypeScript'],
    outcomes: ['Frontend Developer', 'Full Stack Engineer']
  },
  {
    icon: Brain,
    name: 'AI & Machine Learning',
    description: 'Build intelligent systems using Python, TensorFlow, and OpenAI. Prepare for in-demand roles in AI-driven companies.',
    students: 35,
    duration: '28 weeks',
    color: 'secondary' as ColorType,
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI'],
    outcomes: ['Machine Learning Engineer', 'AI Research Assistant']
  },
  {
    icon: Bot,
    name: 'Robotics Engineering',
    description: 'Create autonomous systems with real hardware integration. Focus on problem-solving and industry readiness.',
    students: 30,
    duration: '32 weeks',
    color: 'accent' as ColorType,
    technologies: ['ROS', 'C++', 'Computer Vision', 'Arduino'],
    outcomes: ['Robotics Engineer', 'Embedded Systems Developer']
  }
];

const TrackCard = ({ track }: { track: typeof tracks[0] }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'end start']
  });

  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const Icon = track.icon;
  const styles = colorClasses[track.color];

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className="relative group"
    >
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white/90 dark:bg-slate-800/90 rounded-2xl p-8 shadow-lg hover:shadow-xl border border-slate-200/20 dark:border-slate-700/20 backdrop-blur-sm overflow-hidden"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/0 via-secondary-500/0 to-accent-500/0 group-hover:from-primary-500/10 group-hover:via-secondary-500/10 group-hover:to-accent-500/10 transition-colors duration-500" />

        <div className="relative">
          <motion.div 
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ duration: 0.2 }}
            className={`w-14 h-14 rounded-xl flex items-center justify-center ${styles.bg} shadow-lg mb-6 group-hover:shadow-xl transition-all duration-300`}
          >
            <Icon className={`w-7 h-7 ${styles.text} transition-transform duration-300 group-hover:scale-110`} />
          </motion.div>

          <motion.h3 
            className="text-2xl font-bold text-slate-900 dark:text-white mb-3"
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
          >
            {track.name}
          </motion.h3>

          <p className="text-base text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            {track.description}
          </p>

          <div className="flex items-center gap-6 mb-6">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Users className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {track.students}+ initial capacity
              </span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Clock className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {track.duration}
              </span>
            </motion.div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {track.technologies.map((tech, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${styles.bg} ${styles.text} ${styles.border} backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300`}
              >
                {tech}
              </motion.span>
            ))}
          </div>

          <div className="mb-6">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">Career Paths:</p>
            <ul className="space-y-2">
              {track.outcomes.map((role, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="flex items-start text-sm text-slate-600 dark:text-slate-300"
                >
                  <Briefcase className="w-4 h-4 mr-2 mt-0.5 text-primary-500" />
                  {role}
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="group/button"
          >
            <Link
              href={`/tracks/${track.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={`inline-flex items-center justify-center w-full px-4 py-3 rounded-xl ${styles.bg} ${styles.text} hover:opacity-90 transition-all duration-200 font-medium backdrop-blur-sm ${styles.border} hover:shadow-lg`}
            >
              Explore track
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover/button:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FeaturedTracks = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    <section ref={containerRef} className="relative py-32 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.03]" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-secondary-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-accent-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <motion.div style={{ opacity }} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.h2
            style={{ y }}
            className="text-4xl md:text-5xl lg:text-6xl font-urbanist-text font-extrabold tracking-tight mb-6"
          >
            <span className="text-slate-900 dark:text-white">Specialized </span>
            <span className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">
              Learning Tracks
            </span>
          </motion.h2>
          <motion.p
            style={{ y }}
            className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300 leading-relaxed"
          >
            Choose your path and master in-demand skills with our specialized learning tracks, designed to meet industry needs and launch your career forward.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {tracks.map((track) => (
            <TrackCard key={track.name} track={track} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedTracks;