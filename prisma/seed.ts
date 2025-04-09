import { PrismaClient, Prisma } from '@prisma/client';
import * as crypto from 'crypto';

const prisma = new PrismaClient();

// Simple hash function using crypto
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: {
      email: 'analytics.flomad@gmail.com',
    },
    update: {},
    create: {
      email: 'analytics.flomad@gmail.com',
      name: 'Admin User',
      password: hashPassword('FlomadLabs2025!'),
      role: 'admin',
    },
  });

  console.log('Admin user created:', adminUser);
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 