import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, props: { params: Promise<{ courseId: string }> }) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const course = await prisma.course.findUnique({
      where: { id: params.courseId },
      include: {
        materials: {
          orderBy: { order: 'asc' },
        },
        _count: {
          select: {
            enrollments: true,
          },
        },
      },
    })

    if (!course) {
      return NextResponse.json({ error: 'Course not found' }, { status: 404 })
    }

    return NextResponse.json({ course })
  } catch (error) {
    console.error('Error fetching course:', error)
    return NextResponse.json(
      { error: 'Failed to fetch course' },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest, props: { params: Promise<{ courseId: string }> }) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, description, category, level, estimatedHours, status } = await req.json()

    const course = await prisma.course.update({
      where: { id: params.courseId },
      data: {
        title,
        description,
        category,
        level,
        estimatedHours,
        status,
      },
    })

    return NextResponse.json({ course })
  } catch (error) {
    console.error('Error updating course:', error)
    return NextResponse.json(
      { error: 'Failed to update course' },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest, props: { params: Promise<{ courseId: string }> }) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.course.delete({
      where: { id: params.courseId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting course:', error)
    return NextResponse.json(
      { error: 'Failed to delete course' },
      { status: 500 }
    )
  }
} 