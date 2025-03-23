"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company?: string;
  track?: string;
  initials: string;
  gradientFrom: string;
  gradientTo: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "The tiered approach really helped me transition from learning to earning. I started with the bootcamp and now I'm in the apprenticeship program while building real projects for clients.",
    name: "Sarah Johnson",
    role: "Apprentice Developer",
    track: "Web Development",
    initials: "SJ",
    gradientFrom: "from-primary-500",
    gradientTo: "to-secondary-500"
  },
  {
    id: '2',
    quote: "As someone changing careers, I was worried about the cost of bootcamps. Innovation Bootcamp University made it affordable to learn, and now I'm actually getting paid while I continue to develop my skills.",
    name: "Michael Chen",
    role: "AI Engineering Apprentice",
    track: "AI & Machine Learning",
    initials: "MC",
    gradientFrom: "from-secondary-500",
    gradientTo: "to-accent-500"
  },
  {
    id: '3',
    quote: "The combination of theory through industry platforms like GitHub and AWS, with the practical experience on real projects gave me exactly what I needed to start my tech career.",
    name: "Jessica Martinez",
    role: "Junior Robotics Engineer",
    track: "Robotics",
    initials: "JM",
    gradientFrom: "from-accent-500",
    gradientTo: "to-primary-500"
  },
];

const TestimonialCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      changeSlide((activeIndex + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const changeSlide = (newIndex: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveIndex(newIndex);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  const goToPrev = () => {
    changeSlide((activeIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    changeSlide((activeIndex + 1) % testimonials.length);
  };

  return (
    <section className="relative bg-white dark:bg-slate-900 py-20 md:py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-b from-primary-50 to-primary-100 dark:from-primary-900/10 dark:to-primary-800/5 blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] translate-y-1/3 -translate-x-1/3 rounded-full bg-gradient-to-t from-secondary-50 to-secondary-100 dark:from-secondary-900/10 dark:to-secondary-800/5 blur-3xl opacity-40" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-urbanist-text font-extrabold tracking-tight mb-6">
            <span className="text-slate-900 dark:text-white">What Our </span>
            <span className="bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent">Students Say</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-300">
            Hear from students who have transformed their careers through our tiered learning program.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial cards carousel */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="flex-shrink-0 w-full px-4">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl shadow-lg p-8 md:p-10 relative border border-slate-100 dark:border-slate-700">
                    {/* Quote mark decoration */}
                    <div className="absolute -top-6 -left-2 transform -rotate-12">
                      <div className="bg-primary-100 dark:bg-primary-900/30 text-primary-500 dark:text-primary-400 rounded-full p-3">
                        <Quote className="w-6 h-6" />
                      </div>
                    </div>
                    
                    <p className="text-slate-700 dark:text-slate-200 text-lg md:text-xl leading-relaxed mb-8 italic">
                      "{testimonial.quote}"
                    </p>
                    
                    <div className="flex items-center">
                      <div className={`h-14 w-14 rounded-full flex items-center justify-center text-white font-semibold text-lg bg-gradient-to-br ${testimonial.gradientFrom} ${testimonial.gradientTo}`}>
                        {testimonial.initials}
                      </div>
                      <div className="ml-4">
                        <h4 className="font-bold text-lg text-slate-900 dark:text-white">{testimonial.name}</h4>
                        <div className="text-slate-600 dark:text-slate-300 flex flex-wrap items-center gap-x-2">
                          <span>{testimonial.role}</span>
                          {testimonial.track && (
                            <>
                              <span className="inline-block w-1 h-1 bg-primary-400 dark:bg-primary-500 rounded-full"></span>
                              <span className="font-medium text-primary-600 dark:text-primary-400">{testimonial.track}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => changeSlide(index)}
                className={`h-2.5 transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                  index === activeIndex 
                    ? 'w-8 bg-primary-500 dark:bg-primary-400' 
                    : 'w-2.5 bg-slate-300 dark:bg-slate-600 hover:bg-primary-300 dark:hover:bg-primary-700'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={goToPrev}
            className="absolute top-1/2 -left-5 md:-left-10 transform -translate-y-1/2 bg-white dark:bg-slate-800 rounded-full p-3 shadow-lg hover:shadow-xl border border-slate-100 dark:border-slate-700 text-slate-500 hover:text-primary-500 dark:text-slate-300 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-all duration-200"
            aria-label="Previous testimonial"
            disabled={isAnimating}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 -right-5 md:-right-10 transform -translate-y-1/2 bg-white dark:bg-slate-800 rounded-full p-3 shadow-lg hover:shadow-xl border border-slate-100 dark:border-slate-700 text-slate-500 hover:text-primary-500 dark:text-slate-300 dark:hover:text-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-all duration-200"
            aria-label="Next testimonial"
            disabled={isAnimating}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;