# Innovation Bootcamp University

A Next.js-powered educational platform that combines tiered learning paths with practical experience to help students master technology skills.

## Project Overview

Innovation Bootcamp University provides a unique approach to tech education with a three-tiered program:

1. **Foundation Builder** - Self-paced learning with guided projects
2. **Skill Accelerator** - Collaborative learning with mentorship
3. **Professional Developer** - Real-world experience with industry partners

Students progress through specialized tracks including AI & Machine Learning, Web Development, Mobile App Development, and Robotics & Automation.

## Features

- **Authentication System** - Secure login with email/password and OAuth providers
- **Dashboard** - Personalized student progress tracking and analytics
- **Educational Content** - Structured curriculum with videos, articles, and interactive exercises
- **Progress Tracking** - Monitor completion and performance across learning materials
- **Application System** - Multi-step application process for new students
- **Responsive Design** - Mobile-friendly interface with modern UI components

## Technology Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (development), PostgreSQL (production)
- **Authentication**: NextAuth.js with multiple providers
- **Testing**: Jest, React Testing Library
- **Styling**: Tailwind CSS, Radix UI primitives

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm
- PostgreSQL (for production)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/innovation-bootcamp-university.git
   cd innovation-bootcamp-university
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Edit the `.env` file and add your configuration values.

4. Set up the database:
   ```bash
   pnpm prisma generate
   pnpm prisma db push
   ```

5. Seed the database (optional):
   ```bash
   pnpm prisma db seed
   ```

### Development

Run the development server:
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Testing

Run tests:
```bash
pnpm test
```

## Project Structure

- `app/` - Next.js App Router pages and API routes
- `components/` - React components organized by feature and common use
- `lib/` - Utility functions, helpers, and data models
- `prisma/` - Database schema and migrations
- `public/` - Static assets
- `@types/` - TypeScript type definitions
- `__tests__/` - Test files

## Current Status

The project currently has:
- Complete UI implementation with responsive design
- Fully functional user authentication with email/password and OAuth providers
- Session management with NextAuth.js
- Route protection via middleware
- User profile management functionality
- Learning progress tracking system
- Real-time progress data in the dashboard
- User settings with profile customization
- Database schema and API structure
- Mock data for development
- Tiered educational content structure

Next planned features include:
- Email verification for new accounts
- Comprehensive admin dashboard
- Content upload and management system
- Enhanced analytics and reporting
- Course recommendation engine
- Social learning features (discussion forums, peer feedback)

## License

MIT

# Form Email Configuration

## Setting Up Email for Forms

The contact and application forms on the site are configured to send email notifications when submitted. To ensure these work properly in production:

1. Configure your email settings in `.env.local`:
   ```
   # Email Settings
   SMTP_HOST=your-smtp-server.com  # e.g., smtp.gmail.com
   SMTP_PORT=587  # Common port for TLS
   SMTP_SECURE=false  # true for 465, false for other ports
   SMTP_USER=your-email@example.com
   SMTP_PASSWORD=your-email-password
   
   # Email Recipients
   CONTACT_EMAIL=analytics.flomad@gmail.com
   ADMISSIONS_EMAIL=analytics.flomad@gmail.com
   FROM_EMAIL=noreply@innovationbootcamp.edu
   
   # Production Mode (must be set to "production" to send real emails)
   NODE_ENV=production
   ```

2. **Email Service Provider Tips**:
   - **Gmail**: You'll need to create an "App Password" for your Gmail account (2FA must be enabled)
   - **Mailgun/SendGrid/etc**: Consider using a transactional email service for better deliverability

3. **Testing Your Configuration**:
   - Run `node scripts/test-email.js` to validate your email settings before deploying
   - This will attempt to send a test email to verify your configuration

4. **Troubleshooting**:
   - Check spam/junk folders if emails aren't arriving
   - Some hosting providers block outgoing SMTP traffic (use a transactional email service instead)
   - Review server logs for detailed error messages

All submitted form data is sent to `analytics.flomad@gmail.com` for review.

## Contact Form

The application includes a contact form that sends email notifications to the administrator when users submit inquiries.

- Form validation ensures all required fields are filled out
- Emails are sent using the configured email service
- All submitted form data is sent to `analytics.flomad@gmail.com` for review.
