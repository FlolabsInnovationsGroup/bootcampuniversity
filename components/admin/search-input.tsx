import { Input } from '@/components/ui/input'
import { Loader2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSearch } from '@/contexts/search-context'

interface SearchInputProps {
  placeholder?: string
  className?: string
}

export function SearchInput({ placeholder = 'Search...', className }: SearchInputProps) {
  const { searchQuery, setSearchQuery, isSearching } = useSearch()

  return (
    <div className="relative">
      <Input
        type="search"
        placeholder={placeholder}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={className}
      />
      <div className="absolute right-2 top-2.5 flex items-center gap-2">
        {isSearching && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="h-5 w-5 p-0"
            onClick={() => setSearchQuery('')}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </div>
  )
} 