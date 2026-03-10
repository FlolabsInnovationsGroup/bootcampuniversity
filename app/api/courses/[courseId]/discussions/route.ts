import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth/options';
import { z } from 'zod';

// Validation schema for discussion creation
const discussionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
});

export async function POST(request: Request, props: { params: Promise<{ courseId: string }> }) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = discussionSchema.parse(body);

    const discussion = await prisma.discussion.create({
      data: {
        title: validatedData.title,
        content: validatedData.content,
        courseId: params.courseId,
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(discussion);
  } catch (error) {
    console.error('Error creating discussion:', error);
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

    const discussions = await prisma.discussion.findMany({
      where: {
        courseId: params.courseId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(discussions);
  } catch (error) {
    console.error('Error fetching discussions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 