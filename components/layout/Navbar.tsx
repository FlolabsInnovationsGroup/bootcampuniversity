"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import {
  Menu,
  X,
  Search,
  ChevronDown,
  Sun,
  Moon,
  ArrowRight,
  Laptop,
} from 'lucide-react';
import { useClickAway } from 'react-use';

const navigation = {
  main: [
    {
      name: 'Tracks',
      href: '/tracks',
      items: [
        {
          name: 'Web Development',
          description: 'Master modern web development with React and Node.js',
          href: '/tracks/web-development',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          ),
        },
        {
          name: 'AI & Machine Learning',
          description: 'Learn AI, ML, and deep learning fundamentals',
          href: '/tracks/ai-ml',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          name: 'Robotics',
          description: 'Build and program robots with modern control systems',
          href: '/tracks/robotics',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          name: 'UX/UI Design',
          description: 'Create beautiful and functional digital experiences',
          href: '/tracks/ux-ui',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
            </svg>
          ),
        },
      ],
    },
    { 
      name: 'How It Works', 
      href: '/how-it-works' 
    },
    { 
      name: 'Internships', 
      href: '/internships' 
    },
    { 
      name: 'Partners', 
      href: '/partners' 
    },
  ],
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isThemeChanging, setIsThemeChanging] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useClickAway(navRef, () => {
    setActiveDropdown(null);
    setIsSearchOpen(false);
  });

  // Handle scroll effects with smooth transition
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 10;
      if (scrolled !== isScrolled) {
        setIsScrolled(scrolled);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus();
    }
  }, [isSearchOpen]);

  // Handle theme change with animation
  const handleThemeChange = () => {
    setIsThemeChanging(true);
    const nextTheme = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark';
    setTheme(nextTheme);
    setTimeout(() => setIsThemeChanging(false), 400);
  };

  // Animation variants
  const navVariants = {
    hidden: { y: -100 },
    visible: { y: 0 },
  };

  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: 10,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    },
  };

  const mobileMenuVariants = {
    hidden: { 
      x: '100%',
      transition: { duration: 0.3, ease: "easeIn" }
    },
    visible: { 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
  };

  return (
    <motion.nav
      ref={navRef}
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 inset-x-0 z-50 ${
        isScrolled
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg shadow-lg dark:shadow-slate-800/20'
          : 'bg-transparent'
      } transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="group flex items-center space-x-2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-200"></div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image
                  src="/logo.svg"
                  alt="Innovation Bootcamp"
                  width={32}
                  height={32}
                  className="relative dark:invert"
                />
              </motion.div>
            </div>
            <div className="flex flex-col">
              <motion.span 
                className="font-bold text-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Innovation Bootcamp
              </motion.span>
              <motion.span 
                className="text-sm text-slate-600 dark:text-slate-400 -mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                University
              </motion.span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.main.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.4 }}
                className="relative"
              >
                {item.items ? (
                  // Dropdown
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    className={`group flex items-center space-x-1.5 text-sm font-medium ${
                      activeDropdown === item.name
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                  >
                    <span>{item.name}</span>
                    <motion.div
                      animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </button>
                ) : (
                  // Regular link
                  <Link
                    href={item.href}
                    className={`relative text-sm font-medium ${
                      pathname === item.href
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400'
                    } transition-colors duration-200`}
                  >
                    {item.name}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="activeNavItem"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                )}

                {/* Dropdown menu */}
                <AnimatePresence>
                  {item.items && activeDropdown === item.name && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="absolute top-full left-0 w-72 mt-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg ring-1 ring-slate-900/5 dark:ring-slate-700/5 overflow-hidden"
                    >
                      <div className="p-2">
                        {item.items.map((subItem, subIndex) => (
                          <motion.div
                            key={subItem.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: subIndex * 0.1 }}
                          >
                            <Link
                              href={subItem.href}
                              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                              onClick={() => setActiveDropdown(null)}
                            >
                              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                                {subItem.icon}
                              </div>
                              <div>
                                <div className="font-medium text-slate-900 dark:text-white">
                                  {subItem.name}
                                </div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">
                                  {subItem.description}
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Search button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Theme switcher */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleThemeChange}
              disabled={isThemeChanging}
              className={`relative p-2 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors ${
                isThemeChanging ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              <motion.div
                initial={false}
                animate={{
                  rotate: isThemeChanging ? 360 : 0,
                }}
                transition={{ duration: 0.4 }}
              >
                {theme === 'dark' ? (
                  <Moon className="w-5 h-5" />
                ) : theme === 'light' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Laptop className="w-5 h-5" />
                )}
              </motion.div>
            </motion.button>

            {/* CTA Button */}
            <Link
              href="/apply"
              className="hidden md:inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25"
            >
              <motion.div
                initial={false}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center"
              >
                Apply Now
                <motion.div
                  whileHover={{ x: 4 }}
                  className="ml-2"
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.div>
            </Link>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 dark:text-slate-300"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Search modal */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-x-0 top-full mt-2 px-4 sm:px-6 lg:px-8"
            >
              <div className="max-w-3xl mx-auto">
                <div className="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg ring-1 ring-slate-900/5 dark:ring-slate-700/5 p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search courses, resources, and more..."
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 border-0 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 placeholder-slate-400 dark:placeholder-slate-500"
                    />
                  </div>
                  {/* Quick links */}
                  <div className="mt-4 border-t border-slate-200 dark:border-slate-700 pt-4">
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-2">
                      Quick Links
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/programs"
                        className="flex items-center space-x-2 p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-700/50"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                          <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">All Programs</span>
                      </Link>
                      <Link
                        href="/blog"
                        className="flex items-center space-x-2 p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-700/50"
                      >
                        <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                          <svg className="w-4 h-4 text-primary-600 dark:text-primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H14" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Latest Articles</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-slate-800 shadow-xl md:hidden"
          >
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between px-4 h-16 border-b border-slate-200 dark:border-slate-700">
                <Link href="/" className="flex items-center space-x-2">
                  <Image
                    src="/logo.svg"
                    alt="Innovation Bootcamp"
                    width={32}
                    height={32}
                    className="dark:invert"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                      Innovation Bootcamp
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400 -mt-1">
                      University
                    </span>
                  </div>
                </Link>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-slate-700 dark:text-slate-300"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <motion.div 
                className="flex-1 overflow-y-auto py-6 px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {navigation.main.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="py-2"
                  >
                    {item.items ? (
                      <div>
                        <button
                          onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                          className="flex items-center justify-between w-full py-2 text-base font-medium text-slate-900 dark:text-white"
                        >
                          {item.name}
                          <motion.div
                            animate={{ rotate: activeDropdown === item.name ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-5 h-5" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="ml-4 space-y-2 overflow-hidden"
                            >
                              {item.items.map((subItem, subIndex) => (
                                <motion.div
                                  key={subItem.name}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: subIndex * 0.1 }}
                                >
                                  <Link
                                    href={subItem.href}
                                    className="flex items-center space-x-3 py-2 text-base text-slate-700 dark:text-slate-300"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                                      {subItem.icon}
                                    </div>
                                    <span>{subItem.name}</span>
                                  </Link>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block py-2 text-base font-medium text-slate-900 dark:text-white"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              <div className="p-4 border-t border-slate-200 dark:border-slate-700">
                <Link
                  href="/apply"
                  className="flex items-center justify-center w-full px-4 py-3 rounded-lg bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary-500/25"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center"
                  >
                    Apply Now
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="ml-2"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </motion.div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;