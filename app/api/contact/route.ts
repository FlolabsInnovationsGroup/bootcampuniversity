import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;
    
    // Validate the required fields
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ 
        error: "Missing required fields" 
      }), { status: 400 });
    }
    
    // Send email using our configured email service
    await sendEmail({
      to: process.env.CONTACT_EMAIL || 'analytics@flomadlabs.com',
      from: process.env.FROM_EMAIL || 'noreply@innovationbootcamp.edu',
      subject: `Contact Form: ${name}`,
      html: `
        <h1>Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });
    
    return new Response(JSON.stringify({ 
      success: true 
    }), { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ 
      error: "Failed to send message" 
    }), { status: 500 });
  }
} 