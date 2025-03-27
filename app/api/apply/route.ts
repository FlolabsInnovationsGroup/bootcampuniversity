import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json();
    
    console.log('Received application data:', JSON.stringify(body, null, 2));
    
    // Validate that we have at least the basic required fields
    if (!body.firstName || !body.lastName || !body.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Default to foundation if program is missing
    const program = body.program || 'foundation';
    
    // Get the program name based on the program ID
    const programNames: Record<string, string> = {
      'foundation': 'Tier 1: Foundation Builder',
      'accelerator': 'Tier 2: Skill Accelerator',
      'professional': 'Tier 3: Professional Developer',
    };
    
    const programName = programNames[program] || `Unknown Program (${program})`;

    // Send email using our email utility
    const emailResult = await sendEmail({
      to: process.env.ADMISSIONS_EMAIL || 'analytics@flomadlabs.com',
      from: process.env.FROM_EMAIL || 'noreply@innovationbootcamp.edu',
      subject: `New Application: ${body.firstName} ${body.lastName}`,
      html: `
        <h1>New Application Submitted</h1>
        <p><strong>Name:</strong> ${body.firstName} ${body.lastName}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone || 'Not provided'}</p>
        <p><strong>Path:</strong> ${body.path || 'Not specified'}</p>
        <p><strong>Program:</strong> ${programName}</p>
        <p><strong>Experience:</strong> ${body.experience || 'Not provided'}</p>
        <p><strong>Background:</strong> ${body.background || 'Not provided'}</p>
        <p><strong>Goals:</strong> ${body.goals || 'Not provided'}</p>
        <p><strong>Heard From:</strong> ${body.heardFrom || 'Not provided'}</p>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
      `,
      text: `
        New Application Submitted\n
        Name: ${body.firstName} ${body.lastName}\n
        Email: ${body.email}\n
        Phone: ${body.phone || 'Not provided'}\n
        Path: ${body.path || 'Not specified'}\n
        Program: ${programName}\n
        Experience: ${body.experience || 'Not provided'}\n
        Background: ${body.background || 'Not provided'}\n
        Goals: ${body.goals || 'Not provided'}\n
        Heard From: ${body.heardFrom || 'Not provided'}\n
        Date: ${new Date().toLocaleString()}
      `,
    });

    if (!emailResult.success) {
      console.error('Failed to send email:', emailResult.error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // In a production environment, you might also want to store this in a database
    // For now, we'll just log that we received it
    console.log('Application received and email sent for:', {
      name: `${body.firstName} ${body.lastName}`,
      email: body.email,
      program: programName,
    });

    return NextResponse.json(
      { success: true, message: 'Application submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error in application submission:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
} 