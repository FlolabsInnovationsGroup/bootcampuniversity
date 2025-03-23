"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Software Engineer at TechCorp',
    image: '/testimonials/sarah.jpg',
    quote: 'The program completely transformed my career. I went from zero coding experience to landing a full-stack role at TechCorp in just 6 months.',
    rating: 5,
    company: {
      name: 'TechCorp',
      logo: '/partners/techcorp.svg'
    }
  },
  {
    id: 2,
    name: 'Michael Rodriguez',
    role: 'Frontend Developer at InnovateLabs',
    image: '/testimonials/michael.jpg',
    quote: 'The hands-on experience and mentorship were invaluable. I learned more in this program than I did in 4 years of college.',
    rating: 5,
    company: {
      name: 'InnovateLabs',
      logo: '/partners/innovatelabs.svg'
    }
  },
  {
    id: 3,
    name: 'Emily Thompson',
    role: 'Full Stack Developer at GlobalTech',
    image: '/testimonials/emily.jpg',
    quote: 'The co-op model is brilliant. I was earning while learning, and it made the transition to a full-time role completely seamless.',
    rating: 5,
    company: {
      name: 'GlobalTech',
      logo: '/partners/globaltech.svg'
    }
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative overflow-hidden rounded-xl bg-card shadow-lg hover:shadow-xl transition-all duration-300 dark:shadow-primary-500/5 p-8 md:p-10"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-secondary-500/5" />
      
      {/* Quote icon */}
      <div className="absolute -top-5 left-8">
        <motion.div 
          whileHover={{ scale: 1.1, rotate: -10 }}
          className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center shadow-lg"
        >
          <Quote className="w-6 h-6 text-white" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative pt-6">
        {/* Rating */}
        <div className="flex space-x-1 mb-6">
          {Array.from({ length: testimonial.rating }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1, duration: 0.2 }}
            >
              <Star
                className="w-5 h-5 text-yellow-400 fill-current"
              />
            </motion.div>
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-lg md:text-xl text-foreground/90 mb-8 font-medium">
          "{testimonial.quote}"
        </blockquote>

        {/* Author */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="relative w-12 h-12 rounded-xl overflow-hidden shadow-md"
            >
              <Image
                src={testimonial.image}
                alt={testimonial.name}
                fill
                className="object-cover"
              />
            </motion.div>
            <div>
              <h4 className="font-bold text-foreground">
                {testimonial.name}
              </h4>
              <p className="text-sm text-muted-foreground">
                {testimonial.role}
              </p>
            </div>
          </div>

          {/* Company logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="relative w-24 h-8 opacity-90 hover:opacity-100 transition-opacity"
          >
            <Image
              src={testimonial.company.logo}
              alt={testimonial.company.name}
              fill
              className="object-contain filter dark:invert-[.85]"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setCurrentIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [autoplay]);

  const handlePrevious = () => {
    setAutoplay(false);
    setCurrentIndex((current) => 
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const handleNext = () => {
    setAutoplay(false);
    setCurrentIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section ref={containerRef} className="relative overflow-hidden py-24 sm:py-32">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.03]" />
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary-50/20 via-primary-50/10 to-transparent dark:from-primary-950/20 dark:via-primary-950/10" />
      <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-secondary-50/20 via-secondary-50/10 to-transparent dark:from-secondary-950/20 dark:via-secondary-950/10" />

      <motion.div 
        style={{ opacity }}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2
            style={{ y }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
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
            Hear from our graduates who have successfully transitioned into
            rewarding tech careers.
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <TestimonialCard key={currentIndex} testimonial={testimonials[currentIndex]} />
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0">
            <div className="flex justify-between">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handlePrevious}
                className="transform -translate-x-6 w-12 h-12 rounded-xl bg-card shadow-lg flex items-center justify-center text-muted-foreground hover:text-primary-500 hover:shadow-xl dark:shadow-primary-500/5 transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleNext}
                className="transform translate-x-6 w-12 h-12 rounded-xl bg-card shadow-lg flex items-center justify-center text-muted-foreground hover:text-primary-500 hover:shadow-xl dark:shadow-primary-500/5 transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setAutoplay(false);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary-500 scale-110'
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