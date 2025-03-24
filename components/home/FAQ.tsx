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
    question: 'How does the earn-while-you-learn model work?',
    answer:
      'You earn income by working on real client projects while you learn. Compensation is based on your tier level and contributions, helping offset education costs while gaining practical experience.',
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
      'Foundation Builder takes ~3 months. Skill Accelerator and Professional Developer take ~6 months each. Progress is competency-based, so you can go at your own pace.',
    category: 'program',
  },
  {
    question: 'What kind of job support do you provide?',
    answer:
      'Career support includes portfolio reviews, resume help, interview prep, and direct connections to hiring partners. We help you land a role during and after the program.',
    category: 'career',
  },
  {
    question: 'Are there financing options available?',
    answer:
      'Yes — we offer income share agreements, monthly plans, and scholarships. You can also earn money through project-based compensation as you learn.',
    category: 'financial',
  },
  {
    question: 'What technologies and skills will I learn?',
    answer:
      'You’ll learn HTML, CSS, JavaScript, React, Node.js, and more. Soft skills, dev workflows, and industry tools are also included. The curriculum is updated often.',
    category: 'program',
  },
  {
    question: 'Can I participate while working full-time?',
    answer:
      'Yes! Many learners keep full-time jobs during Foundation Builder. Later tiers may require more time due to project commitments.',
    category: 'general',
  },
  {
    question: 'What makes Innovation Bootcamp different?',
    answer:
      'Tiered progression, project-based learning, and real income while learning. You get practical experience, industry exposure, and job-ready skills from day one.',
    category: 'general',
  },
];

const FAQItem = ({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) => (
  <motion.div initial={false} className="border-b border-border last:border-none">
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="flex w-full items-center justify-between py-6 text-left text-foreground hover:text-primary focus:outline-none transition-colors duration-200"
    >
      <span className="text-lg font-medium pr-8">{item.question}</span>
      <motion.div
        initial={false}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className={`h-6 w-6 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center ${isOpen ? 'text-primary-500' : 'text-primary-400'}`}
      >
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    </motion.button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <p className="pb-6 text-muted-foreground leading-relaxed">{item.answer}</p>
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
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section ref={containerRef} className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.03]" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      <motion.div style={{ opacity }} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-20">
          <motion.div
            style={{ y }}
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
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm px-12 py-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category.id as FAQItem['category'] | 'all')}
                className={`rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/80 border border-slate-200/10 backdrop-blur-sm'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <motion.div style={{ y }} className="mt-12 rounded-2xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 shadow-xl">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <FAQItem key={index} item={faq} isOpen={openIndex === index} onToggle={() => setOpenIndex(openIndex === index ? null : index)} />
            ))
          ) : (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center text-muted-foreground">
              No questions found matching your search.
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}