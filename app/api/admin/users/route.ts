import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

// Helper function to check if user is admin
async function isAdmin() {
  const session = await getServerSession();
  return session?.user?.role === 'admin';
}

// GET /api/admin/users
export async function GET(request: Request) {
  try {
    // Check if user is admin
    if (!await isAdmin()) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const role = searchParams.get('role');
    
    // Build filter condition
    const where: any = {};
    
    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } }
      ];
    }
    
    if (role) {
      where.role = role;
    }
    
    // Get users with filter
    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        emailVerified: true,
        password: false,
        // Count of course enrollments
        _count: {
          select: {
            enrollments: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });
    
    // Transform to remove _count from response
    const formattedUsers = users.map((user: {
      id: string;
      name: string | null;
      email: string | null;
      image: string | null;
      role: string;
      _count: {
        enrollments: number;
      }
    }) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      role: user.role,
      enrollmentsCount: user._count.enrollments
    }));
    
    return NextResponse.json(formattedUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
} 