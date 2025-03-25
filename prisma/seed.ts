import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a test user
  const user = await prisma.user.upsert({
    where: { email: 'test@example.com' },
    update: {},
    create: {
      email: 'test@example.com',
      name: 'Test User',
      progress: {
        create: [
          {
            materialId: 'video-1',
            progress: 45.5,
            notes: 'Important concepts at 2:30',
            bookmarks: JSON.stringify([
              {
                id: '1',
                time: 150,
                label: 'Key concept explanation',
                timestamp: '2:30',
              },
              {
                id: '2',
                time: 300,
                label: 'Example implementation',
                timestamp: '5:00',
              },
            ]),
            lastPosition: 180,
          },
          {
            materialId: 'doc-1',
            progress: 100,
            notes: 'Remember to review section 3',
            bookmarks: JSON.stringify([]),
            lastPosition: 0,
          },
        ],
      },
    },
  });

  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 