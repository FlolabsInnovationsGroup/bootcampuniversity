import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth/options';

// Validation schemas
const statusSchema = z.object({
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED']),
});

const noteSchema = z.object({
  content: z.string(),
});

const bookmarkSchema = z.object({
  id: z.string(),
  time: z.number(),
  label: z.string(),
  timestamp: z.string()
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
        status: 'NOT_STARTED',
      });
    }

    return NextResponse.json({
      status: materialProgress.status,
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

    // Validate and update status
    if ('status' in body) {
      const { status } = statusSchema.parse({ status: body.status });
      updates.status = status;
    }

    // If no valid updates, return error
    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { error: 'No valid updates provided' },
        { status: 400 }
      );
    }

    // Find existing material progress
    const existingProgress = await prisma.materialProgress.findFirst({
      where: {
        userId: session.user.id,
        materialId: params.materialId,
      },
    });

    let materialProgress;
    
    if (existingProgress) {
      // Update existing progress
      materialProgress = await prisma.materialProgress.update({
        where: { id: existingProgress.id },
        data: updates,
      });
    } else {
      // Create new progress entry
      materialProgress = await prisma.materialProgress.create({
        data: {
          userId: session.user.id,
          materialId: params.materialId,
          ...updates,
        },
      });
    }

    // Return sanitized response
    return NextResponse.json({
      id: materialProgress.id,
      materialId: materialProgress.materialId,
      status: materialProgress.status,
      createdAt: materialProgress.createdAt,
      updatedAt: materialProgress.updatedAt
    });
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

    // Find and delete material progress
    const existingProgress = await prisma.materialProgress.findFirst({
      where: {
        userId: session.user.id,
        materialId: params.materialId,
      },
    });

    if (existingProgress) {
      await prisma.materialProgress.delete({
        where: { id: existingProgress.id },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete material data:', error);
    return NextResponse.json(
      { error: 'Failed to delete material data' },
      { status: 500 }
    );
  }
} 