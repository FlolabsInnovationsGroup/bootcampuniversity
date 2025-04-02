import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UserPlus, BookOpen, FileText, Settings2 } from 'lucide-react'

interface Activity {
  id: string
  userId: string
  action: string
  entityType: string
  entityId: string
  details: string
  createdAt: string
  user: {
    name: string
    email: string
  }
}

const getActivityIcon = (entityType: string) => {
  switch (entityType.toLowerCase()) {
    case 'user':
      return <UserPlus className="h-4 w-4" />
    case 'course':
      return <BookOpen className="h-4 w-4" />
    case 'material':
      return <FileText className="h-4 w-4" />
    default:
      return <Settings2 className="h-4 w-4" />
  }
}

export function ActivityLog() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch('/api/admin/activities')
        if (!response.ok) throw new Error('Failed to fetch activities')
        const data = await response.json()
        setActivities(data)
      } catch (error) {
        console.error('Error fetching activities:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">Loading activities...</p>
            </div>
          ) : activities.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">No recent activities</p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 rounded-lg border p-3"
                >
                  <div className="mt-1">{getActivityIcon(activity.entityType)}</div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.user.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action} {activity.entityType.toLowerCase()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.details}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(activity.createdAt), 'MMM d, yyyy h:mm a')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
} 