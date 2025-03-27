import { PrismaClient } from '@prisma/client';
import * as crypto from 'crypto';
import { courses } from './seed-data/courses';

const prisma = new PrismaClient();

// Simple hash function using crypto
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function main() {
  console.log('Seeding database...');

  // Create admin user if it doesn't exist
  const adminEmail = 'analytics.flomad@gmail.com';
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    console.log('Creating admin user...');
    const hashedPassword = hashPassword('FlomadLabs2025!');
    await prisma.user.create({
      data: {
        name: 'Flomad Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        emailVerified: new Date(),
      },
    });
    console.log('Admin user created successfully!');
  } else {
    console.log('Admin user already exists, skipping creation.');
  }

  // Create sample courses and materials
  console.log('Creating sample courses and materials...');
  for (const course of courses) {
    const existingCourse = await prisma.course.findFirst({
      where: { title: course.title },
    });

    if (!existingCourse) {
      const { materials, ...courseData } = course;
      
      const createdCourse = await prisma.course.create({
        data: courseData,
      });

      // Create materials for this course
      if (materials && materials.length > 0) {
        for (const material of materials) {
          await prisma.material.create({
            data: {
              ...material,
              courseId: createdCourse.id,
            },
          });
        }
      }

      console.log(`Created course: ${course.title} with ${materials?.length || 0} materials`);
    } else {
      console.log(`Course "${course.title}" already exists, skipping.`);
    }
  }

  // Create a test user with enrollments
  const testUserEmail = 'student@example.com';
  const existingTestUser = await prisma.user.findUnique({
    where: { email: testUserEmail },
  });

  if (!existingTestUser) {
    console.log('Creating test user...');
    const testUser = await prisma.user.create({
      data: {
        name: 'Test Student',
        email: testUserEmail,
        password: hashPassword('password123'),
        role: 'user',
        emailVerified: new Date(),
      },
    });

    // Enroll the test user in all courses
    const allCourses = await prisma.course.findMany();
    for (const course of allCourses) {
      await prisma.enrollment.create({
        data: {
          userId: testUser.id,
          courseId: course.id,
          enrolledAt: new Date(),
        },
      });
      console.log(`Enrolled test user in course: ${course.title}`);
    }

    // Create some progress for the test user
    const someMaterials = await prisma.material.findMany({
      take: 5,
    });

    for (const material of someMaterials) {
      const randomProgress = Math.floor(Math.random() * 101); // 0-100%
      
      await prisma.materialProgress.create({
        data: {
          userId: testUser.id,
          materialId: material.id,
          progress: randomProgress,
          lastPosition: randomProgress > 0 ? Math.random() * 100 : 0,
          notes: randomProgress > 50 ? 'These are some notes I took while studying.' : null,
          bookmarks: randomProgress > 75 ? JSON.stringify([{ time: 10, label: 'Important concept' }]) : null,
        },
      });
      console.log(`Created progress (${randomProgress}%) for material: ${material.title}`);
    }
  } else {
    console.log('Test user already exists, skipping creation.');
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 