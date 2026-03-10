import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth/options';
import { z } from 'zod';

// Validation schema for assignment creation
const assignmentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  dueDate: z.string().datetime(),
});

export async function POST(request: Request, props: { params: Promise<{ courseId: string }> }) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is instructor or admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { role: true },
    });

    if (!user || (user.role !== 'instructor' && user.role !== 'admin')) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = assignmentSchema.parse(body);

    const assignment = await prisma.assignment.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        dueDate: new Date(validatedData.dueDate),
        courseId: params.courseId,
      },
    });

    return NextResponse.json(assignment);
  } catch (error) {
    console.error('Error creating assignment:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request, props: { params: Promise<{ courseId: string }> }) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const assignments = await prisma.assignment.findMany({
      where: {
        courseId: params.courseId,
      },
      include: {
        submissions: {
          where: {
            userId: session.user.id,
          },
        },
      },
      orderBy: {
        dueDate: 'asc',
      },
    });

    return NextResponse.json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 