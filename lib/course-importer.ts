import { google } from 'googleapis'
import { prisma } from '@/lib/prisma'

export type MaterialType = 'VIDEO' | 'ARTICLE' | 'QUIZ'
export type SourceType = 'YOUTUBE' | 'WEBSITE'

export interface ImportedMaterial {
  type: MaterialType
  title: string
  url: string
  content?: string
}

const youtube = google.youtube('v3')

async function importFromYouTube(playlistId: string): Promise<ImportedMaterial[]> {
  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    throw new Error('YouTube API key not configured')
  }

  const materials: ImportedMaterial[] = []
  let nextPageToken: string | undefined

  do {
    const response = await youtube.playlistItems.list({
      key: apiKey,
      part: ['snippet'],
      playlistId,
      maxResults: 50,
      pageToken: nextPageToken,
    })

    const items = response.data.items || []
    for (const item of items) {
      if (item.snippet && item.snippet.resourceId?.videoId) {
        materials.push({
          type: 'VIDEO',
          title: item.snippet.title || '',
          url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
          content: item.snippet.description || '',
        })
      }
    }

    nextPageToken = response.data.nextPageToken || undefined
  } while (nextPageToken)

  return materials
}

async function importFromWebsite(url: string): Promise<ImportedMaterial[]> {
  // For now, return a default placeholder for website imports
  // This avoids the cheerio dependency issues
  return [
    {
      type: 'ARTICLE',
      title: 'Introduction',
      url: `${url}#introduction`,
      content: 'This is a placeholder for imported website content. The website import feature is currently in development.'
    },
    {
      type: 'ARTICLE',
      title: 'Getting Started',
      url: `${url}#getting-started`,
      content: 'This is a placeholder for imported website content. Please edit this content manually after import.'
    }
  ]
}

export async function importCourseContent(
  sourceType: SourceType,
  sourceUrl: string
): Promise<ImportedMaterial[]> {
  switch (sourceType) {
    case 'YOUTUBE': {
      // Extract playlist ID from URL
      const playlistId = new URL(sourceUrl).searchParams.get('list')
      if (!playlistId) {
        throw new Error('Invalid YouTube playlist URL')
      }
      return importFromYouTube(playlistId)
    }
    case 'WEBSITE':
      return importFromWebsite(sourceUrl)
    default:
      throw new Error(`Unsupported source type: ${sourceType}`)
  }
}

export async function importAndSaveMaterials(
  courseId: string,
  materials: ImportedMaterial[]
): Promise<void> {
  try {
    // Create all materials in a transaction
    await prisma.$transaction(
      materials.map((material, index) =>
        prisma.material.create({
          data: {
            ...material,
            courseId,
            order: index + 1,
          },
        })
      )
    )
  } catch (error) {
    console.error('Error saving imported materials:', error)
    throw error
  }
} 