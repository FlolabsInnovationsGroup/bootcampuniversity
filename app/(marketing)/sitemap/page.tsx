'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

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

export default function SitemapPage() {
  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-10">Sitemap</h1>
        
        <div className="space-y-12">
          <div>
            <Link href="/" className="inline-flex items-center text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
              Home
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div>
            <Link href="/apply" className="inline-flex items-center text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300 font-medium">
              Apply Now
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="border-t border-slate-200 dark:border-slate-800 pt-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 capitalize">{category}</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
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
    </div>
  );
} 