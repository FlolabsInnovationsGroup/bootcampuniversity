'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

type SearchResult = {
  id: string;
  text: string;
  context: string;
  heading: string;
};

export function LegalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const pathname = usePathname();

  const searchContent = useCallback(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const article = document.querySelector('article');
    if (!article) return;

    const searchResults: SearchResult[] = [];
    const paragraphs = article.querySelectorAll('p');
    let currentHeading = '';

    // Find all text content and its context
    paragraphs.forEach((p) => {
      const text = p.textContent?.toLowerCase() || '';
      if (!text.includes(query.toLowerCase())) return;

      // Find the nearest heading
      let heading = p.previousElementSibling;
      while (heading) {
        if (heading.tagName.match(/^H[1-6]$/)) {
          currentHeading = heading.textContent || '';
          break;
        }
        heading = heading.previousElementSibling;
      }

      // Get surrounding context
      const words = text.split(' ');
      const queryIndex = words.findIndex(word => 
        word.includes(query.toLowerCase())
      );
      
      if (queryIndex !== -1) {
        const start = Math.max(0, queryIndex - 5);
        const end = Math.min(words.length, queryIndex + 6);
        const context = words.slice(start, end).join(' ');

        searchResults.push({
          id: p.id || `result-${searchResults.length}`,
          text: p.textContent || '',
          context: '...' + context + '...',
          heading: currentHeading,
        });
      }
    });

    setResults(searchResults);
    setIsSearching(false);
  }, [query]);

  // Reset search when changing pages
  useEffect(() => {
    setQuery('');
    setResults([]);
  }, [pathname]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchContent();
    }, 300);

    return () => clearTimeout(timer);
  }, [query, searchContent]);

  const scrollToResult = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });

      // Highlight the paragraph briefly
      element.classList.add('bg-primary-50', 'dark:bg-primary-500/10');
      setTimeout(() => {
        element.classList.remove('bg-primary-50', 'dark:bg-primary-500/10');
      }, 2000);
    }
  };

  return (
    <div className="mb-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search in this document..."
          className={cn(
            'w-full pl-10 pr-4 py-2 text-sm rounded-lg',
            'bg-white dark:bg-slate-800',
            'border border-slate-200 dark:border-slate-700',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400',
            'placeholder-slate-400 dark:placeholder-slate-500'
          )}
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </button>
        )}
      </div>

      {/* Search Results */}
      {results.length > 0 && (
        <div className="mt-4 space-y-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Found {results.length} {results.length === 1 ? 'result' : 'results'}
          </p>
          <div className="space-y-2">
            {results.map((result) => (
              <button
                key={result.id}
                onClick={() => scrollToResult(result.id)}
                className={cn(
                  'w-full text-left p-3 rounded-lg text-sm',
                  'bg-slate-50 hover:bg-slate-100',
                  'dark:bg-slate-800/50 dark:hover:bg-slate-800',
                  'transition-colors duration-200'
                )}
              >
                <p className="font-medium text-slate-900 dark:text-slate-100 mb-1">
                  {result.heading}
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  {result.context}
                </p>
              </button>
            ))}
          </div>
        </div>
      )}

      {query && results.length === 0 && !isSearching && (
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
          No results found for "{query}"
        </p>
      )}
    </div>
  );
} 