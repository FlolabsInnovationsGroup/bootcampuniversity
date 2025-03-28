import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { prisma } from '@/lib/prisma';

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
    // Check if user is admin
    if (!await isAdmin(req)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }

    // Get query parameters
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');
    
    // Build filter conditions
    const where: any = {};
    if (status) where.status = status;
    if (category) where.category = category;
    
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
    // Check if user is admin
    if (!await isAdmin(req)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }
    
    // Get request body
    const body = await req.json();
    const { title, description, category, status, coverImage, duration } = body;
    
    // Validate required fields
    if (!title || !description || !category) {
      return NextResponse.json(
        { error: 'Title, description, and category are required fields' },
        { status: 400 }
      );
    }
    
    // Create course
    const course = await prisma.course.create({
      data: {
        title,
        description,
        category,
        status: status || 'draft',
        coverImage,
        duration: duration ? parseInt(duration) : null,
      },
    });
    
    return NextResponse.json({ course }, { status: 201 });
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
    // Check if user is admin
    if (!await isAdmin(req)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }
    
    // Get request body
    const body = await req.json();
    const { id, title, description, category, status, coverImage, duration } = body;
    
    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }
    
    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });
    
    if (!existingCourse) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    // Update course
    const updatedCourse = await prisma.course.update({
      where: { id },
      data: {
        title: title || existingCourse.title,
        description: description || existingCourse.description,
        category: category || existingCourse.category,
        status: status || existingCourse.status,
        coverImage: coverImage !== undefined ? coverImage : existingCourse.coverImage,
        duration: duration !== undefined ? parseInt(duration) : existingCourse.duration,
      },
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
    // Check if user is admin
    if (!await isAdmin(req)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }
    
    // Get course ID from query params
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Course ID is required' },
        { status: 400 }
      );
    }
    
    // Check if course exists
    const existingCourse = await prisma.course.findUnique({
      where: { id },
    });
    
    if (!existingCourse) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    // Delete course (will cascade delete materials due to relationship)
    await prisma.course.delete({
      where: { id },
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
