import Link from 'next/link';
import { Metadata } from 'next';
import { generateMetadata } from '@/lib/utils/metadata';
import { Logo } from '@/components/ui/logo';

export const metadata: Metadata = generateMetadata({
  title: 'Authentication',
  description: 'Sign in or create an account to access your Innovation Bootcamp University dashboard.',
  noIndex: true, // Prevent indexing of auth pages
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/5 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-500/5 rounded-full mix-blend-multiply filter blur-3xl" />
        <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.03]" />
      </div>
      
      <div className="container relative z-10 mx-auto px-4 py-12 flex-1 flex flex-col">
        <div className="mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-8 h-8">
              <Logo />
            </div>
            <div className="flex flex-col">
              <div className="font-bold text-xl bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent mb-2">
                Innovation Bootcamp University
              </div>
            </div>
          </Link>
        </div>
        
        <div className="flex-1 flex items-center justify-center">
          {children}
        </div>
        
        <footer className="mt-8 text-center">
          <div className="space-x-6">
            <Link href="/login" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Sign in
            </Link>
            <Link href="/register" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Sign up
            </Link>
            <Link href="/forgot-password" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              Forgot password?
            </Link>
          </div>
          <p className="mt-4 text-xs text-slate-500 dark:text-slate-500">
            © {new Date().getFullYear()} Innovation Bootcamp University
          </p>
        </footer>
      </div>
    </div>
  );
} 