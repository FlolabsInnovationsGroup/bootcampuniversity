'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Heading = {
  id: string;
  text: string;
  level: number;
};

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Find all h2 and h3 elements in the article
    const elements = Array.from(document.querySelector('article')?.querySelectorAll('h2, h3') ?? []);
    const headingElements = elements.map((element) => ({
      id: element.id || element.textContent?.toLowerCase().replace(/\W+/g, '-') || '',
      text: element.textContent || '',
      level: Number(element.tagName[1]),
    }));

    // Set IDs for elements that don't have them
    elements.forEach((element, index) => {
      if (!element.id) {
        element.id = headingElements[index].id;
      }
    });

    setHeadings(headingElements);

    // Set up intersection observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0% 0% -80% 0%' }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Adjust based on your header height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="space-y-2 text-sm">
      <p className="font-medium text-slate-900 dark:text-slate-100 mb-4">
        On this page
      </p>
      {headings.map((heading) => (
        <button
          key={heading.id}
          onClick={() => scrollToHeading(heading.id)}
          className={cn(
            'block w-full text-left py-1 px-2 rounded-lg transition-colors',
            'hover:bg-slate-100 dark:hover:bg-slate-800',
            heading.level === 2 ? 'pl-2' : 'pl-4',
            activeId === heading.id
              ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10'
              : 'text-slate-600 dark:text-slate-400'
          )}
        >
          {heading.text}
        </button>
      ))}
    </nav>
  );
} 