import { NextResponse } from 'next/server';
import type { RegisterCredentials } from '@/lib/types/auth';

export async function POST(request: Request) {
  try {
    const body: RegisterCredentials = await request.json();

    // Validate request body
    if (!body.email || !body.password || !body.name || !body.confirmPassword) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (body.password !== body.confirmPassword) {
      return NextResponse.json(
        { error: 'Passwords do not match' },
        { status: 400 }
      );
    }

    // Here you would typically:
    // 1. Hash the password
    // 2. Check if user already exists
    // 3. Create the user in your database
    // 4. Send verification email

    // For now, we'll just return a success response
    return NextResponse.json(
      { message: 'Registration successful' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 