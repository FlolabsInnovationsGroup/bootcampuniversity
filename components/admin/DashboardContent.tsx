'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BookOpen, Users, Video, FileText, Plus, UserPlus } from 'lucide-react'

interface DashboardContentProps {
  stats: {
    courseCount: number;
    userCount: number;
    materialCount: number;
  }
}

export function DashboardContent({ stats }: DashboardContentProps) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/admin/courses/new">
              <Plus className="mr-2 h-4 w-4" />
              New Course
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/content/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Content
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          variant="outline" 
          className="h-24 flex flex-col items-center justify-center gap-2 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 group"
          asChild
        >
          <Link href="/admin/courses/new">
            <Plus className="h-6 w-6 group-hover:text-primary-500" />
            <span className="text-sm font-medium">New Course</span>
          </Link>
        </Button>
        <Button 
          variant="outline" 
          className="h-24 flex flex-col items-center justify-center gap-2 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 group"
          asChild
        >
          <Link href="/admin/users/new">
            <UserPlus className="h-6 w-6 group-hover:text-primary-500" />
            <span className="text-sm font-medium">Add User</span>
          </Link>
        </Button>
        <Button 
          variant="outline" 
          className="h-24 flex flex-col items-center justify-center gap-2 hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 group"
          asChild
        >
          <Link href="/admin/content/new">
            <FileText className="h-6 w-6 group-hover:text-primary-500" />
            <span className="text-sm font-medium">Create Content</span>
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.courseCount}</div>
            <p className="text-xs text-muted-foreground">
              Active learning programs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.userCount}</div>
            <p className="text-xs text-muted-foreground">
              Registered platform users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Materials</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.materialCount}</div>
            <p className="text-xs text-muted-foreground">
              Videos, articles, and resources
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Courses</CardTitle>
            <CardDescription>
              Recently added or updated courses
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* We'll add a data table component here later */}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/courses/new">
                <Plus className="mr-2 h-4 w-4" />
                Create New Course
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/content/videos/new">
                <Video className="mr-2 h-4 w-4" />
                Add Video Content
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/content/articles/new">
                <FileText className="mr-2 h-4 w-4" />
                Add Article
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 