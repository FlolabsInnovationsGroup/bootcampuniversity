import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { prisma } from '@/lib/prisma';

// Helper function to check if user is an admin
async function isAdmin(req: NextRequest) {
  const session = await getServerSession(authOptions);
  return session?.user?.role === 'admin';
}

// GET - Fetch materials (for a specific course if courseId is provided)
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
    const type = searchParams.get('type');
    const courseId = searchParams.get('courseId');
    const search = searchParams.get('search');
    
    // Build filter conditions
    const where: any = {
      ...(type && { type }),
      ...(courseId && { courseId }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };
    
    // Fetch materials with filters
    const materials = await prisma.material.findMany({
      where,
      include: {
        course: {
          select: {
            id: true,
            title: true,
          },
        },
        _count: {
          select: {
            progress: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    
    return NextResponse.json({ materials });
  } catch (error) {
    console.error('Error fetching materials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch materials' },
      { status: 500 }
    );
  }
}

// POST - Create a new material
export async function POST(req: NextRequest) {
  try {
    // Check if user is admin
    if (!await isAdmin(req)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }
    
    // Validate required fields
    const body = await req.json();
    const { courseId, title, type, content, url, order } = body;
    
    // Validate required fields
    if (!courseId || !title || !type) {
      return NextResponse.json(
        { error: 'Course ID, title, and type are required fields' },
        { status: 400 }
      );
    }
    
    // Check if course exists
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });
    
    if (!course) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }
    
    // Determine the order if not provided
    let materialOrder = order;
    if (materialOrder === undefined) {
      // Get the highest order for materials in this course
      const highestOrder = await prisma.material.findFirst({
        where: { courseId },
        orderBy: { order: 'desc' },
        select: { order: true },
      });
      
      materialOrder = highestOrder ? highestOrder.order + 1 : 1;
    }
    
    // Create material
    const material = await prisma.material.create({
      data: {
        courseId,
        title,
        type,
        content: content || '',
        url: url || null,
        order: materialOrder,
      },
    });
    
    return NextResponse.json({ material }, { status: 201 });
  } catch (error) {
    console.error('Error creating material:', error);
    return NextResponse.json(
      { error: 'Failed to create material' },
      { status: 500 }
    );
  }
}

// PUT - Update an existing material
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
    const { id, title, type, content, order, courseId, url } = body;
    
    // Validate required fields
    if (!id) {
      return NextResponse.json(
        { error: 'Material ID is required' },
        { status: 400 }
      );
    }
    
    // Check if material exists
    const existingMaterial = await prisma.material.findUnique({
      where: { id },
    });
    
    if (!existingMaterial) {
      return NextResponse.json(
        { error: 'Material not found' },
        { status: 404 }
      );
    }
    
    // Prepare update data
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (type !== undefined) updateData.type = type;
    if (content !== undefined) updateData.content = content;
    if (url !== undefined) updateData.url = url;
    if (order !== undefined) updateData.order = order;
    if (courseId !== undefined) {
      // Check if course exists if changing courseId
      const course = await prisma.course.findUnique({
        where: { id: courseId },
      });
      
      if (!course) {
        return NextResponse.json(
          { error: 'Course not found' },
          { status: 404 }
        );
      }
      
      updateData.courseId = courseId;
    }
    
    // Update material
    const updatedMaterial = await prisma.material.update({
      where: { id },
      data: updateData,
    });
    
    return NextResponse.json({ material: updatedMaterial });
  } catch (error) {
    console.error('Error updating material:', error);
    return NextResponse.json(
      { error: 'Failed to update material' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a material
export async function DELETE(req: NextRequest) {
  try {
    // Check if user is admin
    if (!await isAdmin(req)) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin access required.' },
        { status: 403 }
      );
    }
    
    // Get material ID from query params
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: 'Material ID is required' },
        { status: 400 }
      );
    }
    
    // Check if material exists
    const existingMaterial = await prisma.material.findUnique({
      where: { id },
    });
    
    if (!existingMaterial) {
      return NextResponse.json(
        { error: 'Material not found' },
        { status: 404 }
      );
    }
    
    // Delete material
    await prisma.material.delete({
      where: { id },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting material:', error);
    return NextResponse.json(
      { error: 'Failed to delete material' },
      { status: 500 }
    );
  }
}
