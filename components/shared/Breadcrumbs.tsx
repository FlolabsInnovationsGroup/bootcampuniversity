'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

type Breadcrumb = {
  label: string;
  href: string;
  current?: boolean;
};

function generateBreadcrumbs(pathname: string): Breadcrumb[] {
  const paths = pathname.split('/').filter(Boolean);
  return paths.reduce<Breadcrumb[]>((breadcrumbs, path, index) => {
    const href = `/${paths.slice(0, index + 1).join('/')}`;
    const label = path.charAt(0).toUpperCase() + path.slice(1);
    return [...breadcrumbs, { label, href, current: index === paths.length - 1 }];
  }, []);
}

export function Breadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-1 text-sm">
      <Link
        href="/"
        className="flex items-center text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400"
      >
        <Home className="w-4 h-4" />
        <span className="sr-only">Home</span>
      </Link>

      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.href} className="flex items-center">
          <ChevronRight className="w-4 h-4 text-slate-400" />
          <Link
            href={breadcrumb.href}
            className={cn(
              'ml-1 hover:text-primary-600 dark:hover:text-primary-400',
              breadcrumb.current
                ? 'text-slate-900 dark:text-slate-200 font-medium'
                : 'text-slate-600 dark:text-slate-400'
            )}
            aria-current={breadcrumb.current ? 'page' : undefined}
          >
            {breadcrumb.label}
          </Link>
        </div>
      ))}
    </nav>
  );
} 