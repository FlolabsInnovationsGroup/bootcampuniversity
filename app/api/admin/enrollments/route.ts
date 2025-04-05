import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// Validation schema for enrollment creation
const enrollmentSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  courseId: z.string().min(1, 'Course ID is required'),
  status: z.enum(['active', 'completed', 'dropped']).default('active'),
});

// Bulk enrollment schema
const bulkEnrollmentSchema = z.object({
  userIds: z.array(z.string()).min(1, 'At least one user ID is required'),
  courseId: z.string().min(1, 'Course ID is required'),
  status: z.enum(['active', 'completed', 'dropped']).default('active'),
});

// Helper function to check if user is admin
async function isAdmin() {
  const session = await getServerSession();
  return session?.user?.role === 'admin';
}

// GET /api/admin/enrollments
export async function GET(request: Request) {
  try {
    // Check if user is admin
    if (!await isAdmin()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');
    const status = searchParams.get('status');

    // Build query conditions
    const where: any = {};
    
    if (userId) where.userId = userId;
    if (courseId) where.courseId = courseId;
    if (status) where.status = status;

    // Get enrollments with related user and course data
    const enrollments = await prisma.enrollment.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        course: {
          select: {
            id: true,
            title: true,
            category: true,
          },
        },
      },
      orderBy: [
        { enrolledAt: 'desc' },
      ],
    });

    return NextResponse.json(enrollments);
  } catch (error) {
    console.error('Error fetching enrollments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enrollments' },
      { status: 500 }
    );
  }
}

// POST /api/admin/enrollments
export async function POST(request: Request) {
  try {
    // Check if user is admin
    if (!await isAdmin()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate request body
    const body = await request.json();
    
    // Check if this is a bulk enrollment request
    if (body.userIds && Array.isArray(body.userIds)) {
      const validation = bulkEnrollmentSchema.safeParse(body);
      
      if (!validation.success) {
        return NextResponse.json(
          { error: validation.error.errors },
          { status: 400 }
        );
      }
      
      const { userIds, courseId, status } = validation.data;
      
      // Check if course exists
      const course = await prisma.course.findUnique({
        where: { id: courseId },
      });
      
      if (!course) {
        return NextResponse.json(
          { error: 'Course not found' },
          { status: 404 }
        );
      }
      
      // Check if all users exist
      const userCount = await prisma.user.count({
        where: {
          id: {
            in: userIds,
          },
        },
      });
      
      if (userCount !== userIds.length) {
        return NextResponse.json(
          { error: 'One or more users not found' },
          { status: 404 }
        );
      }
      
      // Create enrollments for each user, ignoring duplicates
      const results = await Promise.allSettled(
        userIds.map(async (userId) => {
          // Check if enrollment already exists
          const existingEnrollment = await prisma.enrollment.findFirst({
            where: {
              userId,
              courseId,
            },
          });
          
          if (existingEnrollment) {
            return { userId, status: 'skipped', reason: 'Already enrolled' };
          }
          
          // Create new enrollment
          return prisma.enrollment.create({
            data: {
              userId,
              courseId,
              status,
            },
          }).then(() => ({ userId, status: 'success' }));
        })
      );
      
      const successes = results.filter(r => r.status === 'fulfilled' && (r.value as any).status === 'success').length;
      const skipped = results.filter(r => r.status === 'fulfilled' && (r.value as any).status === 'skipped').length;
      const failures = results.filter(r => r.status === 'rejected').length;
      
      return NextResponse.json({
        message: `Enrollment completed: ${successes} enrolled, ${skipped} skipped, ${failures} failed`,
        details: results.map(r => r.status === 'fulfilled' ? r.value : { status: 'failed' }),
      }, { status: 201 });
    } else {
      // Single enrollment
      const validation = enrollmentSchema.safeParse(body);
      
      if (!validation.success) {
        return NextResponse.json(
          { error: validation.error.errors },
          { status: 400 }
        );
      }
      
      const { userId, courseId, status } = validation.data;
      
      // Check if user exists
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });
      
      if (!user) {
        return NextResponse.json(
          { error: 'User not found' },
          { status: 404 }
        );
      }
      
      // Check if course exists
      const course = await prisma.course.findUnique({
        where: { id: courseId },
      });
      
      if (!course) {
        return NextResponse.json(
          { error: 'Course not found' },
          { status: 404 }
        );
      }
      
      // Check if enrollment already exists
      const existingEnrollment = await prisma.enrollment.findFirst({
        where: {
          userId,
          courseId,
        },
      });
      
      if (existingEnrollment) {
        return NextResponse.json(
          { error: 'User is already enrolled in this course' },
          { status: 400 }
        );
      }
      
      // Create enrollment
      const enrollment = await prisma.enrollment.create({
        data: {
          userId,
          courseId,
          status,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          course: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      });
      
      return NextResponse.json(enrollment, { status: 201 });
    }
  } catch (error) {
    console.error('Error creating enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to create enrollment' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/enrollments - supports bulk delete by providing courseId and userIds
export async function DELETE(request: Request) {
  try {
    // Check if user is admin
    if (!await isAdmin()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');
    
    // Require at least one parameter
    if (!userId && !courseId) {
      return NextResponse.json(
        { error: 'At least one of userId or courseId is required' },
        { status: 400 }
      );
    }
    
    // Build query conditions
    const where: any = {};
    
    if (userId) where.userId = userId;
    if (courseId) where.courseId = courseId;
    
    // Delete enrollments matching the criteria
    const { count } = await prisma.enrollment.deleteMany({
      where,
    });
    
    return NextResponse.json({
      message: `${count} enrollment(s) deleted successfully`,
      count,
    });
  } catch (error) {
    console.error('Error deleting enrollments:', error);
    return NextResponse.json(
      { error: 'Failed to delete enrollments' },
      { status: 500 }
    );
  }
} 