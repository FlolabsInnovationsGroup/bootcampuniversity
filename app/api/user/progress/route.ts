import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { prisma } from '@/lib/prisma';

// Define interfaces based on the Prisma schema
interface MaterialProgressWithMaterial {
  id: string;
  userId: string;
  materialId: string;
  progress: number;
  notes: string | null;
  bookmarks: string | null;
  lastPosition: number;
  createdAt: Date;
  updatedAt: Date;
  material: {
    id: string;
    title: string;
    description: string | null;
    type: string;
    courseId: string;
    course: {
      id: string;
      title: string;
    };
  };
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || session.user.id;
    
    // Check if the requesting user matches the requested userId or is an admin
    if (userId !== session.user.id && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized to access this user data' },
        { status: 403 }
      );
    }

    // Get user material progress with material details
    const materials = await prisma.materialProgress.findMany({
      where: {
        userId: userId,
      },
      include: {
        material: {
          select: {
            id: true,
            title: true,
            description: true,
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

    // Calculate statistics
    const totalItems = materials.length;
    const completedItems = materials.filter((item: MaterialProgressWithMaterial) => item.progress === 100).length;
    const inProgressItems = materials.filter((item: MaterialProgressWithMaterial) => item.progress > 0 && item.progress < 100).length;
    const totalBookmarks = materials.reduce((count: number, item: MaterialProgressWithMaterial) => {
      try {
        const bookmarks = item.bookmarks ? JSON.parse(item.bookmarks) : [];
        return count + bookmarks.length;
      } catch {
        return count;
      }
    }, 0);
    
    const totalProgress = materials.reduce((sum: number, item: MaterialProgressWithMaterial) => sum + item.progress, 0);
    const averageCompletion = totalItems > 0 ? Math.round(totalProgress / totalItems) : 0;

    return NextResponse.json({
      materials,
      statistics: {
        completedMaterials: completedItems,
        inProgressMaterials: inProgressItems,
        totalBookmarks,
        averageCompletion,
      }
    });
  } catch (error) {
    console.error('Error fetching user progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress data' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get request body
    const body = await req.json();
    const { materialId, progress, notes, bookmarks, lastPosition } = body;
    
    if (!materialId) {
      return NextResponse.json(
        { error: 'Material ID is required' },
        { status: 400 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
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

    // Update or create material progress
    const materialProgress = await prisma.materialProgress.upsert({
      where: {
        userId_materialId: {
          userId: user.id,
          materialId,
        },
      },
      update: {
        progress: progress !== undefined ? progress : undefined,
        notes: notes !== undefined ? notes : undefined,
        bookmarks: bookmarks !== undefined ? JSON.stringify(bookmarks) : undefined,
        lastPosition: lastPosition !== undefined ? lastPosition : undefined,
      },
      create: {
        userId: user.id,
        materialId,
        progress: progress || 0,
        notes,
        bookmarks: bookmarks ? JSON.stringify(bookmarks) : null,
        lastPosition: lastPosition || 0,
      },
    });

    return NextResponse.json({ materialProgress });
  } catch (error) {
    console.error('Error updating user progress:', error);
    return NextResponse.json(
      { error: 'Failed to update progress data' },
      { status: 500 }
    );
  }
}
