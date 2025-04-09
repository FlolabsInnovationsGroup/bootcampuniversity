import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Schema for validating settings data
const settingsSchema = z.object({
  siteName: z.string().min(1),
  siteDescription: z.string(),
  contactEmail: z.string().email(),
  admissionsEmail: z.string().email(),
  enableRegistration: z.boolean(),
  enablePublicCourses: z.boolean(),
  requireEmailVerification: z.boolean(),
  autoEnrollFreeCourses: z.boolean(),
})

const emailTemplateSchema = z.object({
  subject: z.string().min(1),
  body: z.string().min(1),
})

const emailTemplatesSchema = z.object({
  welcome: emailTemplateSchema,
  courseEnrollment: emailTemplateSchema,
  courseCompletion: emailTemplateSchema,
})

const notificationsSchema = z.object({
  emailNotifications: z.boolean(),
  newEnrollmentAlerts: z.boolean(),
  courseCompletionAlerts: z.boolean(),
  userRegistrationAlerts: z.boolean(),
  dailyDigest: z.boolean(),
  weeklyReport: z.boolean(),
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const settings = await prisma.settings.findFirst()
    const emailTemplates = await prisma.emailTemplate.findMany()
    const notifications = await prisma.notificationSettings.findFirst()

    return NextResponse.json({
      settings,
      emailTemplates,
      notifications,
    })
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    
    // Validate request body
    const { settings, emailTemplates, notifications } = body
    
    const validatedSettings = settingsSchema.parse(settings)
    const validatedEmailTemplates = emailTemplatesSchema.parse(emailTemplates)
    const validatedNotifications = notificationsSchema.parse(notifications)

    // Update settings
    await prisma.settings.upsert({
      where: { id: 1 }, // Assuming we only have one settings record
      update: validatedSettings,
      create: validatedSettings,
    })

    // Update email templates
    for (const [type, template] of Object.entries(validatedEmailTemplates)) {
      await prisma.emailTemplate.upsert({
        where: { type },
        update: template,
        create: { type, ...template },
      })
    }

    // Update notification settings
    await prisma.notificationSettings.upsert({
      where: { id: 1 }, // Assuming we only have one notification settings record
      update: validatedNotifications,
      create: validatedNotifications,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving settings:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 