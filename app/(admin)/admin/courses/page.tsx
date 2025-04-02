import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Search, MoreVertical, Users, BookOpen, Clock } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

async function getCourses() {
  const courses = await prisma.course.findMany({
    include: {
      _count: {
        select: {
          enrollments: true,
          materials: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return courses
}

export default async function CoursesPage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    redirect('/login')
  }

  const courses = await getCourses()

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
          <p className="text-muted-foreground">
            Create and manage your learning programs
          </p>
        </div>
        <div className="space-x-4">
          <Button asChild variant="outline">
            <Link href="/admin/courses/import">Import Course</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/courses/new">
              <Plus className="mr-2 h-4 w-4" />
              New Course
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search courses..." className="pl-8" />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courses.length}</div>
            <p className="text-xs text-muted-foreground">
              Active learning programs
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courses.reduce((sum, course) => sum + course._count.enrollments, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all courses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Materials</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {courses.reduce((sum, course) => sum + course._count.materials, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Learning resources
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Courses</CardTitle>
              <CardDescription>
                A list of all courses in your platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 gap-4 p-4 font-medium border-b">
                  <div className="col-span-2">Course</div>
                  <div>Status</div>
                  <div>Enrollments</div>
                  <div>Materials</div>
                  <div className="text-right">Actions</div>
                </div>
                <div className="divide-y">
                  {courses.map((course) => (
                    <div key={course.id} className="grid grid-cols-6 gap-4 p-4 items-center">
                      <div className="col-span-2">
                        <Link 
                          href={`/admin/courses/${course.id}`}
                          className="font-medium hover:underline"
                        >
                          {course.title}
                        </Link>
                        <p className="text-sm text-muted-foreground">
                          {course.description}
                        </p>
                      </div>
                      <div>
                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          course.status === 'PUBLISHED'
                            ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20'
                            : course.status === 'ARCHIVED'
                            ? 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20'
                            : 'bg-yellow-50 text-yellow-700 ring-1 ring-inset ring-yellow-600/20'
                        }`}>
                          {course.status}
                        </span>
                      </div>
                      <div>{course._count.enrollments}</div>
                      <div>{course._count.materials}</div>
                      <div className="flex justify-end">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/courses/${course.id}`}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/courses/${course.id}/edit`}>
                                Edit Course
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/courses/${course.id}/materials`}>
                                Manage Materials
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/courses/${course.id}/enrollments`}>
                                View Enrollments
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="published">
          <Card>
            <CardContent>
              <div className="rounded-md border">
                <div className="divide-y">
                  {courses
                    .filter(course => course.status === 'PUBLISHED')
                    .map((course) => (
                      <div key={course.id} className="grid grid-cols-6 gap-4 p-4 items-center">
                        {/* Same content as above */}
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="draft">
          <Card>
            <CardContent>
              <div className="rounded-md border">
                <div className="divide-y">
                  {courses
                    .filter(course => course.status === 'DRAFT')
                    .map((course) => (
                      <div key={course.id} className="grid grid-cols-6 gap-4 p-4 items-center">
                        {/* Same content as above */}
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived">
          <Card>
            <CardContent>
              <div className="rounded-md border">
                <div className="divide-y">
                  {courses
                    .filter(course => course.status === 'ARCHIVED')
                    .map((course) => (
                      <div key={course.id} className="grid grid-cols-6 gap-4 p-4 items-center">
                        {/* Same content as above */}
                      </div>
                    ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 