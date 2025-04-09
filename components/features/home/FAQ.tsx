'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';
import { useState, useRef } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'program' | 'financial' | 'career' | 'general';
}

const faqs: FAQItem[] = [
  {
    question: 'How does the cooperative education model work?',
    answer:
      'Our model is structured in three tiers. In Tier 1, you pay for foundational education. In Tier 2, you transition to earning income through project participation while continuing your education. By Tier 3, you\'re earning more as you work on advanced projects and take on leadership roles.',
    category: 'financial',
  },
  {
    question: 'What are the program prerequisites?',
    answer:
      'No formal experience is needed to start. We look for strong problem-solving, commitment, and basic computer skills. Each tier builds on the one before it.',
    category: 'program',
  },
  {
    question: 'How long does it take to complete each tier?',
    answer:
      'Foundation Builder (Tier 1) is designed to take 2-3 months. Skill Accelerator (Tier 2) takes 3-4 months, and Professional Developer (Tier 3) takes 4-6 months. Progress is competency-based, so you can advance at your own pace.',
    category: 'program',
  },
  {
    question: 'What kind of job support do you provide?',
    answer:
      'Career support includes portfolio reviews, resume help, interview prep, and connections to hiring partners. We help you land a role during and after completing the program.',
    category: 'career',
  },
  {
    question: 'Are there financing options available for Tier 1?',
    answer:
      'Yes — we plan to offer payment plans and scholarships for Tier 1. Remember that you\'ll start earning income in Tier 2, which helps offset your initial investment.',
    category: 'financial',
  },
  {
    question: 'What technologies and skills will I learn?',
    answer:
      'You\'ll learn HTML, CSS, JavaScript, React, Node.js, AI, robotics, and more depending on your chosen track. Soft skills, dev workflows, and industry tools are also included. Our curriculum is regularly updated to match industry demands.',
    category: 'program',
  },
  {
    question: 'Can I participate while working full-time?',
    answer:
      'Yes! The program is designed so learners can maintain full-time jobs during Tier 1. Later tiers may require more time as project commitments increase, but the schedule remains flexible.',
    category: 'general',
  },
  {
    question: 'What makes Innovation Bootcamp University different?',
    answer:
      'Our cooperative education approach bridges the gap between education and employment. You\'ll get hands-on experience with real projects and start earning while still learning, providing a practical pathway into the tech industry.',
    category: 'general',
  },
];

const FAQItem = ({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) => (
  <motion.div 
    initial={false} 
    className="border-b border-border last:border-none"
  >
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.01, x: 2 }}
      whileTap={{ scale: 0.99 }}
      className="flex w-full items-center justify-between py-6 text-left text-foreground hover:text-primary-500 focus:outline-none transition-all duration-200"
    >
      <motion.span 
        animate={{ color: isOpen ? 'var(--primary-500)' : 'inherit' }}
        className="text-lg font-medium pr-8"
      >
        {item.question}
      </motion.span>
      <motion.div
        initial={false}
        animate={{ 
          rotate: isOpen ? 180 : 0,
          backgroundColor: isOpen ? 'var(--primary-500)' : 'var(--primary-100)',
        }}
        transition={{ duration: 0.2 }}
        className={`h-6 w-6 rounded-full flex items-center justify-center ${
          isOpen ? 'text-white dark:text-white' : 'text-primary-500 dark:text-primary-400'
        }`}
      >
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    </motion.button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: 'auto', 
            opacity: 1,
            transition: {
              height: { duration: 0.3 },
              opacity: { duration: 0.2, delay: 0.1 },
            },
          }}
          exit={{ 
            height: 0, 
            opacity: 0,
            transition: {
              height: { duration: 0.3 },
              opacity: { duration: 0.2 },
            },
          }}
          className="overflow-hidden"
        >
          <motion.p 
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="pb-6 text-muted-foreground leading-relaxed"
          >
            {item.answer}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<FAQItem['category'] | 'all'>('all');
  const containerRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [50, 0]);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'program', label: 'Program' },
    { id: 'financial', label: 'Financial' },
    { id: 'career', label: 'Career' },
    { id: 'general', label: 'General' },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setOpenIndex(null); // Close all FAQs when searching
  };

  const clearSearch = () => {
    setSearchQuery('');
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  return (
    <section ref={containerRef} className="relative overflow-hidden py-32">
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
        <div className="mx-auto max-w-2xl text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6 border border-primary-200/20 backdrop-blur-sm"
          >
            <HelpCircle className="w-4 h-4 mr-2" /> Got Questions?
          </motion.div>

          <motion.h2 style={{ y }} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
            Frequently Asked <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">Questions</span>
          </motion.h2>
          <motion.p style={{ y }} className="text-lg text-muted-foreground leading-relaxed">
            Find answers to the most common questions about our program, financing, and career support.
          </motion.p>
        </div>

        <motion.div style={{ y }} className="mt-12 space-y-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <motion.input
              ref={searchRef}
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={handleSearch}
              whileFocus={{ scale: 1.01 }}
              className="w-full rounded-xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-12 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
            />
            {searchQuery && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary-500"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            )}
          </div>

          <motion.div 
            layout
            className="flex flex-wrap gap-3"
          >
            {categories.map((category) => (
              <motion.button
                key={category.id}
                layout
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setActiveCategory(category.id as FAQItem['category'] | 'all');
                  setOpenIndex(null);
                }}
                className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-200/10 backdrop-blur-sm'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div 
          layout
          style={{ y }} 
          className="mt-12 rounded-2xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 shadow-xl"
        >
          <AnimatePresence mode="wait">
            {filteredFaqs.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {filteredFaqs.map((faq, index) => (
                  <FAQItem 
                    key={index} 
                    item={faq} 
                    isOpen={openIndex === index} 
                    onToggle={() => setOpenIndex(openIndex === index ? null : index)} 
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="py-12 text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-500 mb-4"
                >
                  <HelpCircle className="w-8 h-8" />
                </motion.div>
                <p className="text-lg text-muted-foreground">
                  No questions found matching your search.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </section>
  );
}