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
    answer: 'Our unique model allows you to earn income while developing your skills. As you progress through the program, you\'ll work on real client projects, receiving compensation based on your tier level and project contributions. This helps offset the cost of education while building practical experience.',
    category: 'financial',
  },
  {
    question: 'What are the program prerequisites?',
    answer: 'While no formal coding experience is required for our Foundation Builder program, we look for candidates who demonstrate strong problem-solving abilities, commitment to learning, and basic computer proficiency. Each tier has specific requirements that build upon the previous level.',
    category: 'program',
  },
  {
    question: 'How long does it take to complete each tier?',
    answer: 'The Foundation Builder tier typically takes 3 months, while both the Skill Accelerator and Professional Developer tiers take 6 months each. However, progression is based on competency rather than fixed timeframes, allowing students to advance at their own pace.',
    category: 'program',
  },
  {
    question: 'What kind of job support do you provide?',
    answer: 'We offer comprehensive career support including resume building, interview preparation, portfolio development, and direct connections with our industry partners. Our career services team works with you throughout the program and after graduation to help secure relevant opportunities.',
    category: 'career',
  },
  {
    question: 'Are there financing options available?',
    answer: 'Yes, we offer various financing options including income share agreements, monthly payment plans, and scholarships for eligible candidates. Our earn-while-you-learn model also helps offset costs through project-based compensation.',
    category: 'financial',
  },
  {
    question: 'What technologies and skills will I learn?',
    answer: 'Our curriculum covers in-demand technologies including HTML, CSS, JavaScript, React, Node.js, and more. You\'ll also learn essential soft skills, development practices, and industry tools. The curriculum is regularly updated based on industry trends and employer needs.',
    category: 'program',
  },
  {
    question: 'Can I participate while working full-time?',
    answer: 'Yes, our program is designed to be flexible. Many students maintain full-time jobs while completing the Foundation Builder tier. As you progress to higher tiers, you may need to adjust your schedule as the workload and project commitments increase.',
    category: 'general',
  },
  {
    question: 'What makes Innovation Bootcamp different?',
    answer: 'Our program stands out through our tiered progression system, earn-while-you-learn model, and direct industry connections. We focus on practical skills development through real projects, providing both education and professional experience simultaneously.',
    category: 'general',
  },
];

const FAQItem = ({ item, isOpen, onToggle }: { 
  item: FAQItem; 
  isOpen: boolean; 
  onToggle: () => void;
}) => (
  <motion.div
    initial={false}
    className="border-b border-slate-200/10 last:border-none"
  >
    <motion.button
      onClick={onToggle}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className="flex w-full items-center justify-between py-6 text-left text-foreground hover:text-primary-500 focus:outline-none transition-colors duration-200"
    >
      <span className="text-lg font-medium pr-8">{item.question}</span>
      <motion.div
        initial={false}
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className={`h-6 w-6 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center ${
          isOpen ? 'text-primary-500' : 'text-primary-400'
        }`}
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
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="pb-6 text-muted-foreground leading-relaxed">
            {item.answer}
          </p>
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
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

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

  return (
    <section ref={containerRef} className="relative overflow-hidden py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.03]" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-secondary-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-1/2 w-96 h-96 bg-accent-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
      </div>

      <motion.div 
        style={{ opacity }}
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center mb-20">
          <motion.div
            style={{ y }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6 border border-primary-200/20 backdrop-blur-sm"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Got Questions?
          </motion.div>

          <motion.h2
            style={{ y }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6"
          >
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent">
              Questions
            </span>
          </motion.h2>
          <motion.p
            style={{ y }}
            className="text-lg text-muted-foreground leading-relaxed"
          >
            Find answers to common questions about our program, financing options, and career support.
          </motion.p>
        </div>

        {/* Search and filters */}
        <motion.div 
          style={{ y }}
          className="mt-12 space-y-6"
        >
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

        {/* FAQ list */}
        <motion.div
          style={{ y }}
          className="mt-12 rounded-2xl border border-slate-200/10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-8 shadow-xl"
        >
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <FAQItem
                key={index}
                item={faq}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-8 text-center text-muted-foreground"
            >
              No questions found matching your search.
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
} 