import Link from 'next/link';
import { Metadata } from 'next';
import { generateMetadata } from '@/lib/utils/metadata';

export const metadata: Metadata = generateMetadata({
  title: 'Authentication',
  description: 'Sign in or create an account to access your Innovation Bootcamp dashboard.',
  noIndex: true, // Prevent indexing of auth pages
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
            Innovation Bootcamp
          </Link>
        </div>
        {children}
        <footer className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <div className="space-x-4">
            <Link href="/login" className="hover:text-gray-900 dark:hover:text-white">
              Sign in
            </Link>
            <Link href="/register" className="hover:text-gray-900 dark:hover:text-white">
              Sign up
            </Link>
            <Link href="/forgot-password" className="hover:text-gray-900 dark:hover:text-white">
              Forgot password?
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
} 