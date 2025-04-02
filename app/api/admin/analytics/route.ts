import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { startOfMonth, subMonths, endOfMonth } from 'date-fns';

// Helper function to get dates for the last n days
function getLastNDays(n: number) {
  const dates = [];
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
}

// Generate mock data for empty database scenario
function generateMockData() {
  return {
    users: {
      total: 125,
      newLastWeek: 18,
      newLastMonth: 42,
      byRole: {
        admin: 3,
        user: 122
      }
    },
    courses: {
      total: 24,
      newLastMonth: 5,
      byCategory: {
        programming: 8,
        design: 6,
        marketing: 4,
        data: 3,
        business: 3
      },
      byStatus: {
        draft: 6,
        published: 18
      }
    },
    enrollments: {
      total: 380,
      newLastWeek: 32,
      newLastMonth: 95,
      completionRate: 68,
      byStatus: {
        active: 245,
        completed: 102,
        dropped: 33
      },
      weeklyTrend: [
        { date: "2023-03-01", count: 22 },
        { date: "2023-03-08", count: 28 },
        { date: "2023-03-15", count: 25 },
        { date: "2023-03-22", count: 30 },
        { date: "2023-03-29", count: 35 },
        { date: "2023-04-05", count: 32 },
        { date: "2023-04-12", count: 38 },
        { date: "2023-04-19", count: 42 },
        { date: "2023-04-26", count: 38 },
        { date: "2023-05-03", count: 45 },
        { date: "2023-05-10", count: 48 },
        { date: "2023-05-17", count: 52 }
      ]
    },
    engagement: {
      totalMaterialInteractions: 1650,
      activeMaterialInteractionsLastWeek: 245,
      averageCourseProgress: 56
    },
    trending: {
      courses: [
        {
          id: "1",
          title: "Web Development with React",
          category: "programming",
          enrollmentsLastMonth: 28,
          _count: {
            enrollments: 112,
            materials: 24
          }
        },
        {
          id: "2",
          title: "UI/UX Design Fundamentals",
          category: "design",
          enrollmentsLastMonth: 25,
          _count: {
            enrollments: 98,
            materials: 18
          }
        },
        {
          id: "3",
          title: "Data Science with Python",
          category: "data",
          enrollmentsLastMonth: 22,
          _count: {
            enrollments: 85,
            materials: 20
          }
        },
        {
          id: "4",
          title: "Digital Marketing Mastery",
          category: "marketing",
          enrollmentsLastMonth: 20,
          _count: {
            enrollments: 72,
            materials: 15
          }
        },
        {
          id: "5",
          title: "Business Analytics",
          category: "business",
          enrollmentsLastMonth: 18,
          _count: {
            enrollments: 65,
            materials: 16
          }
        }
      ]
    }
  };
}

// GET /api/admin/analytics
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { role: true },
    });

    if (user?.role !== 'ADMIN') {
      return new NextResponse('Forbidden', { status: 403 });
    }

    // Get total users and monthly growth
    const sixMonthsAgo = subMonths(new Date(), 6);
    const userGrowth = await Promise.all(
      Array.from({ length: 6 }).map(async (_, i) => {
        const start = startOfMonth(subMonths(new Date(), i));
        const end = endOfMonth(subMonths(new Date(), i));
        const count = await prisma.user.count({
          where: {
            createdAt: {
              lte: end,
            },
          },
        });
        return {
          name: start.toLocaleString('default', { month: 'short' }),
          users: count,
        };
      })
    );

    // Get course completion rates
    const courses = await prisma.course.findMany({
      where: {
        status: 'published',
      },
      select: {
        id: true,
        title: true,
        enrollments: {
          select: {
            status: true,
          },
        },
      },
    });

    const courseCompletion = courses.map((course) => {
      const totalEnrollments = course.enrollments.length;
      const completedEnrollments = course.enrollments.filter(
        (e) => e.status === 'completed'
      ).length;
      return {
        name: course.title,
        completion: totalEnrollments > 0
          ? Math.round((completedEnrollments / totalEnrollments) * 100)
          : 0,
      };
    });

    // Get content engagement data for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const materialProgress = await prisma.materialProgress.groupBy({
      by: ['createdAt'],
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    const contentEngagement = materialProgress.map((day) => ({
      name: day.createdAt.toLocaleString('default', { weekday: 'short' }),
      views: day._count.id,
      completions: Math.round(day._count.id * 0.6), // Assuming 60% completion rate
    }));

    // Get summary statistics
    const totalUsers = await prisma.user.count();
    const totalViews = await prisma.materialProgress.count();
    const activeCourses = await prisma.course.count({
      where: { status: 'published' },
    });

    const averageCompletion = courseCompletion.length > 0
      ? Math.round(
          courseCompletion.reduce((sum, course) => sum + course.completion, 0) /
          courseCompletion.length
        )
      : 0;

    return NextResponse.json({
      userGrowth: userGrowth.reverse(),
      courseCompletion,
      contentEngagement,
      summary: {
        totalUsers,
        averageCompletion,
        totalViews,
        activeCourses,
      },
    });
  } catch (error) {
    console.error('[ANALYTICS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 