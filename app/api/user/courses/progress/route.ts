import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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
                    modules: {
                      include: {
                        progress: {
                          where: {
                            userId: session.user.id
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    });

    // Transform the data for the dashboard
    const courses = enrollments.map(enrollment => {
      const allModules = enrollment.course.curriculum?.sections.flatMap(section => section.modules) || [];
      const completedModules = allModules.filter(module => 
        module.progress.some(p => p.status === 'COMPLETED')
      ).length;
      
      // Find the next incomplete module
      const nextModule = allModules.find(module => 
        !module.progress.some(p => p.status === 'COMPLETED')
      );

      return {
        id: enrollment.courseId,
        title: enrollment.course.title,
        progress: Math.round((completedModules / allModules.length) * 100),
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