// @ts-nocheck - Disabling TypeScript checking for this file due to NextAuth interface conflicts
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';
import * as crypto from 'crypto';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// Simple hash function using crypto
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Verify password
function verifyPassword(password: string, hashedPassword: string): boolean {
  const hash = hashPassword(password);
  console.log('Hash comparison:');
  console.log(`Input hash: ${hash}`);
  console.log(`Stored hash: ${hashedPassword}`);
  return hash === hashedPassword;
}

interface SessionCallbackParams {
  session: Session;
  token: JWT;
  user?: any;
}

interface JWTCallbackParams {
  token: JWT;
  user?: any;
  account?: any;
  profile?: any;
  isNewUser?: boolean;
}

// Extend the Session types to include role
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    }
  }
  
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  }
}

// Extend JWT type to include role
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: string;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: true, // Enable for debugging
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/error',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          throw new Error('Please enter your email and password');
        }

        console.log(`Attempting to authorize: ${credentials.email}`);
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          console.log(`No user found with email: ${credentials.email}`);
          throw new Error('No user found with this email');
        }

        if (!user.password) {
          console.log('User has no password - likely uses OAuth');
          throw new Error('Please log in with the provider you used to register');
        }

        // Verify password using crypto instead of bcrypt
        const isPasswordValid = verifyPassword(credentials.password, user.password);
        console.log(`Password verification for ${credentials.email}: ${isPasswordValid ? 'Success' : 'Failed'}`);
        
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }
        
        // Only allow admin users to log in for now
        if (user.role !== 'admin') {
          console.log(`User ${credentials.email} is not an admin (role: ${user.role})`);
          throw new Error('Student login is not available yet. The platform is currently under development.');
        }

        console.log(`Successful login for admin user: ${credentials.email}`);
        
        // Use the correct User format return
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async session({ token, session }: SessionCallbackParams) {
      console.log('Session callback called with token:', token);
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string | null;
        session.user.role = token.role;
      }

      return session;
    },
    async jwt({ token, user }: JWTCallbackParams) {
      if (user) {
        // This will only be executed when the user logs in
        console.log('JWT callback with user:', user);
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.role = user.role;
      }
      
      // For subsequent requests, always look up the user from the database
      // to ensure we have the latest data, especially the role
      if (token?.email) {
        const dbUser = await prisma.user.findFirst({
          where: {
            email: token.email as string,
          },
        });

        if (dbUser) {
          console.log(`Updated token for user ${dbUser.email}, role: ${dbUser.role}`);
          // Update the token with the latest data from the database
          token.id = dbUser.id;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.picture = dbUser.image;
          token.role = dbUser.role;
        }
      }

      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 