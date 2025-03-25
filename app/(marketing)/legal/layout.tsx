'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { BackToTop } from '@/components/shared/BackToTop';
import { TableOfContents } from '@/components/shared/TableOfContents';
import { LegalSearch } from '@/components/shared/LegalSearch';

const legalNavItems = [
  { href: '/legal/privacy', label: 'Privacy Policy' },
  { href: '/legal/cookies', label: 'Cookie Policy' },
  { href: '/legal/accessibility', label: 'Accessibility' },
];

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Breadcrumbs />
        </div>

        <div className="lg:hidden flex justify-between mb-4">
          {/* Mobile Navigation Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-primary-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-primary-400 dark:hover:bg-slate-800 transition-colors"
            aria-controls="legal-nav"
            aria-expanded={isMobileNavOpen}
          >
            <span className="sr-only">Open legal navigation</span>
            {isMobileNavOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Mobile Table of Contents Toggle */}
          <button
            type="button"
            onClick={() => setIsTableOfContentsOpen(!isTableOfContentsOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-primary-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-primary-400 dark:hover:bg-slate-800 transition-colors"
            aria-controls="table-of-contents"
            aria-expanded={isTableOfContentsOpen}
          >
            <span className="sr-only">Toggle table of contents</span>
            {isTableOfContentsOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar Navigation */}
          <aside
            id="legal-nav"
            className={cn(
              'lg:w-64 flex-shrink-0',
              'lg:block',
              isMobileNavOpen ? 'block' : 'hidden'
            )}
          >
            <nav className="lg:sticky lg:top-8 space-y-1">
              {legalNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                    pathname === item.href
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
                  )}
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white dark:bg-slate-800/50 rounded-2xl shadow-sm">
            {children}
          </main>

          {/* Right Sidebar - Search and Table of Contents */}
          <aside
            id="table-of-contents"
            className={cn(
              'lg:w-64 flex-shrink-0',
              'lg:block',
              isTableOfContentsOpen ? 'block' : 'hidden'
            )}
          >
            <div className="lg:sticky lg:top-8 space-y-6">
              <LegalSearch />
              <TableOfContents />
            </div>
          </aside>
        </div>
      </div>

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
} 