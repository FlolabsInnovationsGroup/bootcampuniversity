"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { Loader2 } from 'lucide-react'

const COURSE_LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']
const COURSE_CATEGORIES = [
  'Programming',
  'Data Science',
  'Web Development',
  'Mobile Development',
  'DevOps',
  'Design',
  'Business',
  'Other'
]

export function CourseImportForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      const imageFile = formData.get('image') as File

      // Create multipart form data
      const submitFormData = new FormData()
      submitFormData.append('title', formData.get('title') as string)
      submitFormData.append('sourceType', formData.get('sourceType') as string)
      submitFormData.append('sourceUrl', formData.get('sourceUrl') as string)
      submitFormData.append('category', formData.get('category') as string)
      submitFormData.append('level', formData.get('level') as string)
      submitFormData.append('estimatedHours', formData.get('estimatedHours') as string)
      if (imageFile && imageFile.size > 0) {
        submitFormData.append('image', imageFile)
      }

      const response = await fetch('/api/admin/courses/import', {
        method: 'POST',
        body: submitFormData, // Send as FormData instead of JSON
      })

      if (!response.ok) {
        throw new Error('Failed to import course')
      }

      const result = await response.json()
      
      toast({
        title: 'Course imported successfully',
        description: `Created ${result.materialsCount} materials`,
      })

      router.push(`/admin/courses/${result.course.id}`)
    } catch (error) {
      console.error('Error importing course:', error)
      toast({
        title: 'Error importing course',
        description: 'Please try again later',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Course Title</Label>
        <Input
          id="title"
          name="title"
          required
          placeholder="Enter course title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Course Image</Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
        />
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full max-w-md rounded-lg border border-gray-200"
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="sourceType">Source Type</Label>
        <Select
          name="sourceType"
          required
          defaultValue=""
        >
          <option value="" disabled>Select source type</option>
          <option value="YOUTUBE">YouTube Playlist</option>
          <option value="WEBSITE">Website</option>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sourceUrl">Source URL</Label>
        <Input
          id="sourceUrl"
          name="sourceUrl"
          type="url"
          required
          placeholder="Enter source URL"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          name="category"
          required
          defaultValue=""
        >
          <option value="" disabled>Select category</option>
          {COURSE_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="level">Level</Label>
        <Select
          name="level"
          required
          defaultValue=""
        >
          <option value="" disabled>Select level</option>
          {COURSE_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="estimatedHours">Estimated Hours</Label>
        <Input
          id="estimatedHours"
          name="estimatedHours"
          type="number"
          required
          min="1"
          placeholder="Enter estimated hours to complete"
        />
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Importing...
          </>
        ) : (
          'Import Course'
        )}
      </Button>
    </form>
  )
} 