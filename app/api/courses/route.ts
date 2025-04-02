import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';

const courseSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  coverImage: z.string().url().optional(),
  status: z.enum(['draft', 'published']),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (session.user.role !== 'admin') {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const json = await req.json();
    const body = courseSchema.parse(json);

    const course = await prisma.course.create({
      data: {
        title: body.title,
        description: body.description,
        category: body.category,
        coverImage: body.coverImage,
        status: body.status,
      },
    });

    return NextResponse.json(course);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse('Invalid request data', { status: 422 });
    }

    return new NextResponse('Internal error', { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (session.user.role !== 'admin') {
      return new NextResponse('Forbidden', { status: 403 });
    }

    const courses = await prisma.course.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 });
  }
}
