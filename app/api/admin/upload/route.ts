import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { writeFile } from 'fs/promises'
import { join } from 'path'

// POST /api/admin/upload
export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return new NextResponse('No file uploaded', { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create unique filename
    const timestamp = Date.now()
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`
    
    // Save to public/uploads directory
    const path = join(process.cwd(), 'public/uploads', filename)
    await writeFile(path, buffer)
    
    // Return the URL path to the file
    const url = `/uploads/${filename}`
    
    return NextResponse.json({ url })
  } catch (error) {
    console.error('Error uploading file:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// GET /api/admin/upload
export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    
    // Here you could implement listing of uploaded files
    // For now, we'll return a simple message
    return NextResponse.json({
      message: 'File listing not implemented yet',
      type: type || 'all'
    })
  } catch (error) {
    console.error('Error listing files:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
} 