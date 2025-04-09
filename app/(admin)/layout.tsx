import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { SearchProvider } from '@/contexts/search-context'
import { AdminLayoutClient } from '@/components/admin/AdminLayoutClient'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X, ChevronRight, LogOut, LayoutDashboard, Users, BookOpen, Settings } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { usePathname } from 'next/navigation'

interface NavigationItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: NavigationItem[];
}

const navigation: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
  },
  {
    title: 'Users',
    href: '/admin/users',
    icon: Users,
  },
  {
    title: 'Programs',
    href: '/admin/programs',
    icon: BookOpen,
  },
  {
    title: 'Settings',
    href: '/admin/settings',
    icon: Settings,
  },
]

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()

  if (!session || session.user.role !== 'admin') {
    redirect('/login')
  }

  const toggleExpand = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
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
            <span className="font-bold text-base bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 bg-clip-text text-transparent drop-shadow-sm">
              Innovation Bootcamp University
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
              <div className="mb-4 md:mb-0 flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32" className="text-primary">
                  <rect width="32" height="32" fill="#3B82F6" rx="6"/>
                  <rect x="8" y="8" width="16" height="16" fill="white" rx="2"/>
                  <rect x="12" y="12" width="8" height="8" fill="#3B82F6"/>
                </svg>
                <div className="flex flex-col">
                  <span className="font-bold text-base bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 bg-clip-text text-transparent drop-shadow-sm">
                    Innovation Bootcamp University
                  </span>
                  <span className="text-xs text-muted-foreground">
                    © {new Date().getFullYear()} All rights reserved.
                  </span>
                </div>
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