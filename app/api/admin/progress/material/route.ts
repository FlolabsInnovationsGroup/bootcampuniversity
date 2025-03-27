import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// Validation schema for material progress updates
const materialProgressSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  materialId: z.string().min(1, 'Material ID is required'),
  progress: z.number().min(0).max(100).optional(),
  notes: z.string().optional().nullable(),
  bookmarks: z.string().optional().nullable(),
  lastPosition: z.number().min(0).optional(),
});

// Helper function to check if user is admin
async function isAdmin() {
  const session = await getServerSession();
  return session?.user?.role === 'admin';
}

// GET /api/admin/progress/material
export async function GET(request: Request) {
  try {
    // Check if user is admin
    if (!(await isAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const materialId = searchParams.get('materialId');

    if (!userId && !materialId) {
      return NextResponse.json(
        { error: 'At least one of userId or materialId is required' },
        { status: 400 }
      );
    }

    // Build query conditions
    const where: any = {};
    
    if (userId) where.userId = userId;
    if (materialId) where.materialId = materialId;

    // Get material progress entries
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
  } catch (error) {
    console.error('Error fetching material progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch material progress' },
      { status: 500 }
    );
  }
}

// POST /api/admin/progress/material - Create or update material progress
export async function POST(request: Request) {
  try {
    // Check if user is admin
    if (!(await isAdmin())) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate the request body
    const body = await request.json();
    const validation = materialProgressSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      );
    }

    const { userId, materialId, progress, notes, bookmarks, lastPosition } = validation.data;

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

    // Check if material exists
    const material = await prisma.material.findUnique({
      where: { id: materialId },
    });

    if (!material) {
      return NextResponse.json(
        { error: 'Material not found' },
        { status: 404 }
      );
    }

    // Prepare data to update
    const data: any = {};
    if (progress !== undefined) data.progress = progress;
    if (notes !== undefined) data.notes = notes;
    if (bookmarks !== undefined) data.bookmarks = bookmarks;
    if (lastPosition !== undefined) data.lastPosition = lastPosition;

    // Check if progress entry already exists
    const existingProgress = await prisma.materialProgress.findUnique({
      where: {
        userId_materialId: {
          userId,
          materialId,
        },
      },
    });

    let result;

    if (existingProgress) {
      // Update existing progress
      result = await prisma.materialProgress.update({
        where: {
          userId_materialId: {
            userId,
            materialId,
          },
        },
        data,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          material: {
            select: {
              id: true,
              title: true,
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
      });
    } else {
      // Create new progress entry
      result = await prisma.materialProgress.create({
        data: {
          userId,
          materialId,
          progress: progress || 0,
          notes,
          bookmarks,
          lastPosition: lastPosition || 0,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          material: {
            select: {
              id: true,
              title: true,
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
      });
    }

    // Update enrollment progress if material progress is updated
    if (progress !== undefined && material.courseId) {
      // Get all material progress for this user and course
      const allMaterialProgress = await prisma.materialProgress.findMany({
        where: {
          userId,
          material: {
            courseId: material.courseId,
          },
        },
        include: {
          material: {
            select: {
              id: true,
            },
          },
        },
      });

      // Get all materials for this course
      const allMaterials = await prisma.material.findMany({
        where: {
          courseId: material.courseId,
        },
        select: {
          id: true,
        },
      });

      // Calculate overall course progress
      const totalMaterials = allMaterials.length;
      const completedMaterials = allMaterialProgress.filter((mp: any) => mp.progress >= 100).length;
      const overallProgress = totalMaterials > 0 
        ? Math.round((completedMaterials / totalMaterials) * 100) 
        : 0;

      // Find enrollment and update progress
      await prisma.enrollment.updateMany({
        where: {
          userId,
          courseId: material.courseId,
        },
        data: {
          progress: overallProgress,
        },
      });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error updating material progress:', error);
    return NextResponse.json(
      { error: 'Failed to update material progress' },
      { status: 500 }
    );
  }
} 