import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { logActivity } from '@/lib/activity-logger'

export async function GET(req: Request, props: { params: Promise<{ courseId: string }> }) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { role: true },
    })

    if (user?.role !== 'ADMIN') {
      return new NextResponse('Forbidden', { status: 403 })
    }

    const materials = await prisma.material.findMany({
      where: {
        courseId: params.courseId,
      },
      orderBy: {
        order: 'asc',
      },
    })

    return NextResponse.json(materials)
  } catch (error) {
    console.error('[MATERIALS_GET]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function POST(req: Request, props: { params: Promise<{ courseId: string }> }) {
  const params = await props.params;
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { role: true },
    })

    if (user?.role !== 'ADMIN') {
      return new NextResponse('Forbidden', { status: 403 })
    }

    const body = await req.json()
    const { title, type, url, content, order } = body

    const material = await prisma.material.create({
      data: {
        title,
        type,
        url,
        content,
        order,
        course: {
          connect: {
            id: params.courseId,
          },
        },
      },
    })

    // Log material creation
    await logActivity({
      userId: session.user.id,
      action: 'created',
      entityType: 'material',
      entityId: material.id,
      details: `Created material: ${title} for course ${params.courseId}`
    })

    return NextResponse.json(material)
  } catch (error) {
    console.error('[MATERIALS_POST]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
