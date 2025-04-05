import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { ActivityLogTable } from '@/components/admin/activity-log-table'

async function getInitialActivityLogs() {
  const logs = await prisma.activityLog.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 50,
  })

  const total = await prisma.activityLog.count()

  // Convert Date objects to ISO strings for client-side rendering
  const serializedLogs = logs.map(log => ({
    ...log,
    createdAt: log.createdAt.toISOString(),
  }))

  return {
    logs: serializedLogs,
    pagination: {
      total,
      pages: Math.ceil(total / 50),
      page: 1,
      limit: 50,
    },
  }
}

export default async function ActivityLogPage() {
  const session = await getServerSession(authOptions)
  
  if (!session?.user || session.user.role !== 'admin') {
    redirect('/login')
  }

  const { logs, pagination } = await getInitialActivityLogs()

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Activity Log</h1>
            <p className="text-gray-600">Track all administrative actions and changes</p>
          </div>
        </div>

        <ActivityLogTable
          initialLogs={logs}
          initialPagination={pagination}
        />
      </div>
    </div>
  )
} 