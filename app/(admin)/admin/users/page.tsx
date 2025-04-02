import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

async function getUsers() {
  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: {
          enrollments: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return users
}

export default async function UsersPage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    redirect('/login')
  }

  const users = await getUsers()

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-8" />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>
            Manage and monitor platform users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 gap-4 p-4 font-medium border-b">
              <div className="col-span-2">User</div>
              <div>Role</div>
              <div>Enrollments</div>
              <div>Joined</div>
            </div>
            <div className="divide-y">
              {users.map((user) => (
                <div key={user.id} className="grid grid-cols-5 gap-4 p-4 items-center">
                  <div className="col-span-2 flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.image || undefined} alt={user.name || ''} />
                      <AvatarFallback>{user.name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                  <div>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      user.role === 'ADMIN'
                        ? 'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20'
                        : user.role === 'INSTRUCTOR'
                        ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20'
                        : 'bg-gray-50 text-gray-700 ring-1 ring-inset ring-gray-600/20'
                    }`}>
                      {user.role}
                    </span>
                  </div>
                  <div>{user._count.enrollments}</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 