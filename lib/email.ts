import nodemailer from 'nodemailer';

// Check if required environment variables are set
const verifyEmailConfig = () => {
  const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0 && process.env.NODE_ENV === 'production') {
    console.warn(`Warning: Missing email configuration: ${missingVars.join(', ')}`);
    return false;
  }
  
  return true;
};

// Create email transporter
const createTransporter = () => {
  // If we're in development mode, return null (we'll just log instead)
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }
  
  // Check configuration before creating transporter
  if (!verifyEmailConfig()) {
    console.warn('Email configuration incomplete. Emails will not be sent.');
    return null;
  }
  
  // Create and return the transporter
  try {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  } catch (error) {
    console.error('Failed to create email transporter:', error);
    return null;
  }
};

// Lazy-initialize the transporter when needed
let transporter: nodemailer.Transporter | null = null;

interface EmailPayload {
  to: string;
  from: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(payload: EmailPayload) {
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  // In development mode, just log the email
  if (isDevelopment) {
    console.log('Email would be sent in production:');
    console.log({
      to: payload.to,
      from: payload.from,
      subject: payload.subject,
      html: payload.html,
    });
    return { success: true, message: 'Email logged in development mode' };
  }
  
  // Initialize transporter if needed
  if (!transporter) {
    transporter = createTransporter();
  }
  
  // If transporter creation failed, return error
  if (!transporter) {
    return {
      success: false,
      error: 'Email service not configured properly',
    };
  }
  
  try {
    // Verify SMTP connection before sending
    await transporter.verify();
    
    // Send the email
    const info = await transporter.sendMail({
      from: payload.from,
      to: payload.to,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
} 