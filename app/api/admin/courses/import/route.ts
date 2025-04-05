import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { importCourseContent } from '@/lib/course-importer';
import { prisma } from '@/lib/prisma';
import { logActivity } from '@/lib/activity-logger';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { sourceType, sourceUrl, title, category, level, estimatedHours } = await req.json();

    // Create the course first
    const course = await prisma.course.create({
      data: {
        title,
        description: `Imported course: ${title} from ${sourceType} source`,
        category,
        level,
        estimatedHours,
        sourceType,
        sourceUrl,
        status: 'DRAFT',
        creator: {
          connect: {
            id: session.user.id
          }
        }
      },
    });

    // Log course creation
    await logActivity({
      userId: session.user.id,
      action: 'created',
      entityType: 'course',
      entityId: course.id,
      details: `Imported course: ${title} from ${sourceType} source: ${sourceUrl}`
    });

    // Import materials from the source
    const materials = await importCourseContent(sourceType, sourceUrl);

    // Create materials in the database
    await prisma.material.createMany({
      data: materials.map((material, index) => ({
        courseId: course.id,
        type: material.type,
        title: material.title,
        url: material.url,
        content: material.content,
        order: index + 1,
      })),
    });

    // Log materials import
    await logActivity({
      userId: session.user.id,
      action: 'imported',
      entityType: 'material',
      entityId: course.id,
      details: `Imported ${materials.length} materials for course: ${title}`
    });

    return NextResponse.json({ course, materialsCount: materials.length });
  } catch (error) {
    console.error('Error importing course:', error);
    return NextResponse.json(
      { error: 'Failed to import course' },
      { status: 500 }
    );
  }
} 