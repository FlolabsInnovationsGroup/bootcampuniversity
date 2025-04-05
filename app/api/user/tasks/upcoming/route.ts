import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { ModuleProgress } from '@prisma/client';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get user's enrolled courses and their modules
    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId: session.user.id,
        status: 'ACTIVE'
      },
      include: {
        course: {
          include: {
            curriculum: {
              include: {
                sections: {
                  include: {
                    modules: true
                  }
                }
              }
            }
          }
        }
      }
    });

    // Get module progress for the user
    const moduleProgress = await prisma.moduleProgress.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        module: true
      }
    });

    // Create a map for faster lookup
    const completedModuleIds = new Set<string>();
    moduleProgress.forEach((progress) => {
      if (progress.status === 'COMPLETED') {
        completedModuleIds.add(progress.moduleId);
      }
    });

    // Get all modules from enrolled courses
    const tasks = enrollments.flatMap(enrollment => {
      const courseSections = enrollment.course.curriculum?.sections || [];
      return courseSections.flatMap(section => 
        section.modules
          .filter(module => !completedModuleIds.has(module.id))
          .map(module => ({
            id: module.id,
            title: module.title,
            courseTitle: enrollment.course.title,
            type: module.type.toLowerCase(),
            dueDate: 'Due soon' // You can add actual due dates in your schema
          }))
      );
    });

    // Sort tasks by some criteria (e.g., due date, order)
    const sortedTasks = tasks.sort((a, b) => a.title.localeCompare(b.title));

    // Return only the next few tasks
    return NextResponse.json({
      tasks: sortedTasks.slice(0, 5)
    });
  } catch (error) {
    console.error('Error fetching upcoming tasks:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 