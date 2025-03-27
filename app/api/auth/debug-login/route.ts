import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import * as crypto from 'crypto';

// Simple hash function using crypto - same as in seed.ts
function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    
    console.log(`Debug login attempt for email: ${email}`);
    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        role: true,
        name: true
      }
    });
    
    if (!user) {
      console.log(`No user found with email: ${email}`);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    console.log(`Found user: ${user.email}, role: ${user.role}`);
    
    if (!user.password) {
      return NextResponse.json({ error: 'User has no password set' }, { status: 400 });
    }
    
    // Hash the provided password
    const hashedPassword = hashPassword(password);
    console.log(`Password verification:`);
    console.log(`Input hash: ${hashedPassword}`);
    console.log(`Stored hash: ${user.password}`);
    
    // Compare the hashed password
    const isPasswordValid = hashedPassword === user.password;
    
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }
    
    // Return success with user data (excluding password)
    const { password: _, ...userData } = user;
    
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: userData
    });
    
  } catch (error) {
    console.error('Debug login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
} 