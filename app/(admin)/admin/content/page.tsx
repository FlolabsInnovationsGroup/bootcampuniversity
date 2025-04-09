import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Search, Video, FileText, Link as LinkIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

async function getMaterials() {
  const materials = await prisma.material.findMany({
    include: {
      course: {
        select: {
          title: true,
        },
      },
      _count: {
        select: {
          progress: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return materials.map(material => ({
    id: material.id,
    title: material.title,
    type: material.type,
    description: material.content || '',
    duration: material.type === 'video' ? material.content : null,
    course: material.course.title,
    progress: material._count.progress,
    createdAt: material.createdAt.toLocaleDateString()
  }))
}

export default async function ContentLibraryPage() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'admin') {
    redirect('/login')
  }

  const materials = await getMaterials()
  const videos = materials.filter(m => m.type === 'video')
  const articles = materials.filter(m => m.type === 'article')
  const resources = materials.filter(m => m.type === 'resource')

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Content Library</h2>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/content/videos/new">
              <Video className="mr-2 h-4 w-4" />
              Add Video
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/content/articles/new">
              <FileText className="mr-2 h-4 w-4" />
              Add Article
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/content/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Content
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search content..." className="pl-8" />
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Materials</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Materials</CardTitle>
              <CardDescription>
                Manage and organize all your learning materials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border rounded-md border">
                {materials.map((material) => (
                  <div
                    key={material.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-4">
                      {material.type === 'video' && <Video className="h-4 w-4" />}
                      {material.type === 'article' && <FileText className="h-4 w-4" />}
                      {material.type === 'resource' && <LinkIcon className="h-4 w-4" />}
                      <div>
                        <div className="font-medium">{material.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {material.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">{material.duration || 'N/A'}</div>
                      <div className="text-sm text-muted-foreground">
                        {material.course || 'Uncategorized'}
                      </div>
                      <div>{material.progress}</div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/content/${material.id}`}>
                            Edit
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos">
          <Card>
            <CardHeader>
              <CardTitle>Video Content</CardTitle>
              <CardDescription>
                Manage your video lessons and tutorials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border rounded-md border">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-4">
                      <Video className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{video.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {video.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">{video.duration || 'N/A'}</div>
                      <div className="text-sm text-muted-foreground">
                        {video.course || 'Uncategorized'}
                      </div>
                      <div>{video.progress}</div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/content/${video.id}`}>
                            Edit
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="articles">
          <Card>
            <CardHeader>
              <CardTitle>Articles</CardTitle>
              <CardDescription>
                Manage your written content and documentation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border rounded-md border">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-4">
                      <FileText className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{article.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {article.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm">Admin</div>
                      <div className="text-sm text-muted-foreground">
                        {article.course || 'Uncategorized'}
                      </div>
                      <div>{article.progress}</div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/content/${article.id}`}>
                            Edit
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Additional Resources</CardTitle>
              <CardDescription>
                Manage supplementary materials and external resources
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border rounded-md border">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-4">
                      <LinkIcon className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{resource.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {resource.description}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm text-muted-foreground">
                        {resource.course || 'Uncategorized'}
                      </div>
                      <div>{resource.progress}</div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/content/${resource.id}`}>
                            Edit
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
