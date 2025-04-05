import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface ModuleWithProgress {
  id: string;
  title: string;
  type: string;
  duration: number;
  completed: boolean;
  locked: boolean;
}

interface SectionWithProgress {
  id: string;
  title: string;
  modules: ModuleWithProgress[];
  progress: number;
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    // Get user's enrolled courses with their curricula
    const enrolledCourses = await prisma.enrollment.findMany({
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
                  },
                  orderBy: {
                    order: 'asc'
                  }
                }
              }
            }
          }
        },
        moduleProgress: {
          include: {
            module: true
          }
        }
      }
    });

    // Transform the data for the learning path view
    const sections: SectionWithProgress[] = enrolledCourses.flatMap(enrollment => {
      const moduleProgressMap = new Map(
        enrollment.moduleProgress.map(p => [p.moduleId, p])
      );
      
      return enrollment.course.curriculum?.sections.map(section => {
        const modules: ModuleWithProgress[] = section.modules.map(module => {
          const progress = moduleProgressMap.get(module.id);
          const isCompleted = progress?.status === 'COMPLETED';
          const previousModule = section.modules[module.order - 1];
          const previousModuleCompleted = module.order === 0 || 
            (previousModule && moduleProgressMap.get(previousModule.id)?.status === 'COMPLETED');

          return {
            id: module.id,
            title: module.title,
            type: module.type,
            duration: module.duration,
            completed: isCompleted,
            locked: !previousModuleCompleted && module.order !== 0
          };
        });

        const completedModules = modules.filter(m => m.completed).length;
        const totalModules = modules.length;
        const progress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

        return {
          id: section.id,
          title: section.title,
          modules,
          progress
        };
      }) || [];
    });

    return NextResponse.json({ sections });
  } catch (error) {
    console.error('Error fetching learning path:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 