import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// Helper function to check if user is admin
async function isAdmin() {
  const session = await getServerSession();
  return session?.user?.role === 'admin';
}

// GET /api/admin/progress
export async function GET(request: Request) {
  try {
    // Check if user is admin
    if (!(await isAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const courseId = searchParams.get('courseId');
    const materialId = searchParams.get('materialId');
    const minProgress = searchParams.get('minProgress');
    const maxProgress = searchParams.get('maxProgress');

    // Build query conditions
    const where: any = {};

    // Filter by specific user if provided
    if (userId) {
      where.userId = userId;
    }

    // Filter by material if provided
    if (materialId) {
      where.materialId = materialId;
      
      // If filtering by material, we get MaterialProgress entries
      const materialProgress = await prisma.materialProgress.findMany({
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
          material: {
            select: {
              id: true,
              title: true,
              type: true,
              courseId: true,
              course: {
                select: {
                  id: true,
                  title: true,
                },
              },
            },
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });

      return NextResponse.json(materialProgress);
    }

    // If we're filtering by course or no filters provided, get aggregated progress by course
    const enrollmentWhere: any = {};
    
    if (userId) {
      enrollmentWhere.userId = userId;
    }
    
    if (courseId) {
      enrollmentWhere.courseId = courseId;
    }
    
    if (minProgress) {
      enrollmentWhere.progress = {
        ...enrollmentWhere.progress,
        gte: parseFloat(minProgress),
      };
    }
    
    if (maxProgress) {
      enrollmentWhere.progress = {
        ...enrollmentWhere.progress,
        lte: parseFloat(maxProgress),
      };
    }

    // Get enrollments with related user and course data
    const enrollments = await prisma.enrollment.findMany({
      where: enrollmentWhere,
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
            materials: {
              select: {
                id: true, 
                title: true,
                type: true,
                order: true,
              },
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
      },
      orderBy: [
        { updatedAt: 'desc' },
      ],
    });

    // For each enrollment, get detailed material progress
    const progressWithDetails = await Promise.all(
      enrollments.map(async (enrollment: any) => {
        const materialProgresses = await prisma.materialProgress.findMany({
          where: {
            userId: enrollment.userId,
            material: {
              courseId: enrollment.courseId,
            },
          },
          include: {
            material: {
              select: {
                id: true,
                title: true,
                type: true,
                order: true,
              },
            },
          },
          orderBy: {
            material: {
              order: 'asc',
            },
          },
        });

        // Calculate statistics
        const totalMaterials = enrollment.course.materials.length;
        const completedMaterials = materialProgresses.filter((mp: any) => mp.progress >= 100).length;
        const inProgressMaterials = materialProgresses.filter((mp: any) => mp.progress > 0 && mp.progress < 100).length;
        const notStartedMaterials = totalMaterials - completedMaterials - inProgressMaterials;
        
        return {
          ...enrollment,
          materialProgresses,
          stats: {
            totalMaterials,
            completedMaterials,
            inProgressMaterials,
            notStartedMaterials,
            completionPercentage: totalMaterials > 0 
              ? Math.round((completedMaterials / totalMaterials) * 100) 
              : 0,
          },
        };
      })
    );

    return NextResponse.json(progressWithDetails);
  } catch (error) {
    console.error('Error fetching progress data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress data' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/progress
export async function PATCH(request: Request) {
  try {
    // Check if user is admin
    if (!(await isAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse the request body
    const body = await request.json();
    const { userId, enrollmentId, progress } = body;

    if (!enrollmentId || typeof progress !== 'number' || progress < 0 || progress > 100) {
      return NextResponse.json(
        { error: 'Invalid request data. EnrollmentId and progress (0-100) are required.' },
        { status: 400 }
      );
    }

    // Update the enrollment status based on progress
    const updatedEnrollment = await prisma.enrollment.update({
      where: { id: enrollmentId },
      data: { 
        status: progress === 100 ? 'completed' : 'active'
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

    return NextResponse.json(updatedEnrollment);
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    );
  }
} 