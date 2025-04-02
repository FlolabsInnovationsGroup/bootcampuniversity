import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { DashboardContent } from '@/components/admin/DashboardContent'

async function getStats() {
  const [courseCount, userCount, materialCount] = await Promise.all([
    prisma.course.count(),
    prisma.user.count(),
    prisma.material.count(),
  ])

  return {
    courseCount,
    userCount,
    materialCount,
  }
}

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    redirect('/login')
  }

  const stats = await getStats()

  return <DashboardContent stats={stats} />
} 