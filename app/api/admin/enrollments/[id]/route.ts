import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';

// Validation schema for enrollment updates
const enrollmentUpdateSchema = z.object({
  status: z.enum(['active', 'completed', 'dropped']).optional(),
  progress: z.number().min(0).max(100).optional(),
});

// Helper function to check if user is admin
async function isAdmin() {
  const session = await getServerSession();
  return session?.user?.role === 'admin';
}

// GET /api/admin/enrollments/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check if user is admin
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: params.id },
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
            description: true,
          },
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }

    return NextResponse.json(enrollment);
  } catch (error) {
    console.error('Failed to fetch enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to fetch enrollment' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/enrollments/[id]
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check if user is admin
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Check if enrollment exists
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: { id: params.id },
    });

    if (!existingEnrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validation = enrollmentUpdateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors },
        { status: 400 }
      );
    }

    const validatedData = validation.data;

    // Update the enrollment
    const updatedEnrollment = await prisma.enrollment.update({
      where: { id: params.id },
      data: validatedData,
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
    console.error('Failed to update enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to update enrollment' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/enrollments/[id]
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Check if user is admin
  if (!(await isAdmin())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Check if enrollment exists
    const existingEnrollment = await prisma.enrollment.findUnique({
      where: { id: params.id },
    });

    if (!existingEnrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 });
    }

    // Delete the enrollment
    await prisma.enrollment.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete enrollment:', error);
    return NextResponse.json(
      { error: 'Failed to delete enrollment' },
      { status: 500 }
    );
  }
} 