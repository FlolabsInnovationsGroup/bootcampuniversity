'use client'

import Link from 'next/link'
import { LogOut, Bell, Settings, Home, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { signOut } from 'next-auth/react'
import { UserNav } from '@/components/admin/user-nav'
import { GlobalSearch } from '@/components/admin/global-search'

interface HeaderProps {
  user: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function Header({ user }: HeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b">
      <div className="flex h-16 items-center px-4">
        <Link 
          href="/admin" 
          className="flex items-center gap-2 mr-6 font-semibold text-lg hover:text-primary"
        >
          <Home className="h-5 w-5" />
          Admin Dashboard
        </Link>
        <div className="flex-1 flex items-center space-x-4">
          <div className="w-full max-w-[600px]">
            <GlobalSearch />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4" />
              Back to Website
            </Link>
          </Button>
          <UserNav user={user} />
        </div>
      </div>
    </div>
  )
} 