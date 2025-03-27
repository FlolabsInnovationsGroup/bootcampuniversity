import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// Helper function to check if user is admin
async function isAdmin() {
  const session = await getServerSession();
  return session?.user?.role === 'admin';
}

// GET /api/admin/materials/by-course/[courseId]
export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  // Check if user is admin
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Check if the course exists
    const course = await prisma.course.findUnique({
      where: { id: params.courseId },
    });

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 });
    }

    // Get materials for this course
    const materials = await prisma.material.findMany({
      where: { courseId: params.courseId },
      orderBy: { order: 'asc' },
      include: {
        course: {
          select: {
            id: true,
            title: true,
          }
        }
      }
    });

    return NextResponse.json(materials);
  } catch (error) {
    console.error('Failed to fetch materials for course:', error);
    return NextResponse.json(
      { error: 'Failed to fetch materials' },
      { status: 500 }
    );
  }
} 