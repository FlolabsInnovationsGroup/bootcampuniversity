import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user || session.user.role !== 'admin') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  // Get total users and recent signups
  const [[totalUsersResult], [recentSignupsResult]] = await Promise.all([
    prisma.$queryRaw<[{ total: number }]>`SELECT COUNT(*) as total FROM User`,
    prisma.$queryRaw<[{ total: number }]>`
      SELECT COUNT(*) as total 
      FROM User 
      WHERE createdAt >= ${thirtyDaysAgo}
    `
  ]);

  const totalUsers = totalUsersResult.total;
  const recentSignups = recentSignupsResult.total;

  // Get total enrollments and recent enrollments
  const [totalEnrollments, recentEnrollments] = await Promise.all([
    prisma.enrollment.count(),
    prisma.enrollment.count({
      where: {
        enrolledAt: {
          gte: thirtyDaysAgo
        }
      }
    })
  ]);

  // Get activity by type in the last 30 days
  const activityByType = await prisma.$queryRaw<{ action: string; count: number }[]>`
    SELECT action, COUNT(*) as count
    FROM ActivityLog
    WHERE createdAt >= ${thirtyDaysAgo}
    GROUP BY action
  `;

  // Get daily activity for the last 7 days
  const dailyActivity = await prisma.$queryRaw<{ date: string; count: number }[]>`
    SELECT DATE(createdAt) as date, COUNT(*) as count
    FROM ActivityLog
    WHERE createdAt >= ${sevenDaysAgo}
    GROUP BY DATE(createdAt)
  `;

  // Get course completion rate
  const [totalCompletedEnrollments, totalActiveEnrollments] = await Promise.all([
    prisma.enrollment.count({
      where: {
        status: 'COMPLETED'
      }
    }),
    prisma.enrollment.count({
      where: {
        status: 'ACTIVE'
      }
    })
  ]);

  const completionRate = totalActiveEnrollments > 0
    ? (totalCompletedEnrollments / totalActiveEnrollments) * 100
    : 0;

  // Get recent activity
  const recentActivity = await prisma.$queryRaw<{
    id: string;
    action: string;
    target: string | null;
    createdAt: Date;
    userName: string | null;
    userImage: string | null;
  }[]>`
    SELECT 
      a.id,
      a.action,
      a.target,
      a.createdAt,
      u.name as userName,
      u.image as userImage
    FROM ActivityLog a
    LEFT JOIN User u ON a.userId = u.id
    ORDER BY a.createdAt DESC
    LIMIT 5
  `;

  return NextResponse.json({
    totalUsers,
    recentSignups,
    totalEnrollments,
    recentEnrollments,
    activityByType: activityByType.map(item => ({
      name: item.action,
      value: item.count
    })),
    dailyActivity: dailyActivity.map(item => ({
      name: item.date,
      value: item.count
    })),
    completionRate,
    recentActivity: recentActivity.map(item => ({
      id: item.id,
      user: {
        name: item.userName || 'Anonymous',
        image: item.userImage
      },
      action: item.action,
      target: item.target,
      timestamp: new Date(item.createdAt).toLocaleString()
    }))
  });
} 