'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  Layout,
  Users,
  Settings,
  GraduationCap,
  FileText,
  BarChart3,
  FolderPlus,
  Video,
  Link as LinkIcon,
  Plus,
  Activity,
  BarChart,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: Layout },
  {
    name: 'Course Management',
    href: '/admin/courses',
    icon: BookOpen,
    children: [
      { name: 'All Courses', href: '/admin/courses', icon: GraduationCap },
      { name: 'Add Course', href: '/admin/courses/new', icon: FolderPlus },
      { name: 'Curriculum Builder', href: '/admin/curriculum', icon: BookOpen },
    ],
  },
  {
    name: 'Content Library',
    href: '/admin/content',
    icon: FileText,
    children: [
      { name: 'All Content', href: '/admin/content', icon: FileText },
      { name: 'Add Content', href: '/admin/content/new', icon: Plus },
      { name: 'Materials', href: '/admin/content/materials', icon: Video },
    ],
  },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart },
  { name: 'Activity Log', href: '/admin/activity', icon: Activity },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-72 bg-white border-r mt-14">
      <div className="flex flex-col h-full py-4">
        <nav className="flex-1 px-4 space-y-1">
          {navigation.map((item) => (
            <div key={item.name}>
              {!item.children ? (
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-x-3 px-3 py-2 text-sm font-medium rounded-md',
                    pathname === item.href
                      ? 'bg-gray-50 text-primary'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ) : (
                <div className="space-y-1">
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-x-3 px-3 py-2 text-sm font-medium rounded-md',
                      pathname === item.href
                        ? 'bg-gray-50 text-primary'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                  <div className="pl-8 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className={cn(
                          'flex items-center gap-x-3 px-3 py-2 text-sm font-medium rounded-md',
                          pathname === child.href
                            ? 'bg-gray-50 text-primary'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                        )}
                      >
                        <child.icon className="h-4 w-4" />
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
} 