import { google } from 'googleapis'
import { prisma } from '@/lib/prisma'

export type MaterialType = 'VIDEO' | 'ARTICLE' | 'QUIZ'
export type SourceType = 'YOUTUBE' | 'WEBSITE'

export interface ImportedMaterial {
  type: MaterialType
  title: string
  url: string
  content?: string
  order: number
}

async function importFromYouTube(playlistId: string): Promise<ImportedMaterial[]> {
  const youtube = google.youtube('v3')
  const materials: ImportedMaterial[] = []

  try {
    const response = await youtube.playlistItems.list({
      part: ['snippet'],
      playlistId,
      maxResults: 50,
    })

    if (response.data.items) {
      materials.push(
        ...response.data.items.map((item, index) => ({
          type: 'VIDEO' as MaterialType,
          title: item.snippet?.title || 'Untitled Video',
          url: `https://www.youtube.com/watch?v=${item.snippet?.resourceId?.videoId}`,
          content: item.snippet?.description || '',
          order: index + 1,
        }))
      )
    }
  } catch (error) {
    console.error('Error fetching YouTube playlist:', error)
    throw new Error('Failed to import from YouTube')
  }

  return materials
}

async function importFromWebsite(url: string): Promise<ImportedMaterial[]> {
  try {
    const response = await fetch(url)
    const html = await response.text()
    const materials: ImportedMaterial[] = []

    // Create a temporary DOM element to parse the HTML
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')

    // Find main content area (customize selectors based on target website structure)
    const mainContent = doc.querySelector('main, article, .content')
    
    if (mainContent) {
      // Extract headings and their content
      const headings = mainContent.querySelectorAll('h1, h2, h3')
      headings.forEach((heading, index) => {
        let content = ''
        let nextElement = heading.nextElementSibling

        // Collect content until the next heading
        while (nextElement && !nextElement.matches('h1, h2, h3')) {
          content += nextElement.textContent + '\n'
          nextElement = nextElement.nextElementSibling
        }

        if (heading.textContent && content.trim()) {
          materials.push({
            type: 'ARTICLE',
            title: heading.textContent.trim(),
            url: `${url}#${heading.textContent.trim().toLowerCase().replace(/\s+/g, '-')}`,
            content: content.trim(),
            order: index + 1,
          })
        }
      })
    }

    return materials
  } catch (error) {
    console.error('Error importing from website:', error)
    throw new Error('Failed to import from website')
  }
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
    const createdMaterials = await Promise.all(
      materials.map((material) =>
        prisma.material.create({
          data: {
            courseId,
            type: material.type,
            title: material.title,
            url: material.url,
            content: material.content,
            order: material.order,
          },
        })
      )
    )
  } catch (error) {
    console.error('Error saving imported materials:', error)
    throw error
  }
} 