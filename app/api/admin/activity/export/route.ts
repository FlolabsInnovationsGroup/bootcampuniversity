import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse query parameters
    const url = new URL(req.url);
    const startDate = url.searchParams.get('startDate') || undefined;
    const endDate = url.searchParams.get('endDate') || undefined;
    const userId = url.searchParams.get('userId') || undefined;
    const action = url.searchParams.get('action') || undefined;
    const target = url.searchParams.get('target') || undefined;

    // Build the query
    const query: any = {};
    
    if (startDate && endDate) {
      query.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    } else if (startDate) {
      query.createdAt = {
        gte: new Date(startDate),
      };
    } else if (endDate) {
      query.createdAt = {
        lte: new Date(endDate),
      };
    }

    if (userId) {
      query.userId = userId;
    }

    if (action) {
      query.action = action;
    }

    if (target) {
      query.target = target;
    }

    // Fetch activity logs with related user data
    const activityLogs = await prisma.activityLog.findMany({
      where: query,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Create CSV content
    const csvHeader = 'ID,User ID,User Name,User Email,User Role,Action,Target,Metadata,Created At\n';
    const csvRows = activityLogs.map(log => {
      const metadata = log.metadata ? JSON.stringify(log.metadata).replace(/"/g, '""') : '';
      
      return [
        log.id,
        log.userId,
        log.user?.name || '',
        log.user?.email || '',
        log.user?.role || '',
        log.action,
        log.target || '',
        `"${metadata}"`,
        log.createdAt.toISOString(),
      ].join(',');
    }).join('\n');

    const csvContent = csvHeader + csvRows;

    // Return CSV file
    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="activity-log-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    console.error('Error exporting activity logs:', error);
    return NextResponse.json(
      { error: 'Failed to export activity logs' },
      { status: 500 }
    );
  }
} 