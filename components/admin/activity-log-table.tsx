'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Filter, ChevronLeft, ChevronRight, Download } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatDistance } from 'date-fns'

interface ActivityLog {
  id: string
  userId: string
  action: string
  target: string | null
  metadata: any
  createdAt: string
  user: {
    name: string | null
    email: string | null
  }
}

interface Pagination {
  total: number
  pages: number
  page: number
  limit: number
}

interface ActivityLogTableProps {
  initialLogs: ActivityLog[]
  initialPagination: Pagination
}

// Add loading skeleton row component
function LoadingRow() {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-96"></div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
      </td>
    </tr>
  )
}

export function ActivityLogTable({ initialLogs, initialPagination }: ActivityLogTableProps) {
  const [logs, setLogs] = useState<ActivityLog[]>(initialLogs)
  const [pagination, setPagination] = useState<Pagination>(initialPagination)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchLogs()
  }, [filter, search, pagination.page])

  async function fetchLogs() {
    try {
      setIsLoading(true)
      const params = new URLSearchParams({
        filter,
        search,
        page: pagination.page.toString(),
        limit: pagination.limit.toString(),
      })
      
      const response = await fetch(`/api/admin/activity?${params}`)
      if (!response.ok) throw new Error('Failed to fetch logs')
      
      const data = await response.json()
      setLogs(data.logs)
      setPagination(data.pagination)
    } catch (error) {
      console.error('Error fetching logs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to extract entity type from target string (format: "entityType:entityId")
  const getEntityType = (target: string | null): string => {
    if (!target) return 'unknown';
    const parts = target.split(':');
    return parts.length > 0 ? parts[0] : 'unknown';
  };

  // Helper function to get details from metadata
  const getDetails = (metadata: any): string => {
    if (!metadata) return '';
    if (metadata.details) return metadata.details;
    return JSON.stringify(metadata);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search activity logs..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Select
          value={filter}
          onValueChange={setFilter}
        >
          <SelectTrigger className="w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Activities</SelectItem>
            <SelectItem value="user">User Management</SelectItem>
            <SelectItem value="course">Course Management</SelectItem>
            <SelectItem value="content">Content Management</SelectItem>
            <SelectItem value="system">System Changes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                Array.from({ length: pagination.limit }).map((_, i) => (
                  <LoadingRow key={i} />
                ))
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                    No activity logs found
                  </td>
                </tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.user.name || log.user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${log.action === 'created' && 'bg-green-100 text-green-800'}
                        ${log.action === 'updated' && 'bg-blue-100 text-blue-800'}
                        ${log.action === 'deleted' && 'bg-red-100 text-red-800'}
                        ${log.action === 'imported' && 'bg-purple-100 text-purple-800'}
                        ${log.action === 'viewed' && 'bg-gray-100 text-gray-800'}
                      `}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {getEntityType(log.target)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {getDetails(log.metadata)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDistance(new Date(log.createdAt), new Date(), { addSuffix: true })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <Button
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
            disabled={pagination.page === 1 || isLoading}
            variant="outline"
          >
            Previous
          </Button>
          <Button
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
            disabled={pagination.page === pagination.pages || isLoading}
            variant="outline"
          >
            Next
          </Button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">{((pagination.page - 1) * pagination.limit) + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(pagination.page * pagination.limit, pagination.total)}
              </span> of{' '}
              <span className="font-medium">{pagination.total}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <Button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1 || isLoading}
                variant="outline"
                className="rounded-l-md"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page === pagination.pages || isLoading}
                variant="outline"
                className="rounded-r-md"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
} 