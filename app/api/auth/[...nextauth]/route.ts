// @ts-nocheck - Disabling TypeScript checking for this file due to NextAuth interface conflicts
import NextAuth from 'next-auth/next';
import { authOptions } from '@/lib/auth/options';

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 