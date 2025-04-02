import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
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

    const activities = await prisma.activityLog.findMany({
      take: 50,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    })

    return NextResponse.json(activities)
  } catch (error) {
    console.error('[ACTIVITIES_GET]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { id: true, role: true },
    })

    if (user?.role !== 'ADMIN') {
      return new NextResponse('Forbidden', { status: 403 })
    }

    const { action, entityType, entityId, details } = await req.json()

    const activity = await prisma.activityLog.create({
      data: {
        userId: user.id,
        action,
        entityType,
        entityId,
        details,
      },
    })

    return NextResponse.json(activity)
  } catch (error) {
    console.error('[ACTIVITIES_POST]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
} 