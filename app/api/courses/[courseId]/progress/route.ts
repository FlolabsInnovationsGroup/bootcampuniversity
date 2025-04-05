import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth/options';
import { z } from 'zod';

// Validation schema for progress update
const progressSchema = z.object({
  moduleId: z.string(),
  status: z.enum(['not_started', 'in_progress', 'completed']),
});

export async function POST(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = progressSchema.parse(body);

    // Check if module exists and belongs to the course
    const module = await prisma.module.findFirst({
      where: {
        id: validatedData.moduleId,
        section: {
          curriculum: {
            courseId: params.courseId
          }
        }
      },
    });

    if (!module) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      );
    }

    const progress = await prisma.courseProgress.upsert({
      where: {
        userId_moduleId: {
          userId: session.user.id,
          moduleId: validatedData.moduleId,
        },
      },
      update: {
        status: validatedData.status,
        completedAt: validatedData.status === 'completed' ? new Date() : null,
      },
      create: {
        userId: session.user.id,
        courseId: params.courseId,
        moduleId: validatedData.moduleId,
        status: validatedData.status,
        completedAt: validatedData.status === 'completed' ? new Date() : null,
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error updating progress:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: { courseId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const progress = await prisma.courseProgress.findMany({
      where: {
        courseId: params.courseId,
        userId: session.user.id,
      },
      include: {
        module: {
          select: {
            id: true,
            title: true,
            order: true,
          },
        },
      },
      orderBy: {
        module: {
          order: 'asc',
        },
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 