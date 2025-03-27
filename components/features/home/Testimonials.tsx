'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'David Park',
    role: 'Tech Lead',
    company: 'TechCorp Solutions',
    image: '/testimonials/sarah.jpg',
    content: 'The curriculum and hands-on approach designed by Innovation Bootcamp aligns perfectly with what we look for in junior developers. We\'re excited to welcome their first cohort of students as interns.',
    rating: 5,
    program: 'Industry Partner',
  },
  {
    id: 2,
    name: 'Lisa Rodriguez',
    role: 'HR Director',
    company: 'InnovateTech',
    image: '/testimonials/michael.jpg',
    content: 'The Innovation Bootcamp model addresses the biggest challenge we face - finding entry-level talent with practical experience. We\'re proud to be an early partner in this initiative.',
    rating: 5,
    program: 'Hiring Partner',
  },
  {
    id: 3,
    name: 'Thomas Chen',
    role: 'Education Consultant',
    company: 'Future Skills Institute',
    image: '/testimonials/emily.jpg',
    content: "The program's focus on real-world projects and industry collaboration sets it apart from traditional learning paths. I've been impressed with their comprehensive curriculum design.",
    rating: 5,
    program: 'Education Advisor',
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: -20 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
    className="relative overflow-hidden rounded-xl bg-white/80 dark:bg-slate-800/80 shadow-lg hover:shadow-xl transition-all duration-300 dark:shadow-primary-500/5 backdrop-blur-sm p-8"
  >
    <motion.div 
      initial={{ opacity: 0.5, scale: 0.8 }}
      animate={{ opacity: 0.1, scale: 1.2 }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
      className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 blur-3xl"
    />
    <motion.div 
      initial={{ opacity: 0.5, scale: 0.8 }}
      animate={{ opacity: 0.1, scale: 1.2 }}
      transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 1.5 }}
      className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-gradient-to-br from-secondary-500 to-accent-500 blur-3xl"
    />
    
    <div className="relative">
      <motion.div
        whileHover={{ scale: 1.1, rotate: -10 }}
        whileTap={{ scale: 0.9, rotate: 0 }}
        className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg"
      >
        <Quote className="h-7 w-7" />
      </motion.div>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6 text-lg text-muted-foreground/90 leading-relaxed"
      >
        "{testimonial.content}"
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6 flex space-x-1"
      >
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.2, rotate: 180 }}
          >
            <Star className="h-5 w-5 fill-primary-500 text-primary-500" />
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center gap-4"
      >
        <motion.div
          whileHover={{ scale: 1.1, rotate: -5 }}
          className="relative h-12 w-12 overflow-hidden rounded-xl shadow-md"
        >
          <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <motion.h4 
            whileHover={{ x: 5 }}
            className="font-bold text-foreground"
          >
            {testimonial.name}
          </motion.h4>
          <motion.p 
            whileHover={{ x: 3 }}
            className="text-sm text-muted-foreground"
          >
            {testimonial.role} at {testimonial.company}
          </motion.p>
          <motion.p 
            whileHover={{ scale: 1.05 }}
            className="text-sm font-medium bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent"
          >
            {testimonial.program}
          </motion.p>
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
);

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  useEffect(() => {
    if (!autoplay) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoplay]);

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((current) => (current + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setAutoplay(false);
    setCurrentIndex((current) => (current === 0 ? testimonials.length - 1 : current - 1));
  };

  return (
    <section ref={containerRef} className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.03]" />
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/10 rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          className="absolute top-1/3 -right-20 w-96 h-96 bg-secondary-500/10 rounded-full mix-blend-multiply filter blur-3xl"
        />
      </div>

      <motion.div style={{ opacity }} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6 border border-primary-200/20 backdrop-blur-sm"
          >
            <Star className="w-4 h-4 mr-2" />
            Industry Feedback
          </motion.div>

          <motion.h2 style={{ y }} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            What{' '}
            <span className="text-gradient bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Industry Partners 
            </span>
            {' '}Say
          </motion.h2>
          <motion.p
            style={{ y }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Hear from the tech industry professionals who have helped shape our program.
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <TestimonialCard key={currentIndex} testimonial={testimonials[currentIndex]} />
          </AnimatePresence>

          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0">
            <div className="flex justify-between">
              <motion.button
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrev}
                className="transform -translate-x-6 w-12 h-12 rounded-xl bg-white/80 dark:bg-slate-800/80 shadow-lg flex items-center justify-center text-muted-foreground hover:text-primary-500 hover:shadow-xl dark:shadow-primary-500/5 transition-all duration-300 backdrop-blur-sm"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="transform translate-x-6 w-12 h-12 rounded-xl bg-white/80 dark:bg-slate-800/80 shadow-lg flex items-center justify-center text-muted-foreground hover:text-primary-500 hover:shadow-xl dark:shadow-primary-500/5 transition-all duration-300 backdrop-blur-sm"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>

          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setAutoplay(false);
                  setCurrentIndex(index);
                }}
                className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-500'
                    : 'bg-slate-300 dark:bg-slate-700 hover:bg-primary-300 dark:hover:bg-primary-800'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialCarousel;