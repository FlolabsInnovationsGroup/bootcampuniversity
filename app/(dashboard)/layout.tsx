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
  LogOut,
  Search,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/shared/LoadingPlaceholder';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Learning Path', href: '/learning-path', icon: BookOpen },
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
  const [notifications, setNotifications] = useState(3);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });
      router.push('/login');
    } catch (error) {
      console.error('Failed to sign out:', error);
      toast({
        title: "Error signing out",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <LoadingSpinner className="h-8 w-8 mx-auto" />
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-40">
        <div className="flex items-center justify-between px-4 h-full">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8">
              <Logo />
            </div>
            <span className="font-semibold text-lg">IBU</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                {notifications}
              </span>
            )}
          </Button>
        </div>
      </header>

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {isSidebarOpen && (
          <motion.aside
            className="fixed top-0 left-0 z-50 h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 lg:z-30"
            initial={{ x: -288 }}
            animate={{ x: 0 }}
            exit={{ x: -288 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex h-full flex-col">
              {/* Sidebar Header */}
              <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-700">
                <Link href="/dashboard" className="flex items-center space-x-2">
                  <div className="relative w-8 h-8">
                    <Logo />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-base text-slate-900 dark:text-white">
                      Innovation Bootcamp
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      University
                    </span>
                  </div>
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

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 bg-gray-50 dark:bg-gray-900"
                  />
                </div>
              </form>

              {/* Navigation */}
              <nav className="flex-1 space-y-1 p-4 overflow-y-auto">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                        isActive
                          ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 shadow-sm'
                          : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-sm'
                      }`}
                    >
                      <item.icon className={`mr-3 h-5 w-5 transition-colors ${
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
                        className="h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 ring-2 ring-white dark:ring-gray-800 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary-700 dark:text-primary-400" />
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

      {/* Backdrop for mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content Wrapper */}
      <div 
        className={`flex flex-col flex-grow transition-all duration-300 ${
          isSidebarOpen ? 'lg:ml-64' : ''
        } ${
          isSidebarOpen ? 'lg:pl-0' : 'pl-0'
        }`}
      >
        {/* Main Content */}
        <main className="flex-grow pt-16 lg:pt-8 pb-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-auto py-6 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="container mx-auto">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0 flex items-center space-x-2">
                <div className="relative w-8 h-8">
                  <Logo />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-base text-slate-900 dark:text-white">
                    Innovation Bootcamp
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    University
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-6">
                <Link href="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
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