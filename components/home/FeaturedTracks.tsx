'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code, Brain, Bot, ArrowRight, Users, Clock } from 'lucide-react';

const tracks = [
  {
    icon: Code,
    name: 'Web Development',
    description: 'Master full-stack development with modern frameworks and cloud technologies.',
    students: 234,
    duration: '24 weeks',
    color: 'primary',
    technologies: ['React', 'Node.js', 'AWS', 'TypeScript']
  },
  {
    icon: Brain,
    name: 'AI & Machine Learning',
    description: 'Build intelligent systems and models using cutting-edge AI technologies.',
    students: 189,
    duration: '28 weeks',
    color: 'secondary',
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'OpenAI']
  },
  {
    icon: Bot,
    name: 'Robotics Engineering',
    description: 'Develop autonomous systems and smart robotics solutions.',
    students: 156,
    duration: '32 weeks',
    color: 'accent',
    technologies: ['ROS', 'C++', 'Computer Vision', 'Arduino']
  }
];

const TrackCard = ({ track, index }: { track: typeof tracks[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  const Icon = track.icon;

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      className="relative group"
    >
      <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white dark:bg-slate-800/90 rounded-2xl p-8 shadow-lg hover:shadow-xl border border-slate-200/10 backdrop-blur-sm overflow-hidden"
      >
        {/* Hover gradient effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/0 via-secondary-500/0 to-accent-500/0 group-hover:from-primary-500/5 group-hover:via-secondary-500/5 group-hover:to-accent-500/5 transition-colors duration-500" />
        
        <div className="relative">
          {/* Header */}
          <motion.div 
            whileHover={{ scale: 1.1, rotate: -5 }}
            className={`w-14 h-14 rounded-xl flex items-center justify-center bg-${track.color}-100 dark:bg-${track.color}-900/30 shadow-lg mb-6`}
          >
            <Icon className={`w-7 h-7 text-${track.color}-500 dark:text-${track.color}-400`} />
          </motion.div>

          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            {track.name}
          </h3>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
            {track.description}
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 mb-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2"
            >
              <Users className="w-5 h-5 text-slate-400" />
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                {track.students} students
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

          {/* Technologies */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {track.technologies.map((tech, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium bg-${track.color}-100 dark:bg-${track.color}-900/30 text-${track.color}-600 dark:text-${track.color}-400 border border-${track.color}-200/10 backdrop-blur-sm`}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.02 }}>
            <Link
              href={`/tracks/${track.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={`inline-flex items-center justify-center w-full px-4 py-3 rounded-xl bg-${track.color}-100 dark:bg-${track.color}-900/30 text-${track.color}-600 dark:text-${track.color}-400 hover:bg-${track.color}-200 dark:hover:bg-${track.color}-900/50 transition-all duration-200 font-medium backdrop-blur-sm border border-${track.color}-200/10`}
            >
              Explore track
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
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
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  return (
    <section ref={containerRef} className="relative py-32 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.03]" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-secondary-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-accent-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>
      
      <motion.div 
        style={{ opacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
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
            Choose your path and master in-demand skills with our specialized learning tracks,
            designed to meet industry needs.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {tracks.map((track, index) => (
            <TrackCard key={index} track={track} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default FeaturedTracks;