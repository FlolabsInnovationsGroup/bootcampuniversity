'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronLeft, Bell, Settings, Users, BookOpen, LayoutDashboard, X, Search, Plus, FileText, UserPlus, Shield, BarChart, Activity, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  {
    name: 'Course Management',
    href: '/admin/courses',
    icon: BookOpen,
    children: [
      { name: 'All Courses', href: '/admin/courses', icon: BookOpen },
      { name: 'Add Course', href: '/admin/courses/new', icon: Plus },
      { name: 'Curriculum Builder', href: '/admin/curriculum', icon: FileText },
    ],
  },
  {
    name: 'Users',
    href: '/admin/users',
    icon: Users,
    children: [
      { name: 'All Users', href: '/admin/users', icon: Users },
      { name: 'Add User', href: '/admin/users/new', icon: UserPlus },
      { name: 'Roles & Permissions', href: '/admin/users/roles', icon: Shield },
    ],
  },
  {
    name: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart,
  },
  {
    name: 'Activity Log',
    href: '/admin/activity',
    icon: Activity,
  },
  {
    name: 'Settings',
    href: '/admin/settings',
    icon: Settings,
    children: [
      { name: 'General', href: '/admin/settings', icon: Settings },
      { name: 'Email Templates', href: '/admin/settings/email', icon: Mail },
      { name: 'Notifications', href: '/admin/settings/notifications', icon: Bell },
    ],
  },
];

export function AdminLayoutClient({
  children,
  user
}: {
  children: React.ReactNode
  user: any
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(2);
  const pathname = usePathname();

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement admin search
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-40">
        <div className="flex items-center justify-between px-4 h-full">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <span className="font-semibold text-sm text-slate-900 dark:text-white leading-tight">Admin Portal</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => {/* TODO: Implement search */}}
            >
              <Search className="h-5 w-5" />
            </Button>
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
            <Button
              variant="ghost"
              size="icon"
              className="relative ml-2"
              onClick={() => {/* TODO: Implement user menu */}}
            >
              <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 ring-2 ring-white dark:ring-gray-800 flex items-center justify-center">
                <span className="text-sm font-medium text-primary-700 dark:text-primary-400">
                  {user.name?.[0] || 'A'}
                </span>
              </div>
            </Button>
          </div>
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
                <Link href="/admin" className="flex items-center gap-3 min-w-0">
                  <div className="min-w-0">
                    <span className="font-bold text-sm text-slate-900 dark:text-white">
                      Admin Portal
                    </span>
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSidebarOpen(false)}
                  className="lg:hidden flex-shrink-0"
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
                  const isParentActive = item.children?.some(child => pathname === child.href);
                  return (
                    <div key={item.name} className="mb-2">
                      {!item.children ? (
                        <Link
                          href={item.href}
                          className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
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
                      ) : (
                        <>
                          <div className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 
                            ${isParentActive ? 'bg-gray-50 dark:bg-gray-800' : ''}
                            text-gray-900 dark:text-gray-100`}
                          >
                            <item.icon className={`mr-3 h-5 w-5 ${
                              isParentActive ? 'text-primary-700 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500'
                            }`} />
                            {item.name}
                          </div>
                          <div className="mt-1 ml-8 space-y-1">
                            {item.children.map((child) => {
                              const isChildActive = pathname === child.href;
                              return (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                                    isChildActive
                                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 shadow-sm'
                                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'
                                  }`}
                                >
                                  <child.icon className={`mr-3 h-4 w-4 transition-colors ${
                                    isChildActive ? 'text-primary-700 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-primary-600 dark:group-hover:text-primary-400'
                                  }`} />
                                  {child.name}
                                </Link>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Admin Info */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 ring-2 ring-white dark:ring-gray-800 flex items-center justify-center">
                        <span className="text-sm font-medium text-primary-700 dark:text-primary-400">
                          {user.name?.[0] || 'A'}
                        </span>
                      </div>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {user.name || 'Admin'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Administrator
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                  >
                    <Bell className="h-4 w-4" />
                    <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                      2
                    </span>
                  </Button>
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

      {/* Main Content */}
      <div className={`flex flex-col flex-grow transition-all duration-300 ${
        isSidebarOpen ? 'lg:ml-64' : ''
      } ${
        isSidebarOpen ? 'lg:pl-0' : 'pl-0'
      }`}>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 mt-16 lg:mt-16">
          <div className="max-w-7xl mx-auto space-y-6 pt-8">
            {children}
          </div>
        </main>

        <footer className="mt-auto py-6 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} Innovation Bootcamp University. All rights reserved.
            </p>
            <div className="mt-4 sm:mt-0 flex space-x-4">
              <Link href="/admin/help" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Help Center
              </Link>
              <Link href="/admin/docs" className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                Documentation
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
} 