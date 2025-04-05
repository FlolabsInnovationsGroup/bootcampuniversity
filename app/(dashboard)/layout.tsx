'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { 
  LayoutDashboard, 
  Calendar, 
  MessageSquare, 
  BookOpen, 
  Settings, 
  ChevronLeft,
  Menu,
  Bell,
  User,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/shared/LoadingPlaceholder';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Schedule', href: '/dashboard/schedule', icon: Calendar },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  { name: 'My Programs', href: '/my-programs', icon: BookOpen },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState(3); // Example notification count

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login?redirect=dashboard');
    }
  }, [status, router]);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({ redirect: false });
      router.push('/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null; // Don't render anything, we're redirecting
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="bg-white dark:bg-gray-800"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {(isSidebarOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
          <motion.aside
            className="fixed top-0 left-0 z-40 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700"
            initial={{ x: -288 }}
            animate={{ x: 0 }}
            exit={{ x: -288 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <div className="flex h-full flex-col">
              {/* Sidebar Header */}
              <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
                <Link href="/dashboard" className="flex items-center space-x-2">
                  <div className="relative w-8 h-8">
                    <Logo />
                  </div>
                  <span className="font-semibold text-base bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                    Innovation Bootcamp University
                  </span>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </div>

              {/* Navigation */}
              <nav className="flex-1 space-y-1 p-4">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800'
                      }`}
                    >
                      <item.icon className={`mr-3 h-5 w-5 ${
                        isActive ? 'text-primary-700 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'
                      }`} />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              {/* User Menu */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {session?.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || ''}
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="ml-3 flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                      {session?.user?.name || 'User'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[120px]">
                      {session?.user?.email || ''}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative"
                      onClick={() => {/* TODO: Show notifications */}}
                    >
                      <Bell className="h-4 w-4" />
                      {notifications > 0 && (
                        <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                          {notifications}
                        </span>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleSignOut}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <LoadingSpinner className="h-4 w-4" />
                      ) : (
                        <LogOut className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Wrapper */}
      <div className={`flex flex-col flex-grow ${isSidebarOpen ? 'lg:ml-64' : ''} transition-all duration-300`}>
        {/* Main Content */}
        <main className="flex-grow pt-16 pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="py-8 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0 flex items-center space-x-2">
                <div className="relative w-8 h-8">
                  <Logo />
                </div>
                <span className="font-semibold text-base bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                  Innovation Bootcamp University
                </span>
              </div>
              <div className="flex space-x-6">
                <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  Privacy Policy
                </Link>
                <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
} 