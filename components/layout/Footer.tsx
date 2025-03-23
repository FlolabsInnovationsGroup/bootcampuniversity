"use client";

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Github, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: 'Programs',
      links: [
        { name: 'Tracks Overview', href: '/tracks' },
        { name: 'Web Development', href: '/tracks/web-development' },
        { name: 'AI & Machine Learning', href: '/tracks/ai-ml' },
        { name: 'Robotics', href: '/tracks/robotics' },
        { name: 'UX/UI Design', href: '/tracks/ux-ui' }
      ]
    },
    {
      title: 'How It Works',
      links: [
        { name: 'Tiered System', href: '/how-it-works' },
        { name: 'Earn & Learn Model', href: '/how-it-works#earn-learn' },
        { name: 'Internships', href: '/internships' },
        { name: 'Curriculum', href: '/curriculum' },
        { name: 'Apply Now', href: '/apply' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '/blog' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Partners', href: '/partners' },
        { name: 'Advisors', href: '/advisors' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Cookies', href: '/cookies' }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: '#', label: 'Twitter' },
    { icon: <Linkedin className="h-5 w-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Github className="h-5 w-5" />, href: '#', label: 'GitHub' },
    { icon: <Facebook className="h-5 w-5" />, href: '#', label: 'Facebook' },
  ];

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        {/* Newsletter Section */}
        <div className="rounded-2xl bg-primary-50 dark:bg-primary-900/20 p-6 md:p-8 lg:p-10 mb-16 shadow-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-urbanist-text font-bold text-slate-900 dark:text-white">
              Stay updated with our latest opportunities
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Join our newsletter to receive updates about new programs, industry partnerships,
              and exclusive learning resources.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-4 py-3 text-slate-900 dark:text-white w-full focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                aria-label="Email address"
              />
              <button className="rounded-lg bg-primary-600 hover:bg-primary-700 dark:bg-primary-700 dark:hover:bg-primary-600 text-white font-medium whitespace-nowrap px-6 py-3 flex items-center justify-center transition-colors duration-200 shadow-md hover:shadow-lg">
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="xl:grid xl:grid-cols-5 xl:gap-12">
          {/* Branding and Information */}
          <div className="xl:col-span-1 mb-10 xl:mb-0">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary-600 to-secondary-500 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">IB</span>
              </div>
              <div className="flex flex-col">
                <span className="font-urbanist-text font-bold text-xl bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                  Innovation Bootcamp
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 -mt-1">University</span>
              </div>
            </Link>
            
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-sm max-w-xs">
              Transforming education with our earn-and-learn model that combines theory with real-world experience and industry partnerships.
            </p>
            
            {/* Social links */}
            <div className="mt-6 flex items-center space-x-4">
              {socialLinks.map((item) => (
                <a 
                  key={item.label}
                  href={item.href} 
                  className="text-slate-500 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </div>
            
            {/* Contact */}
            <div className="mt-8 flex items-center text-slate-600 dark:text-slate-400">
              <Mail className="h-5 w-5 mr-2 text-primary-500" />
              <a href="mailto:contact@innovationbootcamp.edu" className="text-sm hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                contact@innovationbootcamp.edu
              </a>
            </div>
          </div>
          
          {/* Links Sections */}
          <div className="mt-8 md:mt-0 grid grid-cols-2 md:grid-cols-4 gap-8 xl:col-span-4">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-urbanist-text font-semibold text-slate-900 dark:text-white tracking-wider uppercase">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            &copy; {currentYear} Innovation Bootcamp University. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="/accessibility" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Accessibility
            </Link>
            <Link href="/sitemap" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;