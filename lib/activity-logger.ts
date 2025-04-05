import { prisma } from '@/lib/prisma'

export type ActivityAction = 'created' | 'updated' | 'deleted' | 'viewed' | 'imported'
export type EntityType = 'user' | 'course' | 'material' | 'content' | 'system'

interface LogActivityParams {
  userId: string
  action: ActivityAction
  entityType: EntityType
  entityId: string
  details?: string
}

export async function logActivity({
  userId,
  action,
  entityType,
  entityId,
  details,
}: LogActivityParams) {
  try {
    // Create metadata object from the parameters
    const metadata = {
      entityType,
      entityId,
      details,
    };

    const log = await prisma.activityLog.create({
      data: {
        user: {
          connect: {
            id: userId
          }
        },
        action,
        target: `${entityType}:${entityId}`,
        metadata: metadata,
      },
    })
    return log
  } catch (error) {
    console.error('Error logging activity:', error)
    // Don't throw the error - we don't want activity logging to break the main functionality
    return null
  }
}

// Helper function to format activity details
export function formatActivityDetails(action: ActivityAction, entityType: EntityType, details?: Record<string, any>): string {
  const baseMessage = `${action} ${entityType}`
  if (!details) return baseMessage

  const formattedDetails = Object.entries(details)
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ')

  return `${baseMessage} - ${formattedDetails}`
} 