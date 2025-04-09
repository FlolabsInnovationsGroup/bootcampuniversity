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
    const enrollments = await prisma.enrollment.findMany({
      where: {
        userId: session.user.id,
        status: 'ACTIVE',
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
        },
        moduleProgress: true
      }
    });

    const learningPath = enrollments.map(enrollment => {
      const moduleProgressMap = new Map(
        enrollment.moduleProgress.map(p => [p.moduleId, p])
      );

      const sections = enrollment.course.curriculum?.sections.map(section => {
        const modules = section.modules.map(module => {
          const progress = moduleProgressMap.get(module.id);
          const isCompleted = progress?.status === 'COMPLETED';
          const previousModule = section.modules.find(m => m.order === module.order - 1);
          const isUnlocked = module.order === 1 || 
            (previousModule && moduleProgressMap.get(previousModule.id)?.status === 'COMPLETED');

          return {
            ...module,
            progress: progress || null,
            isCompleted,
            isUnlocked
          };
        });

        return {
          ...section,
          modules
        };
      }) || [];

      return {
        id: enrollment.id,
        courseId: enrollment.courseId,
        courseName: enrollment.course.title,
        sections
      };
    });

    return NextResponse.json({ learningPath });
  } catch (error) {
    console.error('Error fetching learning path:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 