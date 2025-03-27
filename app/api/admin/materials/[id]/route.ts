import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// Validation schema for material updates
const materialUpdateSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }).optional(),
  description: z.string().nullable().optional(),
  type: z.enum(['video', 'text', 'quiz', 'file']).optional(),
  content: z.string().nullable().optional(),
  duration: z.number().nullable().optional(),
  order: z.number().optional(),
  courseId: z.string().optional(),
});

// Helper function to check if user is admin
async function isAdmin() {
  const session = await getServerSession();
  return session?.user?.role === 'admin';
}

// GET /api/admin/materials/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check if user is admin
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const material = await prisma.material.findUnique({
      where: { id: params.id },
      include: {
        course: {
          select: {
            id: true,
            title: true,
          }
        }
      }
    });

    if (!material) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }

    return NextResponse.json(material);
  } catch (error) {
    console.error('Failed to fetch material:', error);
    return NextResponse.json(
      { error: 'Failed to fetch material' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/materials/[id]
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check if user is admin
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Check if material exists
    const existingMaterial = await prisma.material.findUnique({
      where: { id: params.id },
    });

    if (!existingMaterial) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = materialUpdateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    // If courseId is being updated, check if the course exists
    if (validatedData.courseId && validatedData.courseId !== existingMaterial.courseId) {
      const courseExists = await prisma.course.findUnique({
        where: { id: validatedData.courseId },
      });

      if (!courseExists) {
        return NextResponse.json(
          { error: 'Course not found' },
          { status: 400 }
        );
      }
    }

    // Update the material
    const updatedMaterial = await prisma.material.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        course: {
          select: {
            id: true,
            title: true,
          }
        }
      }
    });

    return NextResponse.json(updatedMaterial);
  } catch (error) {
    console.error('Failed to update material:', error);
    return NextResponse.json(
      { error: 'Failed to update material' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/materials/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check if user is admin
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Check if material exists
    const existingMaterial = await prisma.material.findUnique({
      where: { id: params.id },
    });

    if (!existingMaterial) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 });
    }

    // Delete the material
    await prisma.material.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete material:', error);
    return NextResponse.json(
      { error: 'Failed to delete material' },
      { status: 500 }
    );
  }
} 