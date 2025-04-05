import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth/options';
import { z } from 'zod';

// Validation schema for submission
const submissionSchema = z.object({
  content: z.string().min(1, 'Submission content is required'),
});

export async function POST(
  request: Request,
  { params }: { params: { courseId: string; assignmentId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = submissionSchema.parse(body);

    // Check if assignment exists and belongs to the course
    const assignment = await prisma.assignment.findUnique({
      where: {
        id: params.assignmentId,
        courseId: params.courseId,
      },
    });

    if (!assignment) {
      return NextResponse.json(
        { error: 'Assignment not found' },
        { status: 404 }
      );
    }

    // Check if the user already has a submission for this assignment
    const existingSubmission = await prisma.assignmentSubmission.findFirst({
      where: {
        userId: session.user.id,
        assignmentId: params.assignmentId,
      },
    });

    let submission;

    if (existingSubmission) {
      // Update existing submission
      submission = await prisma.assignmentSubmission.update({
        where: {
          id: existingSubmission.id
        },
        data: {
          content: validatedData.content,
          status: 'submitted',
        },
      });
    } else {
      // Create new submission
      submission = await prisma.assignmentSubmission.create({
        data: {
          content: validatedData.content,
          userId: session.user.id,
          assignmentId: params.assignmentId,
          status: 'submitted',
        },
      });
    }

    return NextResponse.json(submission);
  } catch (error) {
    console.error('Error submitting assignment:', error);
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
  { params }: { params: { courseId: string; assignmentId: string } }
) {
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

    const isInstructor = user?.role === 'instructor' || user?.role === 'admin';

    const submissions = await prisma.assignmentSubmission.findMany({
      where: {
        assignmentId: params.assignmentId,
        ...(isInstructor ? {} : { userId: session.user.id }),
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(submissions);
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 