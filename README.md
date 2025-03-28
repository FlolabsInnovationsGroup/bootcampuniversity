# Innovation Bootcamp University

A Next.js-powered educational platform built on a cooperative education model that transitions students from foundational learning to earning while developing advanced skills.

## Project Overview

Innovation Bootcamp University provides a unique approach to tech education with a three-tiered program:

1. **Tier 1: Foundation Builder** - Start your journey with foundational education ($500/month)
2. **Tier 2: Skill Accelerator** - Transition to earning while continuing education
3. **Tier 3: Professional Developer** - Earn more with advanced skills and leadership roles

Our cooperative education model transitions students from paying for education to earning income as they develop advanced skills in specialized tracks including Web Development, AI & Machine Learning, Mobile App Development, and Robotics.

## Features

- **Cooperative Education Model** - Unique approach where students transition from students to paid professionals
- **Authentication System** - Secure login with email/password using NextAuth.js
- **Dashboard** - Personalized student progress tracking and analytics
- **Admin Panel** - Manage applications, students, and course content
- **Multi-step Application Process** - Streamlined application with progress tracking
- **Responsive Design** - Mobile-friendly interface built with Tailwind CSS and Framer Motion
- **Email Integration** - Automated notifications for applications and contact form submissions via Resend

## Technology Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: SQLite (development), PostgreSQL (production)
- **Authentication**: NextAuth.js with JWT
- **Email Service**: Resend for transactional emails
- **Styling**: Tailwind CSS with custom theme, shadcn/ui components
- **Animation**: Framer Motion for UI animations

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
   cp .env.example .env.local
   ```
   
   Edit the `.env.local` file and add your configuration values.

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

Run Prisma Studio to view and edit the database:
```bash
npx prisma studio
```

Open [http://localhost:3000](http://localhost:3000) to view the application.
Open [http://localhost:5555](http://localhost:5555) to access Prisma Studio.

## Project Structure

- `app/` - Next.js App Router pages and layouts
  - `(auth)/` - Authentication related pages (login, register)
  - `(marketing)/` - Public pages (home, about, programs)
  - `(dashboard)/` - Protected dashboard pages
  - `(admin)/` - Admin-only pages
  - `api/` - Backend API routes
- `components/` - React components organized by feature
  - `features/` - Feature-specific components
  - `layout/` - Site layout components
  - `shared/` - Reusable components
  - `ui/` - UI primitives and base components
- `lib/` - Utility functions, helpers, and services
- `prisma/` - Database schema and migrations
- `public/` - Static assets

## Email Configuration

The contact and application forms on the site are configured to send email notifications when submitted using Resend.

1. Email settings in `.env.local`:
   ```
   # Email Settings
   SMTP_HOST=smtp.resend.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=resend
   SMTP_PASSWORD=your-resend-api-key
   
   # Email Addresses
   CONTACT_EMAIL=analytics@flomadlabs.com
   ADMISSIONS_EMAIL=analytics@flomadlabs.com
   FROM_EMAIL=analytics@flomadlabs.com
   
   # Set to "production" to actually send emails
   NODE_ENV=production
   
   # Performance optimization
   NEXT_PUBLIC_PRODUCTION=true
   ```

2. **Form Submissions**:
   - All form submissions (contact and applications) are sent to `analytics@flomadlabs.com`
   - The system is configured to use Resend.com for reliable email delivery
   - Free tier allows 100 emails/day

## Deployment to Vercel

To deploy this application to Vercel:

1. **Create a PostgreSQL Database**:
   - Use Vercel Postgres, Supabase, or another PostgreSQL provider
   - Get your PostgreSQL connection string

2. **Set Required Environment Variables**:
   In Vercel's dashboard under your project settings, add these environment variables:
   ```
   # Database
   DATABASE_URL=postgresql://username:password@host:port/database
   
   # NextAuth
   NEXTAUTH_URL=https://your-production-url.vercel.app
   NEXTAUTH_SECRET=your-long-random-secret-key
   
   # Email (Resend)
   SMTP_HOST=smtp.resend.com
   SMTP_PORT=587
   SMTP_USER=resend
   SMTP_PASSWORD=your-resend-api-key
   
   # Email Addresses
   CONTACT_EMAIL=analytics@flomadlabs.com
   ADMISSIONS_EMAIL=analytics@flomadlabs.com
   FROM_EMAIL=analytics@flomadlabs.com
   
   # Performance optimization
   NEXT_PUBLIC_PRODUCTION=true
   
   # Required for email sending
   NODE_ENV=production
   ```

3. **Configure Build Settings**:
   - Build Command: `pnpm prisma generate && pnpm build`
   - Output Directory: `.next`
   - Install Command: `pnpm install`

4. **Deploy Hooks**:
   If needed, add a Build hook in the Git section to deploy when you push to your repository.

5. **Troubleshooting**:
   - If deployment fails, check Vercel logs for specific errors
   - Ensure Prisma is generating correctly during build
   - Check that PostgreSQL connection string is valid and accessible from Vercel

## License

MIT
