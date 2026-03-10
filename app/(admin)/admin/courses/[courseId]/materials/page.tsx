'use client'

import { useState, use } from 'react';
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, Loader2, Youtube, Globe, FileText, Grip } from 'lucide-react'
import { toast } from 'sonner'

interface Material {
  id: string
  title: string
  type: string
  url?: string
  content?: string
  order: number
}

export default function CourseMaterialsPage(props: { params: Promise<{ courseId: string }> }) {
  const params = use(props.params);
  const router = useRouter()
  const [materials, setMaterials] = useState<Material[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAddingMaterial, setIsAddingMaterial] = useState(false)

  async function fetchMaterials() {
    try {
      const response = await fetch(`/api/admin/courses/${params.courseId}/materials`)
      if (!response.ok) throw new Error('Failed to fetch materials')
      const data = await response.json()
      setMaterials(data)
    } catch (error) {
      console.error('Error fetching materials:', error)
      toast.error('Failed to fetch materials')
    } finally {
      setIsLoading(false)
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsAddingMaterial(true)

    try {
      const formData = new FormData(event.currentTarget)
      const response = await fetch(`/api/admin/courses/${params.courseId}/materials`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.get('title'),
          type: formData.get('type'),
          url: formData.get('url'),
          content: formData.get('content'),
          order: materials.length + 1,
        }),
      })

      if (!response.ok) throw new Error('Failed to add material')

      const newMaterial = await response.json()
      setMaterials([...materials, newMaterial])
      toast.success('Material added successfully')
      // Close the dialog by clearing the form
      event.currentTarget.reset()
    } catch (error) {
      console.error('Error adding material:', error)
      toast.error('Failed to add material')
    } finally {
      setIsAddingMaterial(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Course Materials</h2>
          <p className="text-muted-foreground">
            Manage learning materials and resources
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Material
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Course Material</DialogTitle>
              <DialogDescription>
                Add a new learning material or resource to this course
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter material title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select name="type" defaultValue="video">
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="article">Article</SelectItem>
                    <SelectItem value="resource">Resource</SelectItem>
                    <SelectItem value="custom">Custom Content</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="url">URL</Label>
                <Input
                  id="url"
                  name="url"
                  type="url"
                  placeholder="Enter material URL"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Enter custom content or notes"
                />
              </div>

              <div className="flex justify-end gap-4">
                <DialogTrigger asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogTrigger>
                <Button type="submit" disabled={isAddingMaterial}>
                  {isAddingMaterial ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    'Add Material'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : materials.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center h-64 text-center">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">No materials yet</h3>
              <p className="text-sm text-muted-foreground">
                Start adding learning materials to your course
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {materials.map((material) => (
            <Card key={material.id}>
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="p-2 bg-secondary rounded-lg">
                  {material.type === 'video' ? (
                    <Youtube className="h-4 w-4" />
                  ) : material.type === 'article' ? (
                    <Globe className="h-4 w-4" />
                  ) : material.type === 'resource' ? (
                    <FileText className="h-4 w-4" />
                  ) : (
                    <Grip className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{material.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {material.type.charAt(0).toUpperCase() + material.type.slice(1)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/admin/courses/${params.courseId}/materials/${material.id}`)}
                >
                  Edit
                </Button>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 