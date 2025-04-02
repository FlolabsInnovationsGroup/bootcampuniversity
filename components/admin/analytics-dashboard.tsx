'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, BookOpen, GraduationCap, Activity } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'

interface AnalyticsData {
  users: {
    total: number
    new: number
  }
  courses: {
    total: number
    active: number
  }
  enrollments: {
    total: number
    recent: number
    completionRate: string
  }
  activity: {
    byType: Array<{
      entityType: string
      _count: {
        id: number
      }
    }>
    daily: Array<{
      createdAt: string
      _count: {
        id: number
      }
    }>
  }
}

interface AnalyticsDashboardProps {
  data: AnalyticsData
}

export function AnalyticsDashboard({ data }: AnalyticsDashboardProps) {
  // Format daily activity data for the chart
  const chartData = data.activity.daily.map(day => ({
    date: format(new Date(day.createdAt), 'MMM dd'),
    activities: day._count.id
  }))

  return (
    <div className="space-y-8">
      {/* Metrics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.users.total}</div>
            <p className="text-xs text-muted-foreground">
              +{data.users.new} new in last 30 days
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.courses.active}</div>
            <p className="text-xs text-muted-foreground">
              of {data.courses.total} total courses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Course Enrollments</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.enrollments.total}</div>
            <p className="text-xs text-muted-foreground">
              {data.enrollments.completionRate}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.activity.daily.reduce((sum, day) => sum + day._count.id, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              actions in last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Trend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="activities"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Activity by Type */}
      <Card>
        <CardHeader>
          <CardTitle>Activity by Type</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {data.activity.byType.map(type => (
              <div key={type.entityType} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                <span className="capitalize">{type.entityType}</span>
                <span className="font-medium">{type._count.id}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 