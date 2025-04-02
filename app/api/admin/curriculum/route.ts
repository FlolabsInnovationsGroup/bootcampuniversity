import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Validation schemas
const ModuleSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  type: z.enum(['video', 'quiz', 'assignment', 'reading']),
  duration: z.number().min(0),
  order: z.number().min(0),
});

const SectionSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  modules: z.array(ModuleSchema),
});

const CurriculumSchema = z.array(SectionSchema);

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return new NextResponse('Course ID is required', { status: 400 });
    }

    const curriculum = await prisma.curriculum.findUnique({
      where: { courseId },
      include: {
        sections: {
          include: {
            modules: {
              orderBy: { order: 'asc' }
            }
          },
          orderBy: { order: 'asc' }
        }
      }
    });

    return NextResponse.json(curriculum);
  } catch (error) {
    console.error('Error fetching curriculum:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return new NextResponse('Course ID is required', { status: 400 });
    }

    const body = await req.json();
    
    // Validate request body
    const validatedData = CurriculumSchema.parse(body);

    // Start a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Delete existing curriculum sections and modules
      await tx.module.deleteMany({
        where: {
          section: {
            curriculum: {
              courseId
            }
          }
        }
      });

      await tx.section.deleteMany({
        where: {
          curriculum: {
            courseId
          }
        }
      });

      // Create new curriculum if it doesn't exist
      const curriculum = await tx.curriculum.upsert({
        where: { courseId },
        create: { courseId },
        update: {}
      });

      // Create new sections and modules
      for (const [sectionIndex, section] of validatedData.entries()) {
        const newSection = await tx.section.create({
          data: {
            title: section.title,
            order: sectionIndex,
            curriculumId: curriculum.id,
            modules: {
              create: section.modules.map((module, moduleIndex) => ({
                title: module.title,
                description: module.description,
                type: module.type,
                duration: module.duration,
                order: moduleIndex
              }))
            }
          }
        });
      }

      return curriculum;
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 });
    }
    console.error('Error saving curriculum:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      return new NextResponse('Course ID is required', { status: 400 });
    }

    const body = await req.json();
    const validatedData = CurriculumSchema.parse(body);

    const result = await prisma.curriculum.update({
      where: { courseId },
      data: {
        sections: {
          deleteMany: {},
          create: validatedData.map((section, index) => ({
            title: section.title,
            order: index,
            modules: {
              create: section.modules.map((module, moduleIndex) => ({
                title: module.title,
                description: module.description,
                type: module.type,
                duration: module.duration,
                order: moduleIndex
              }))
            }
          }))
        }
      },
      include: {
        sections: {
          include: {
            modules: true
          }
        }
      }
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify(error.errors), { status: 400 });
    }
    console.error('Error updating curriculum:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 