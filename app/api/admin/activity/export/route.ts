import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { parse } from 'json2csv';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters
    const searchParams = req.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const userId = searchParams.get('userId');
    const action = searchParams.get('action');
    const entityType = searchParams.get('entityType');

    // Build where clause
    const where: any = {};
    if (startDate) {
      where.createdAt = {
        ...where.createdAt,
        gte: new Date(startDate),
      };
    }
    if (endDate) {
      where.createdAt = {
        ...where.createdAt,
        lte: new Date(endDate),
      };
    }
    if (userId) where.userId = userId;
    if (action) where.action = action;
    if (entityType) where.entityType = entityType;

    // Get activities with user details
    const activities = await prisma.activityLog.findMany({
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
    });

    // Transform data for CSV
    const csvData = activities.map((activity) => ({
      timestamp: activity.createdAt.toISOString(),
      user: activity.user.name,
      email: activity.user.email,
      action: activity.action,
      target: activity.target,
      entityType: activity.entityType,
      entityId: activity.entityId,
      details: activity.details ? JSON.stringify(activity.details) : '',
    }));

    // Convert to CSV
    const csv = parse(csvData);

    // Set headers for file download
    const headers = new Headers();
    headers.set('Content-Type', 'text/csv');
    headers.set('Content-Disposition', 'attachment; filename=activity_log.csv');

    return new NextResponse(csv, { headers });
  } catch (error) {
    console.error('Error exporting activity log:', error);
    return NextResponse.json(
      { error: 'Failed to export activity log' },
      { status: 500 }
    );
  }
} 