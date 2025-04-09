import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { prisma } from '@/lib/prisma';
import { MaterialProgressWithMaterial } from '@/types/models';
import { Prisma } from '@prisma/client';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const materials = await prisma.materialProgress.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        id: true,
        userId: true,
        materialId: true,
        status: true,
        progress: true,
        notes: true,
        bookmarks: true,
        lastPosition: true,
        createdAt: true,
        updatedAt: true,
        material: {
          select: {
            id: true,
            title: true,
            type: true,
            url: true,
            createdAt: true,
            updatedAt: true
          }
        }
      }
    });

    const totalItems = materials.length;
    const completedItems = materials.filter(item => item.progress === 100).length;
    const inProgressItems = materials.filter(item => item.progress > 0 && item.progress < 100).length;
    const totalBookmarks = materials.reduce((count, item) => {
      if (item.bookmarks) {
        try {
          const bookmarks = JSON.parse(item.bookmarks as string);
          return count + (Array.isArray(bookmarks) ? bookmarks.length : 0);
        } catch {
          return count;
        }
      }
      return count;
    }, 0);

    const totalProgress = materials.reduce((sum, item) => sum + (item.progress || 0), 0);
    const averageCompletion = totalItems > 0 ? Math.round(totalProgress / totalItems) : 0;

    return NextResponse.json({
      totalItems,
      completedItems,
      inProgressItems,
      totalBookmarks,
      averageCompletion,
      materials: materials.map(item => ({
        id: item.id,
        materialId: item.materialId,
        status: item.status,
        progress: item.progress,
        notes: item.notes,
        bookmarks: item.bookmarks ? JSON.parse(item.bookmarks as string) : null,
        lastPosition: item.lastPosition,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        material: item.material,
      })),
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Failed to fetch progress' },
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
        bookmarks: bookmarks ? JSON.stringify(bookmarks) : Prisma.JsonNull,
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
