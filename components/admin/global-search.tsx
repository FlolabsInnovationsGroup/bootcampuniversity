import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useSearch } from '@/contexts/search-context'
import { Loader2, User, Book, FileText } from 'lucide-react'

interface SearchResult {
  users?: Array<{
    id: string
    name: string | null
    email: string | null
    role: string
    _count: { enrollments: number }
  }>
  courses?: Array<{
    id: string
    title: string
    description: string
    status: string
    _count: { enrollments: number; materials: number }
  }>
  materials?: Array<{
    id: string
    title: string
    description: string | null
    type: string
    course: { id: string; title: string }
  }>
}

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const [results, setResults] = useState<SearchResult>({})
  const router = useRouter()
  const { debouncedSearchQuery, searchQuery, setSearchQuery, isSearching, setIsSearching } = useSearch()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  useEffect(() => {
    async function performSearch() {
      if (!debouncedSearchQuery) {
        setResults({})
        return
      }

      try {
        setIsSearching(true)
        const response = await fetch(`/api/admin/search?q=${encodeURIComponent(debouncedSearchQuery)}&type=all`)
        if (!response.ok) throw new Error('Search failed')
        const data = await response.json()
        setResults(data)
      } catch (error) {
        console.error('Search error:', error)
        setResults({})
      } finally {
        setIsSearching(false)
      }
    }

    performSearch()
  }, [debouncedSearchQuery, setIsSearching])

  function handleSelect(type: string, id: string) {
    setOpen(false)
    setSearchQuery('')
    router.push(`/admin/${type}/${id}`)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      >
        <span>Search...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0">
          <Command>
            <CommandInput
              placeholder="Search users, courses, and materials..."
              value={searchQuery}
              onValueChange={setSearchQuery}
            />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {isSearching ? (
                <div className="flex items-center justify-center py-6">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <>
                  {results.users?.length ? (
                    <CommandGroup heading="Users">
                      {results.users.map((user) => (
                        <CommandItem
                          key={user.id}
                          onSelect={() => handleSelect('users', user.id)}
                        >
                          <User className="mr-2 h-4 w-4" />
                          <div className="flex flex-col">
                            <span>{user.name || user.email}</span>
                            <span className="text-xs text-muted-foreground">
                              {user.role} • {user._count.enrollments} enrollments
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ) : null}
                  {results.courses?.length ? (
                    <CommandGroup heading="Courses">
                      {results.courses.map((course) => (
                        <CommandItem
                          key={course.id}
                          onSelect={() => handleSelect('courses', course.id)}
                        >
                          <Book className="mr-2 h-4 w-4" />
                          <div className="flex flex-col">
                            <span>{course.title}</span>
                            <span className="text-xs text-muted-foreground">
                              {course.status} • {course._count.enrollments} enrollments • {course._count.materials} materials
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ) : null}
                  {results.materials?.length ? (
                    <CommandGroup heading="Materials">
                      {results.materials.map((material) => (
                        <CommandItem
                          key={material.id}
                          onSelect={() => handleSelect('materials', material.id)}
                        >
                          <FileText className="mr-2 h-4 w-4" />
                          <div className="flex flex-col">
                            <span>{material.title}</span>
                            <span className="text-xs text-muted-foreground">
                              {material.type} • {material.course.title}
                            </span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  ) : null}
                </>
              )}
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </>
  )
} 