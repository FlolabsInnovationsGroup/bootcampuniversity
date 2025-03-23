"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X, GraduationCap, BookOpen, Users, Briefcase, Code, Search, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeSwitch } from '@/components/ui/ThemeSwitch';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const navLinks = [
    {
      name: 'Programs',
      href: '/tracks',
      icon: <BookOpen className="w-5 h-5 text-primary-500" />,
      dropdownContent: {
        feature: {
          title: "Explore our innovative learning paths",
          description: "Learn industry-relevant skills through our tiered approach that combines education with real-world experience.",
          cta: "View all programs",
          href: "/tracks",
        },
        sections: [
          {
            title: 'Learning Paths',
            items: [
              { name: 'AI & Machine Learning', description: 'Train models and build intelligent systems', href: '/tracks/ai-ml', icon: <BookOpen className="w-4 h-4" /> },
              { name: 'Robotics Engineering', description: 'Design and program autonomous systems', href: '/tracks/robotics', icon: <Code className="w-4 h-4" /> },
              { name: 'Full-Stack Development', description: 'Master frontend and backend technologies', href: '/tracks/full-stack', icon: <Code className="w-4 h-4" /> },
            ]
          },
          {
            title: 'Tiers',
            items: [
              { name: 'Bootcamp (Tier 1)', description: 'Begin your journey with foundational training', href: '/tiers/bootcamp', icon: <GraduationCap className="w-4 h-4" /> },
              { name: 'Apprenticeship (Tier 2)', description: 'Get paid while continuing your education', href: '/tiers/apprenticeship', icon: <Briefcase className="w-4 h-4" /> },
              { name: 'Advanced (Tier 3)', description: 'Refine your skills with advanced projects', href: '/tiers/advanced', icon: <Users className="w-4 h-4" /> },
            ]
          }
        ]
      }
    },
    {
      name: 'How It Works',
      href: '/how-it-works',
      icon: <GraduationCap className="w-5 h-5 text-primary-500" />,
      dropdownContent: {
        feature: {
          title: "Our Unique Educational Model",
          description: "Learn how our earn-while-you-learn approach combines theory with real-world projects and mentorship.",
          cta: "See our results",
          href: "/how-it-works",
        },
        sections: [
          {
            title: 'Our Process',
            items: [
              { name: 'Learning Model', description: 'Our project-based approach to education', href: '/how-it-works/model', icon: <BookOpen className="w-4 h-4" /> },
              { name: 'Earn While Learning', description: 'How you can get paid during your education', href: '/how-it-works/earn-learn', icon: <Briefcase className="w-4 h-4" /> },
              { name: 'Industry Partners', description: 'Companies that hire our graduates', href: '/how-it-works/partners', icon: <Users className="w-4 h-4" /> },
            ]
          },
          {
            title: 'Resources',
            items: [
              { name: 'Student Success Stories', description: 'See where our alumni are working now', href: '/success-stories', icon: <Users className="w-4 h-4" /> },
              { name: 'FAQ', description: 'Common questions about our program', href: '/faq', icon: <BookOpen className="w-4 h-4" /> },
              { name: 'Support', description: 'Get help with your application or courses', href: '/support', icon: <Users className="w-4 h-4" /> },
            ]
          }
        ]
      }
    },
    { 
      name: 'Co-ops', 
      href: '/internships',
      icon: <Briefcase className="w-5 h-5 text-primary-500" />,
    },
    { 
      name: 'Curriculum', 
      href: '/curriculum',
      icon: <Code className="w-5 h-5 text-primary-500" />,
    },
  ];

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.2, 
        ease: "easeOut" 
      } 
    },
    exit: { 
      opacity: 0, 
      y: -5, 
      scale: 0.98, 
      transition: { 
        duration: 0.1, 
        ease: "easeIn" 
      } 
    }
  };

  // Mobile menu animation variants
  const mobileMenuVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300 
      }
    },
    exit: { 
      x: '100%',
      transition: { 
        duration: 0.2, 
        ease: "easeIn" 
      } 
    }
  };

  return (
    <nav 
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-900/95 shadow-sm backdrop-blur-sm py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-500 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">IB</span>
              </div>
              <div className="flex flex-col">
                <span className="font-urbanist-text font-bold text-xl bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                  Innovation Bootcamp
                </span>
                <span className="text-sm text-slate-700 dark:text-slate-300 -mt-1 font-medium">University</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative">
                {link.dropdownContent ? (
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                    onMouseEnter={() => setActiveDropdown(link.name)}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeDropdown === link.name 
                        ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-400'
                        : 'text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                    }`}
                  >
                    <span>{link.name}</span>
                    <ChevronDown 
                      className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                        activeDropdown === link.name ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                  >
                    {link.name}
                  </Link>
                )}
                
                <AnimatePresence>
                  {link.dropdownContent && activeDropdown === link.name && (
                    <motion.div
                      variants={dropdownVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="absolute top-full left-0 z-20 w-screen max-w-[800px] rounded-lg bg-white dark:bg-slate-900 shadow-soft-xl border border-slate-100 dark:border-slate-800 mt-1 py-6 grid grid-cols-3 gap-4 overflow-hidden"
                    >
                      {/* Featured content */}
                      <div className="col-span-1 bg-primary-50 dark:bg-primary-900/20 p-6 flex flex-col justify-between h-full">
                        <div>
                          <h3 className="font-urbanist-text font-semibold text-lg font-semibold text-slate-900 dark:text-white mb-2">
                            {link.dropdownContent.feature.title}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            {link.dropdownContent.feature.description}
                          </p>
                        </div>
                        <Link 
                          href={link.dropdownContent.feature.href} 
                          className="btn-primary text-sm inline-flex items-center"
                        >
                          {link.dropdownContent.feature.cta}
                          <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                      </div>
                      
                      {/* Navigation sections */}
                      <div className="col-span-2 px-6 grid grid-cols-2 gap-8">
                        {link.dropdownContent.sections.map((section, idx) => (
                          <div key={idx} className="space-y-4">
                            <h3 className="font-urbanist-text font-semibold text-slate-900 dark:text-white text-sm">
                              {section.title}
                            </h3>
                            <ul className="space-y-2">
                              {section.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="group">
                                  <Link
                                    href={item.href}
                                    className="flex items-start p-2 -mx-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                    onClick={() => setActiveDropdown(null)}
                                  >
                                    <span className="flex-shrink-0 p-1 rounded-md text-primary-500 bg-primary-50 dark:bg-primary-900/30 mr-3 mt-0.5">
                                      {item.icon}
                                    </span>
                                    <div>
                                      <p className="text-slate-900 dark:text-white font-medium text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {item.name}
                                      </p>
                                      <p className="text-slate-500 dark:text-slate-400 text-xs">
                                        {item.description}
                                      </p>
                                    </div>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            
            {/* Search button */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2 text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {/* Theme toggle and Apply button */}
            <div className="hidden lg:flex items-center space-x-4">
              {/* Theme toggle */}
              <div className="flex items-center mr-2">
                <ThemeSwitch />
              </div>
              
              <Link
                href="/apply"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden space-x-3">
            <div className="mr-1">
              <ThemeSwitch />
            </div>
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-2 text-slate-500 hover:text-primary-600 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-slate-500 hover:text-primary-600 hover:bg-slate-50 transition-colors"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50"
              onClick={() => setSearchOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-4 inset-x-0 max-w-2xl mx-auto z-50 px-4"
            >
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-soft-xl overflow-hidden">
                <div className="flex items-center p-4">
                  <Search className="w-5 h-5 text-slate-400 mr-3" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search for courses, resources, and more..."
                    className="w-full border-none focus:ring-0 text-slate-900 dark:text-white dark:bg-slate-800 placeholder:text-slate-400"
                  />
                  <button
                    onClick={() => setSearchOpen(false)}
                    className="p-1 ml-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="border-t border-slate-100 dark:border-slate-700 px-4 py-3 text-xs text-slate-500 dark:text-slate-400">
                  Press ESC or click outside to close
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-slate-900 shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-6 min-h-full flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <Link 
                    href="/" 
                    className="flex items-center space-x-2" 
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-500 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">IB</span>
                    </div>
                  </Link>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="flex-grow">
                  <div className="space-y-7">
                    {navLinks.map((link) => (
                      <div key={link.name} className="space-y-3">
                        {link.dropdownContent ? (
                          <>
                            <div className="flex items-center">
                              {link.icon}
                              <span className="ml-2 font-urbanist-text font-semibold text-slate-900 dark:text-white">
                                {link.name}
                              </span>
                            </div>
                            
                            <div className="pl-7 space-y-6">
                              {link.dropdownContent.sections.map((section, idx) => (
                                <div key={idx} className="space-y-3">
                                  <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">
                                    {section.title}
                                  </h3>
                                  <ul className="space-y-3">
                                    {section.items.map((item, itemIdx) => (
                                      <li key={itemIdx}>
                                        <Link
                                          href={item.href}
                                          className="flex items-center text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 text-sm transition-colors"
                                          onClick={() => setIsMenuOpen(false)}
                                        >
                                          <span className="mr-2 text-primary-500">{item.icon}</span>
                                          {item.name}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <Link
                            href={link.href}
                            className="flex items-center text-slate-900 dark:text-white font-urbanist-text font-semibold hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {link.icon}
                            <span className="ml-2">{link.name}</span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    href="/apply"
                    className="block w-full btn-primary text-center py-3"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;