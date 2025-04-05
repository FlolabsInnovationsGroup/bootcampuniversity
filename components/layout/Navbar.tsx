"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useSession, signOut } from 'next-auth/react';
import {
  Menu,
  X,
  Search,
  ChevronDown,
  Sun,
  Moon,
  ArrowRight,
  LogOut,
  User,
} from 'lucide-react';
import { useClickAway } from 'react-use';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/shared/LoadingPlaceholder';

const navigation = {
  main: [
    {
      name: 'Programs',
      href: '/programs',
      items: [
        {
          name: 'Web Development',
          description: 'Master modern web development with React and Node.js',
          href: '/programs/web-development',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          ),
        },
        {
          name: 'AI & Machine Learning',
          description: 'Learn AI, ML, and deep learning fundamentals',
          href: '/programs/ai-ml',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          name: 'Robotics',
          description: 'Build and program robots with modern control systems',
          href: '/programs/robotics',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          name: 'View All Programs',
          description: 'Explore all our learning tracks and specializations',
          href: '/programs',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          ),
        },
      ],
    },
    {
      name: 'Resources',
      href: '/resources',
      items: [
        {
          name: 'How It Works',
          description: 'Learn about our cooperative education model',
          href: '/how-it-works',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          ),
        },
        {
          name: 'Student Handbook',
          description: 'Guidelines and policies for students',
          href: '/handbook',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          ),
        },
        {
          name: 'Blog',
          description: 'Latest updates and tech insights',
          href: '/blog',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
            </svg>
          ),
        },
        {
          name: 'FAQs',
          description: 'Common questions answered',
          href: '/faqs',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        },
      ],
    },
    {
      name: 'Opportunities',
      href: '/opportunities',
      items: [
        {
          name: 'Internships',
          description: 'Find internship opportunities',
          href: '/internships',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
        },
        {
          name: 'Industry Partners',
          description: 'Our network of partner companies',
          href: '/partners',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          ),
        },
        {
          name: 'Become an Advisor',
          description: 'Join our network of industry experts',
          href: '/advisor',
          icon: (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
        },
      ],
    },
    { 
      name: 'About', 
      href: '/about' 
    },
  ],
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isThemeChanging, setIsThemeChanging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();

  // Mount check
  useEffect(() => {
    setMounted(true);
  }, []);

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
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    setTimeout(() => setIsThemeChanging(false), 400);
  };

  // Performance optimization for navigation
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    // Only prevent default for internal links
    if (href.startsWith('/') && !href.startsWith('//')) {
      // Add active state to links for better feedback
      const target = e.currentTarget;
      target.classList.add('pointer-events-none');
      
      // Re-enable after a short delay (for visual feedback)
      setTimeout(() => {
        target.classList.remove('pointer-events-none');
      }, 300);
    }
  };

  // Get the current theme icon
  const ThemeIcon = mounted ? (theme === 'dark' ? Moon : Sun) : Sun;

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

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({ redirect: true, callbackUrl: '/' });
    } catch (error) {
      console.error('Failed to sign out:', error);
      setIsLoading(false);
    }
  };

  return (
    <motion.nav
      ref={navRef}
      initial="hidden"
      animate="visible"
      variants={navVariants}
      className={`fixed top-0 inset-x-0 z-50 ${
        isScrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50'
          : 'bg-transparent'
      } transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-8 h-8">
                <Logo />
              </div>
              <span className="font-semibold text-base bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                Innovation Bootcamp University
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.main.map((item) => (
              <div key={item.name} className="relative">
                {item.items ? (
                  // Dropdown
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveDropdown(activeDropdown === item.name ? null : item.name);
                    }}
                    className={`group flex items-center space-x-1.5 text-sm font-medium ${
                      activeDropdown === item.name
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400'
                    }`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:text-primary-600 dark:group-hover:text-primary-400" />
                  </button>
                ) : (
                  // Regular link
                  <Link
                    href={item.href}
                    className={`text-sm font-medium ${
                      pathname === item.href
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400'
                    } transition-colors duration-200`}
                    onClick={(e) => handleLinkClick(e, item.href)}
                  >
                    {item.name}
                  </Link>
                )}

                {/* Dropdown Panel */}
                <AnimatePresence>
                  {activeDropdown === item.name && item.items && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dropdownVariants}
                      className="absolute left-0 mt-2 w-screen max-w-md px-2"
                    >
                      <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                        <div className="relative grid gap-6 bg-white dark:bg-slate-900 p-6">
                          {item.items.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="flex items-start rounded-lg p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition duration-150 ease-in-out"
                              onClick={(e) => handleLinkClick(e, subItem.href)}
                            >
                              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
                                {subItem.icon}
                              </div>
                              <div className="ml-4">
                                <p className="text-sm font-medium text-slate-900 dark:text-white">
                                  {subItem.name}
                                </p>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                  {subItem.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}

            {/* Theme Toggle and Auth Buttons */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <button
                onClick={handleThemeChange}
                className="p-2 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                <ThemeIcon className="w-5 h-5" />
              </button>

              {/* Show different buttons based on authentication status */}
              {status === 'authenticated' ? (
                <>
                  {/* User Avatar */}
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                      {session?.user?.image ? (
                        <img 
                          src={session.user.image} 
                          alt={session.user.name || 'User'} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      )}
                    </div>
                    <Link
                      href={session?.user?.role === 'admin' ? "/admin/analytics" : "/dashboard"}
                      className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 mr-2"
                    >
                      Dashboard
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleSignOut}
                      disabled={isLoading}
                      className="text-sm font-medium"
                    >
                      {isLoading ? (
                        <LoadingSpinner className="h-4 w-4 mr-1" />
                      ) : (
                        <LogOut className="h-4 w-4 mr-1" />
                      )}
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  {/* Login Button */}
                  <Link
                    href="/login"
                    className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
                  >
                    Sign in
                  </Link>

                  {/* Apply Button */}
                  <Link
                    href="/apply"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition-colors duration-200"
                  >
                    Apply Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 focus:outline-none"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={mobileMenuVariants}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              {navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Show different buttons based on authentication status */}
              {status === 'authenticated' ? (
                <div className="space-y-2">
                  <Link
                    href={session?.user?.role === 'admin' ? "/admin/analytics" : "/dashboard"}
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/apply"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary-600 hover:bg-primary-700"
                  >
                    Apply Now
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;