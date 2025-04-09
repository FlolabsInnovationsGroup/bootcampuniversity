'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface ContentEngagementData {
  type: string
  count: number
  views: number
}

interface ContentEngagementChartProps {
  data: ContentEngagementData[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

export function ContentEngagementChart({ data }: ContentEngagementChartProps) {
  const totalViews = data.reduce((sum, item) => sum + item.views, 0)
  const formattedData = data.map(item => ({
    ...item,
    percentage: ((item.views / totalViews) * 100).toFixed(1)
  }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Content Engagement</CardTitle>
        <CardDescription>
          Distribution of content views by type
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={formattedData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="views"
                label={({ name, percentage }) => `${name} (${percentage}%)`}
              >
                {formattedData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
} 