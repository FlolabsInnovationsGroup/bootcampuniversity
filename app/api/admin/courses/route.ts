import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { importCourseContent } from '@/lib/course-importer';
import { logActivity } from '@/lib/activity-logger';

// Helper function to check if user is an admin
async function isAdmin(req: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user?.email) {
    return false;
  }
  
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { role: true },
  });
  
  return user?.role === 'admin';
}

// GET - Fetch all courses (with optional filtering)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    
    const where: any = {
      ...(query && {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
        ],
      }),
      ...(category && { category }),
      ...(status && { status }),
    };
    
    const courses = await prisma.course.findMany({
      where,
      include: {
        _count: {
          select: {
            materials: true,
            enrollments: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
}

// POST - Create a new course
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const {
      title,
      description,
      sourceType,
      sourceUrl,
      category,
      level,
      estimatedHours,
    } = await req.json();

    const course = await prisma.course.create({
      data: {
        title,
        description,
        sourceType,
        sourceUrl: sourceUrl || '',
        category,
        level,
        estimatedHours,
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
      details: `Created course: ${title} (${sourceType})`
    });

    if (sourceType !== 'CUSTOM' && sourceUrl) {
      const materials = await importCourseContent(sourceType, sourceUrl);
      
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

    return NextResponse.json({ course });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { error: 'Failed to create course' },
      { status: 500 }
    );
  }
}

// PUT - Update an existing course
export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }
    
    const body = await req.json();
    const { id, title, description, category, status, level, estimatedHours } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }
    
    const existingCourse = await prisma.course.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        status: true,
        level: true,
        estimatedHours: true,
      },
    });
    
    if (!existingCourse) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    const updateData = {
      title: title || existingCourse.title,
      description: description || existingCourse.description,
      category: category || existingCourse.category,
      status: status || existingCourse.status,
      level: level || existingCourse.level,
      estimatedHours: estimatedHours || existingCourse.estimatedHours,
    };
    
    const updatedCourse = await prisma.course.update({
      where: { id },
      data: updateData,
    });

    // Log course update with changed fields
    const changes = Object.entries(updateData)
      .filter(([key, value]) => {
        const k = key as keyof typeof existingCourse;
        return value !== undefined && value !== existingCourse[k];
      })
      .map(([key, value]) => {
        const k = key as keyof typeof existingCourse;
        return `${key}: ${existingCourse[k]} → ${value}`;
      })
      .join(', ');

    await logActivity({
      userId: session.user.id,
      action: 'updated',
      entityType: 'course',
      entityId: id,
      details: `Updated course: ${existingCourse.title} - Changes: ${changes}`,
    });
    
    return NextResponse.json({ course: updatedCourse });
  } catch (error) {
    console.error('Error updating course:', error);
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a course
export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }
    
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }
    
    const existingCourse = await prisma.course.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
      },
    });
    
    if (!existingCourse) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    await prisma.course.delete({
      where: { id },
    });

    // Log course deletion
    await logActivity({
      userId: session.user.id,
      action: 'deleted',
      entityType: 'course',
      entityId: id,
      details: `Deleted course: ${existingCourse.title}`
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    );
  }
}
