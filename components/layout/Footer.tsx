"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Github, Linkedin, Twitter } from 'lucide-react';

const footerLinks = {
  tracks: [
    { name: 'Web Development', href: '/tracks/web-development' },
    { name: 'AI & Machine Learning', href: '/tracks/ai-ml' },
    { name: 'Robotics', href: '/tracks/robotics' },
    { name: 'UX/UI Design', href: '/tracks/ux-ui' },
    { name: 'View All Tracks', href: '/tracks' },
  ],
  resources: [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Internships', href: '/internships' },
    { name: 'Partners', href: '/partners' },
    { name: 'Student Handbook', href: '/handbook' },
    { name: 'FAQs', href: '/faqs' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press', href: '/press' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Accessibility', href: '/accessibility' },
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Implement newsletter signup
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    setIsSubmitting(false);
    setIsSubscribed(true);
    setEmail('');
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
              <form onSubmit={handleSubmit} className="flex gap-2">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    disabled={isSubmitting || isSubscribed}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 focus:border-primary-500 dark:focus:border-primary-500 focus:ring-0 text-slate-900 dark:text-white placeholder-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                    required
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
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : isSubscribed ? (
                    'Subscribed!'
                  ) : (
                    <>
                      Subscribe
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </motion.button>
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
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-colors duration-200"
                    >
                      <Icon className="w-5 h-5" />
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
                        className="text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
                      >
                        {link.name}
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
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-full blur opacity-25"></div>
              <Image
                src="/logo.svg"
                alt="Innovation Bootcamp"
                width={32}
                height={32}
                className="relative dark:invert"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 dark:from-white dark:via-slate-200 dark:to-white bg-clip-text text-transparent">
                Innovation Bootcamp
              </span>
              <span className="text-xs text-slate-600 dark:text-slate-400">
                © {new Date().getFullYear()} All rights reserved.
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/accessibility"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
            >
              Accessibility
            </Link>
            <Link
              href="/sitemap"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200"
            >
              Sitemap
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;