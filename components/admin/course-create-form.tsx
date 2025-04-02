'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

export function CourseCreateForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [sourceType, setSourceType] = useState<'CUSTOM' | 'YOUTUBE' | 'WEBSITE'>('CUSTOM')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    try {
      const formData = new FormData(event.currentTarget)
      const data = {
        title: formData.get('title'),
        description: formData.get('description'),
        sourceType,
        sourceUrl: formData.get('sourceUrl'),
        category: formData.get('category'),
        level: formData.get('level'),
        estimatedHours: parseInt(formData.get('estimatedHours') as string),
      }

      const response = await fetch('/api/admin/courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to create course')
      }

      const result = await response.json()
      
      toast({
        title: 'Course created successfully',
        description: 'You can now add materials to your course',
      })

      router.push(`/admin/courses/${result.course.id}/materials`)
    } catch (error) {
      console.error('Error creating course:', error)
      toast({
        title: 'Error creating course',
        description: 'Please try again later',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={sourceType} onValueChange={(value: any) => setSourceType(value)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="CUSTOM">Custom Course</TabsTrigger>
          <TabsTrigger value="YOUTUBE">From YouTube</TabsTrigger>
          <TabsTrigger value="WEBSITE">From Website</TabsTrigger>
        </TabsList>

        <TabsContent value="CUSTOM">
          <Card>
            <CardHeader>
              <CardTitle>Create Custom Course</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Create a course from scratch and add your own materials
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="YOUTUBE">
          <Card>
            <CardHeader>
              <CardTitle>Import from YouTube</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Import a course from a YouTube playlist. Videos will be automatically added as materials.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="WEBSITE">
          <Card>
            <CardHeader>
              <CardTitle>Import from Website</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Import a course from a website. Content will be extracted and organized into materials.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            required
            placeholder="Enter course description"
          />
        </div>

        {sourceType !== 'CUSTOM' && (
          <div className="space-y-2">
            <Label htmlFor="sourceUrl">Source URL</Label>
            <Input
              id="sourceUrl"
              name="sourceUrl"
              type="url"
              required
              placeholder={
                sourceType === 'YOUTUBE'
                  ? 'https://youtube.com/playlist?list=...'
                  : 'https://example.com/course'
              }
            />
          </div>
        )}

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

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Course'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
} 