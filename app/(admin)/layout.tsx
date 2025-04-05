'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  Users,
  BookOpen,
  Layout,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Home,
  BarChart3,
  FileText,
  GraduationCap,
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LoadingSpinner } from '@/components/shared/LoadingPlaceholder';
import { cn } from '@/lib/utils';

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ElementType;
  children?: NavigationItem[];
}

const navigation: NavigationItem[] = [
  { title: 'Dashboard', href: '/admin', icon: Home },
  { title: 'Users', href: '/admin/users', icon: Users },
  { 
    title: 'Content Management', 
    href: '/admin/content', 
    icon: BookOpen,
    children: [
      { title: 'Courses', href: '/admin/content/courses', icon: GraduationCap },
      { title: 'Materials', href: '/admin/content/materials', icon: FileText },
    ] 
  },
  { title: 'Enrollments', href: '/admin/enrollments', icon: GraduationCap },
  { title: 'Student Progress', href: '/admin/progress', icon: Activity },
  { title: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { title: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  useEffect(() => {
    // Close sidebar on route change in mobile view
    setSidebarOpen(false);
  }, [pathname]);

  const toggleExpand = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title) 
        : [...prev, title]
    );
  };

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Mobile Sidebar Toggle */}
      <div className="fixed left-4 top-4 z-50 block lg:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 transform border-r border-border bg-card shadow-sm transition-transform duration-200 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center border-b border-border px-6">
          <Link href="/admin" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32" className="text-primary">
              <rect width="32" height="32" fill="#3B82F6" rx="6"/>
              <rect x="8" y="8" width="16" height="16" fill="white" rx="2"/>
              <rect x="12" y="12" width="8" height="8" fill="#3B82F6"/>
            </svg>
            <span className="font-semibold text-base bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 bg-clip-text text-transparent drop-shadow-sm tracking-tight">
              Admin Panel
            </span>
          </Link>
        </div>

        <div className="flex flex-col justify-between h-[calc(100vh-4rem)]">
          <nav className="p-4 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <div key={item.title}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleExpand(item.title)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium",
                        expandedItems.includes(item.title) ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-primary/5"
                      )}
                    >
                      <div className="flex items-center">
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.title}
                      </div>
                      <ChevronRight 
                        className={cn(
                          "h-4 w-4 transition-transform", 
                          expandedItems.includes(item.title) ? "rotate-90" : ""
                        )} 
                      />
                    </button>
                    {expandedItems.includes(item.title) && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.title}
                            href={child.href}
                            className={cn(
                              "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                              pathname === child.href
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-primary/5"
                            )}
                          >
                            <child.icon className="mr-3 h-4 w-4" />
                            {child.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-primary/5"
                    )}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="border-t border-border p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session?.user?.image || undefined} alt={session?.user?.name || 'Admin'} />
                  <AvatarFallback>{session?.user?.name?.[0] || 'A'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{session?.user?.name || 'Admin User'}</p>
                  <p className="text-xs text-muted-foreground">{session?.user?.email || 'admin@example.com'}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/api/auth/signout">
                  <LogOut className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className={cn(
        "flex flex-col flex-grow",
        "lg:ml-64" // Always moved on desktop
      )}>
        {/* Main Content */}
        <main className="flex-grow py-6 pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
        
        {/* Footer - Now outside of the scroll area */}
        <footer className="mt-auto py-8 bg-card border-t border-border w-full">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" className="mr-2">
                  <rect width="32" height="32" fill="#3B82F6" rx="6"/>
                  <rect x="8" y="8" width="16" height="16" fill="white" rx="2"/>
                  <rect x="12" y="12" width="8" height="8" fill="#3B82F6"/>
                </svg>
                <span className="font-semibold text-sm bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 bg-clip-text text-transparent drop-shadow-sm tracking-tight">
                  Innovation Bootcamp University
                </span>
              </div>
              <div className="flex space-x-6">
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
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