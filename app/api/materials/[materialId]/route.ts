import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Validation schemas
const progressSchema = z.object({
  progress: z.number().min(0).max(100),
});

const noteSchema = z.object({
  content: z.string(),
});

const bookmarkSchema = z.object({
  time: z.number(),
  label: z.string(),
});

// GET /api/materials/[materialId]
export async function GET(
  request: Request,
  { params }: { params: { materialId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const materialProgress = await prisma.materialProgress.findUnique({
      where: {
        userId_materialId: {
          userId: session.user.id,
          materialId: params.materialId,
        },
      },
    });

    if (!materialProgress) {
      return NextResponse.json({
        progress: 0,
        notes: '',
        bookmarks: [],
        lastPosition: 0,
      });
    }

    return NextResponse.json({
      progress: materialProgress.progress,
      notes: materialProgress.notes || '',
      bookmarks: materialProgress.bookmarks || [],
      lastPosition: materialProgress.lastPosition,
    });
  } catch (error) {
    console.error('Failed to fetch material data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch material data' },
      { status: 500 }
    );
  }
}

// PATCH /api/materials/[materialId]
export async function PATCH(
  request: Request,
  { params }: { params: { materialId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const updates: Record<string, any> = {};

    // Validate and update progress
    if ('progress' in body) {
      const { progress } = progressSchema.parse(body);
      updates.progress = progress;
    }

    // Update notes
    if ('notes' in body) {
      const { content } = noteSchema.parse({ content: body.notes });
      updates.notes = content;
    }

    // Update bookmarks
    if ('bookmarks' in body) {
      const bookmarks = z.array(bookmarkSchema).parse(body.bookmarks);
      updates.bookmarks = bookmarks;
    }

    // Update last position
    if ('lastPosition' in body) {
      const lastPosition = z.number().min(0).parse(body.lastPosition);
      updates.lastPosition = lastPosition;
    }

    // Update or create material progress
    const materialProgress = await prisma.materialProgress.upsert({
      where: {
        userId_materialId: {
          userId: session.user.id,
          materialId: params.materialId,
        },
      },
      update: updates,
      create: {
        userId: session.user.id,
        materialId: params.materialId,
        ...updates,
      },
    });

    return NextResponse.json(materialProgress);
  } catch (error) {
    console.error('Failed to update material data:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    const errorMessage = error instanceof Error ? error.message : 'Failed to update material data';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// DELETE /api/materials/[materialId]
export async function DELETE(
  request: Request,
  { params }: { params: { materialId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await prisma.materialProgress.delete({
      where: {
        userId_materialId: {
          userId: session.user.id,
          materialId: params.materialId,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete material data:', error);
    return NextResponse.json(
      { error: 'Failed to delete material data' },
      { status: 500 }
    );
  }
} 