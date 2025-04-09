'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { useDebounce } from '@/hooks/use-debounce'

interface SearchContextType {
  searchQuery: string
  debouncedSearchQuery: string
  setSearchQuery: (query: string) => void
  isSearching: boolean
  setIsSearching: (isSearching: boolean) => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearchQuery = useDebounce(searchQuery, 500)

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        debouncedSearchQuery,
        setSearchQuery,
        isSearching,
        setIsSearching,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
} 