import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const filter = searchParams.get('filter') || 'all'
    const search = searchParams.get('search') || ''
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')

    const where = {
      ...(filter !== 'all' && { target: { contains: filter + ':' } }),
      ...(search && {
        OR: [
          { target: { contains: search } },
          { metadata: { path: '$.details', string_contains: search } },
          { user: { name: { contains: search } } },
          { user: { email: { contains: search } } },
        ],
      }),
    }

    const [logs, total] = await Promise.all([
      prisma.activityLog.findMany({
        where,
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.activityLog.count({ where }),
    ])

    return NextResponse.json({
      logs,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    })
  } catch (error) {
    console.error('Error fetching activity logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch activity logs' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session?.user || session.user.role !== 'admin') {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const body = await request.json()
    const { action, entityType, entityId, details } = body

    // Create metadata object
    const metadata = {
      entityType,
      entityId,
      details,
    };

    const log = await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action,
        target: `${entityType}:${entityId}`,
        metadata,
      },
    })

    return NextResponse.json(log)
  } catch (error) {
    console.error('Error creating activity log:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 