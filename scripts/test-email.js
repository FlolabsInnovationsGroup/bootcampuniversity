// This script tests the email configuration
// Run with: node scripts/test-email.js

const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function main() {
  console.log('Testing email configuration...');
  
  // Check required environment variables
  const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error(`Error: Missing required environment variables: ${missingVars.join(', ')}`);
    console.error('Please update your .env.local file with these values');
    process.exit(1);
  }
  
  // Create a test transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  
  try {
    // Verify connection
    console.log('Verifying SMTP connection...');
    await transporter.verify();
    console.log('SMTP connection successful! ✅');
    
    // Send test email
    console.log(`Sending test email to ${process.env.CONTACT_EMAIL}...`);
    const info = await transporter.sendMail({
      from: process.env.FROM_EMAIL || 'noreply@innovationbootcamp.edu',
      to: process.env.CONTACT_EMAIL,
      subject: 'Email Configuration Test',
      html: `
        <h1>Email Configuration Test</h1>
        <p>If you're seeing this, your email configuration is working correctly!</p>
        <p>This is a test email sent at: ${new Date().toLocaleString()}</p>
      `,
      text: `
        Email Configuration Test
        
        If you're seeing this, your email configuration is working correctly!
        This is a test email sent at: ${new Date().toLocaleString()}
      `,
    });
    
    console.log('Test email sent successfully! ✅');
    console.log(`Message ID: ${info.messageId}`);
    console.log('Email configuration is valid and working');
  } catch (error) {
    console.error('Error testing email configuration:');
    console.error(error);
    process.exit(1);
  }
}

main().catch(console.error); 