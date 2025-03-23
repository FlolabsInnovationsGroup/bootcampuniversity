'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import Image from 'next/image';
import { useRef, useState } from 'react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
  program: string;
  delay: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Frontend Developer',
    company: 'TechCorp Solutions',
    image: '/testimonials/sarah.jpg',
    content: 'The structured learning approach and real-world projects at Innovation Bootcamp gave me the confidence to transition into tech. Within 3 months of graduating, I landed my dream role as a frontend developer.',
    rating: 5,
    program: 'Foundation Builder',
    delay: 0.1,
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Full Stack Engineer',
    company: 'InnovateTech',
    image: '/testimonials/michael.jpg',
    content: 'The earn-while-you-learn model was perfect for me. I could focus on learning without financial stress, and the practical experience I gained was invaluable in securing my current position.',
    rating: 5,
    program: 'Skill Accelerator',
    delay: 0.2,
  },
  {
    id: 3,
    name: 'Emily Thompson',
    role: 'Senior Developer',
    company: 'Global Systems Inc',
    image: '/testimonials/emily.jpg',
    content: "The mentorship and industry connections provided by Innovation Bootcamp were exceptional. The program fast-tracked my career progression, and I'm now leading development teams.",
    rating: 5,
    program: 'Professional Developer',
    delay: 0.3,
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
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
      className="group relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 dark:shadow-primary-500/5 p-8"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative">
        {/* Quote icon */}
        <motion.div 
          whileHover={{ scale: 1.1, rotate: -10 }}
          className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg"
        >
          <Quote className="h-7 w-7" />
        </motion.div>

        {/* Content */}
        <p className="mb-6 text-lg text-muted-foreground/90">
          "{testimonial.content}"
        </p>

        {/* Rating */}
        <div className="mb-6 flex space-x-1">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.2 }}
            >
              <Star className="h-5 w-5 fill-primary-500 text-primary-500" />
            </motion.div>
          ))}
        </div>

        {/* Author */}
        <div className="flex items-center gap-4">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative h-12 w-12 overflow-hidden rounded-xl shadow-md"
          >
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </motion.div>
          <div>
            <h4 className="font-bold text-foreground">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">
              {testimonial.role} at {testimonial.company}
            </p>
            <p className="text-sm font-medium bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              {testimonial.program} Graduate
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SuccessMetric = ({ value, label }: { value: string; label: string }) => {
  const metricRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: metricRef,
    offset: ["start end", "end start"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <motion.div 
      ref={metricRef}
      style={{ scale, opacity }}
      whileHover={{ scale: 1.05 }}
      className="relative overflow-hidden rounded-xl bg-card p-6 shadow-lg hover:shadow-xl transition-all duration-300 dark:shadow-primary-500/5 text-center"
    >
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br from-primary-500/5 to-secondary-500/5 opacity-40 blur-3xl transition-all duration-500" />
      <div className="relative">
        <div className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent sm:text-4xl">
          {value}
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          {label}
        </div>
      </div>
    </motion.div>
  );
};

export default function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  const successMetrics = [
    { value: '95%', label: 'Employment Rate' },
    { value: '$75K', label: 'Average Starting Salary' },
    { value: '500+', label: 'Successful Graduates' },
    { value: '50+', label: 'Partner Companies' },
  ];

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
            Success Stories from Our{' '}
            <span className="text-gradient bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Graduates
            </span>
          </motion.h2>
          <motion.p
            style={{ y }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Discover how our program has transformed careers and lives. Our graduates are now working at leading tech companies worldwide.
          </motion.p>
        </div>

        {/* Success Metrics */}
        <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">
          {successMetrics.map((metric, index) => (
            <SuccessMetric key={index} {...metric} />
          ))}
        </div>

        {/* Testimonials grid */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </motion.div>
    </section>
  );
} 