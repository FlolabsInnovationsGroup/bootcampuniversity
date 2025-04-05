import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

const materialSchema = z.object({
  title: z.string().min(1),
  type: z.enum(['video', 'article', 'external']),
  content: z.string().min(1).optional(),
  url: z.string().optional(),
  courseId: z.string().min(1),
})

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (session.user.role !== 'admin') {
      return new NextResponse('Forbidden', { status: 403 })
    }

    const json = await req.json()
    const body = materialSchema.parse(json)

    const material = await prisma.material.create({
      data: {
        title: body.title,
        type: body.type,
        content: body.content,
        url: body.url,
        courseId: body.courseId,
        order: await getNextOrder(body.courseId),
      },
    })

    return NextResponse.json(material)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse('Invalid request data', { status: 422 })
    }

    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (session.user.role !== 'admin') {
      return new NextResponse('Forbidden', { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const courseId = searchParams.get('courseId')

    const where = courseId ? { courseId } : {}

    const materials = await prisma.material.findMany({
      where,
      orderBy: [
        { courseId: 'asc' },
        { order: 'asc' },
      ],
    })

    return NextResponse.json(materials)
  } catch (error) {
    return new NextResponse('Internal error', { status: 500 })
  }
}

async function getNextOrder(courseId: string): Promise<number> {
  const lastMaterial = await prisma.material.findFirst({
    where: { courseId },
    orderBy: { order: 'desc' },
    select: { order: true },
  })

  return (lastMaterial?.order ?? 0) + 1
} 