import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth/options';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated and is an admin
    if (!session?.user?.id || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    // Get user stats
    const userCount = await prisma.user.count();
    
    // We don't have createdAt field, so we'll skip this filter
    const userCountLastMonth = 0; // Placeholder value

    // Get progress stats
    const materialProgressStats = await prisma.materialProgress.aggregate({
      _avg: {
        progress: true,
      },
      _count: {
        id: true,
      },
    });

    const averageCompletion = Math.round((materialProgressStats._avg?.progress || 0) * 100);

    // Calculate active users (users with activity in the last 7 days)
    const activeUsers = await prisma.user.count({
      where: {
        sessions: {
          some: {
            expires: {
              gte: new Date(),
            },
          },
        },
      },
    });

    // Get recent users
    const recentUsers = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
      },
      take: 5,
    });

    // Use a placeholder growth rate since we don't have createdAt
    const userGrowthRate = 0;

    return NextResponse.json({
      stats: {
        totalUsers: userCount,
        newUsers: userCountLastMonth,
        userGrowth: userGrowthRate,
        // In a real app, these would be actual counts from the database
        totalCourses: 32,
        totalMaterials: materialProgressStats._count.id || 0,
        averageCompletion,
        activeUsers,
      },
      recentUsers,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
