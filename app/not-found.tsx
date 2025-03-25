import Link from 'next/link';
import { FileQuestion, Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-full">
              <FileQuestion className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight">404</h1>
          <h2 className="text-2xl font-semibold">Page not found</h2>
          
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or never existed.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <Home className="h-4 w-4" />
            Back to home
          </Link>

          <Link
            href="/search"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            <Search className="h-4 w-4" />
            Search site
          </Link>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            If you believe this is a mistake, please{' '}
            <Link
              href="/contact"
              className="font-medium text-primary hover:text-primary-600 dark:hover:text-primary-400"
            >
              contact support
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
} 