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

    // Get user's enrolled courses with their progress
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

    // Get all module progress for this user
    const moduleProgress = await prisma.moduleProgress.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        module: true
      }
    });

    // Create a map for faster lookup
    const progressByModuleId = new Map<string, ModuleProgress & { module: any }>();
    moduleProgress.forEach((progress) => {
      progressByModuleId.set(progress.moduleId, progress);
    });

    // Transform the data for the dashboard
    const courses = enrollments.map(enrollment => {
      const allModules = enrollment.course.curriculum?.sections.flatMap(section => section.modules) || [];
      const completedModules = allModules.filter(module => 
        progressByModuleId.has(module.id) && 
        progressByModuleId.get(module.id)?.status === 'COMPLETED'
      ).length;
      
      // Find the next incomplete module
      const nextModule = allModules.find(module => 
        !progressByModuleId.has(module.id) || 
        progressByModuleId.get(module.id)?.status !== 'COMPLETED'
      );

      return {
        id: enrollment.courseId,
        title: enrollment.course.title,
        progress: allModules.length > 0 ? Math.round((completedModules / allModules.length) * 100) : 0,
        nextModule: nextModule?.title || 'All modules completed',
        totalModules: allModules.length,
        completedModules
      };
    });

    return NextResponse.json({ courses });
  } catch (error) {
    console.error('Error fetching course progress:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 