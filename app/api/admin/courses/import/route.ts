import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { importCourseContent, SourceType } from '@/lib/course-importer';
import { prisma } from '@/lib/prisma';
import { logActivity } from '@/lib/activity-logger';
import sharp from 'sharp';
import path from 'path';
import { writeFile, mkdir } from 'fs/promises';

type CourseSourceType = SourceType | 'CUSTOM';

async function saveImage(file: File): Promise<string> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Optimize image with sharp
  const optimizedImage = await sharp(buffer)
    .resize(800, 600, { fit: 'cover' })
    .jpeg({ quality: 80 })
    .toBuffer();

  // Create uploads directory if it doesn't exist
  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'courses');
  await mkdir(uploadDir, { recursive: true });

  // Generate unique filename
  const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '')}`;
  const filePath = path.join(uploadDir, filename);

  // Save the optimized image
  await writeFile(filePath, optimizedImage);

  // Return the public URL
  return `/uploads/courses/${filename}`;
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse multipart form data
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const sourceType = formData.get('sourceType') as CourseSourceType;
    const sourceUrl = formData.get('sourceUrl') as string;
    const category = formData.get('category') as string;
    const level = formData.get('level') as string;
    const estimatedHours = parseInt(formData.get('estimatedHours') as string);
    const imageFile = formData.get('image') as File | null;

    // Process image if provided
    let imageUrl = null;
    if (imageFile) {
      imageUrl = await saveImage(imageFile);
    }

    // Create the course
    const course = await prisma.course.create({
      data: {
        title,
        description: 'No description provided',
        category,
        level,
        estimatedHours,
        sourceType,
        sourceUrl,
        image: imageUrl,
        status: 'DRAFT',
        creatorId: session.user.id,
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

    // Import materials only for non-custom courses
    let materials = [];
    if (sourceType !== 'CUSTOM' && sourceUrl) {
      materials = await importCourseContent(sourceType, sourceUrl);

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
    }

    return NextResponse.json({ course, materialsCount: materials.length });
  } catch (error) {
    console.error('Error importing course:', error);
    return NextResponse.json(
      { error: 'Failed to import course' },
      { status: 500 }
    );
  }
} 