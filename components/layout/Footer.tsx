"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Github, Linkedin, Twitter } from 'lucide-react';
import { Logo } from '@/components/ui/logo';

const footerLinks = {
  programs: [
    { name: 'Web Development', href: '/programs/web-development' },
    { name: 'AI & Machine Learning', href: '/programs/ai-ml' },
    { name: 'Robotics', href: '/programs/robotics' },
    { name: 'View All Programs', href: '/programs' },
  ],
  resources: [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Student Handbook', href: '/handbook' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQs', href: '/faqs' },
  ],
  opportunities: [
    { name: 'Internships', href: '/internships' },
    { name: 'Industry Partners', href: '/partners' },
    { name: 'Become an Advisor', href: '/advisor' },
    { name: 'Career Support', href: '/career-support' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Press', href: '/press' },
    { name: 'Careers at IB', href: '/careers' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/legal/privacy' },
    { name: 'Terms of Service', href: '/legal/terms' },
    { name: 'Cookie Policy', href: '/legal/cookies' },
    { name: 'Accessibility', href: '/legal/accessibility' },
  ],
};

const socialLinks = [
  { name: 'GitHub', icon: Github, href: 'https://github.com/innovationbootcamp' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/innovationbootcamp' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/innovbootcamp' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    try {
      // TODO: Implement newsletter signup
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      setIsSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-white dark:bg-slate-900 pt-16 pb-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-t from-primary-500/5 to-transparent rounded-full mix-blend-multiply filter blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-secondary-500/5 to-transparent rounded-full mix-blend-multiply filter blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid content starts directly here without the logo/title section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 pb-16 border-b border-slate-200 dark:border-slate-800">
          {/* Newsletter Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent mb-4">
                Stay Updated
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-md">
                Get the latest updates about our programs, student success stories,
                and upcoming events delivered to your inbox.
              </p>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <motion.input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                      }}
                      placeholder="Enter your email"
                      disabled={isSubmitting || isSubscribed}
                      whileFocus={{ scale: 1.01 }}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl ${
                        error ? 'border-red-500 dark:border-red-400' : 'border-slate-200 dark:border-slate-700'
                      } bg-slate-50 dark:bg-slate-800 border-2 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200`}
                      required
                      aria-invalid={!!error}
                      aria-describedby={error ? 'email-error' : undefined}
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isSubmitting || isSubscribed}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isSubscribed
                        ? 'bg-green-500 text-white'
                        : 'bg-primary-600 hover:bg-primary-500 text-white hover:shadow-lg hover:shadow-primary-500/25'
                    } disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900`}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : isSubscribed ? (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 10 }}
                      >
                        Subscribed!
                      </motion.span>
                    ) : (
                      <>
                        Subscribe
                        <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </motion.button>
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    id="email-error"
                    className="text-sm text-red-500 dark:text-red-400"
                  >
                    {error}
                  </motion.p>
                )}
              </form>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-8"
            >
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
                Follow Us
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="group relative w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-colors duration-200"
                      aria-label={`Follow us on ${social.name}`}
                    >
                      <div className="absolute inset-0 bg-primary-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      <Icon className="relative w-5 h-5 transition-transform group-hover:scale-110" />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([section, links], sectionIndex) => (
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIndex * 0.1 }}
              >
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 capitalize">
                  {section}
                </h4>
                <ul className="space-y-3">
                  {links.map((link, linkIndex) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className="group relative text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                      >
                        <span className="relative">
                          {link.name}
                          <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                        </span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full blur opacity-25"></div>
              <Link href="/" aria-label="Home" className="relative w-8 h-8">
                <Logo />
              </Link>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-sm font-medium bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                Innovation Bootcamp University
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                © {new Date().getFullYear()} All rights reserved.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/legal/accessibility"
              className="group text-sm text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
            >
              <span className="relative">
                Accessibility
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </span>
            </Link>
            <Link
              href="/sitemap"
              className="group text-sm text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
            >
              <span className="relative">
                Sitemap
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
              </span>
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;