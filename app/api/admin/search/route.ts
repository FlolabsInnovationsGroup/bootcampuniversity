import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')?.toLowerCase() ?? ''
    const type = searchParams.get('type') // users, courses, materials, or all

    if (!query) {
      return NextResponse.json({ results: [] })
    }

    const searchQuery = {
      where: {
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
        ],
      },
      take: 5,
    }

    let results: any = {}

    if (type === 'all' || type === 'users') {
      results.users = await prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: query } },
            { email: { contains: query } },
          ],
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          _count: {
            select: {
              enrollments: true,
            },
          },
        },
        take: 5,
      })
    }

    if (type === 'all' || type === 'courses') {
      results.courses = await prisma.course.findMany({
        ...searchQuery,
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
          _count: {
            select: {
              enrollments: true,
              materials: true,
            },
          },
        },
      })
    }

    if (type === 'all' || type === 'materials') {
      results.materials = await prisma.material.findMany({
        ...searchQuery,
        select: {
          id: true,
          title: true,
          description: true,
          type: true,
          course: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      })
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error performing search:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 