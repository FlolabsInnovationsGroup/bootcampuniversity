'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Frontend Developer',
    company: 'TechCorp Solutions',
    image: '/testimonials/sarah.jpg',
    content: 'The structured learning approach and real-world projects at Innovation Bootcamp gave me the confidence to transition into tech. Within 3 months of graduating, I landed my dream role as a frontend developer.',
    rating: 5,
    program: 'Foundation Builder',
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
            {testimonial.program} Graduate
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
            Success Stories
          </motion.div>

          <motion.h2 style={{ y }} className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Success{' '}
            <span className="text-gradient bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Stories
            </span>
          </motion.h2>
          <motion.p
            style={{ y }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            Hear from our graduates who have successfully transitioned into rewarding tech careers.
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
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 scale-110'
                    : 'bg-primary-200 dark:bg-primary-800 hover:bg-primary-300 dark:hover:bg-primary-700'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TestimonialCarousel;