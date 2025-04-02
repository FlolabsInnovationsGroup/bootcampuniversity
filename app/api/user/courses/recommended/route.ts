import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get user's enrolled courses
    const userEnrollments = await prisma.enrollment.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        course: true
      }
    });

    // Get categories and levels from user's enrolled courses
    const userCategories = new Set(userEnrollments.map(e => e.course.category));
    const userLevels = new Set(userEnrollments.map(e => e.course.level));
    const enrolledCourseIds = userEnrollments.map(e => e.courseId);

    // Find courses that match user's interests but aren't enrolled in yet
    const recommendedCourses = await prisma.course.findMany({
      where: {
        AND: [
          {
            OR: [
              { category: { in: Array.from(userCategories) } },
              { level: { in: Array.from(userLevels) } }
            ]
          },
          { id: { notIn: enrolledCourseIds } },
          { status: 'PUBLISHED' }
        ]
      },
      take: 6,
      orderBy: {
        createdAt: 'desc'
      }
    });

    // If not enough recommendations based on interests, add popular courses
    if (recommendedCourses.length < 6) {
      const additionalCourses = await prisma.course.findMany({
        where: {
          AND: [
            { id: { notIn: [...enrolledCourseIds, ...recommendedCourses.map(c => c.id)] } },
            { status: 'PUBLISHED' }
          ]
        },
        take: 6 - recommendedCourses.length,
        orderBy: {
          enrollments: {
            _count: 'desc'
          }
        }
      });

      recommendedCourses.push(...additionalCourses);
    }

    return NextResponse.json({
      courses: recommendedCourses.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description,
        category: course.category,
        level: course.level,
        image: course.image
      }))
    });
  } catch (error) {
    console.error('Error fetching course recommendations:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 