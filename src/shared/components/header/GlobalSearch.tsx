import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { Loader2, Search } from 'lucide-react'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { moviesApi } from '@/shared/api/movies.api'
import { ROUTES } from '@/shared/constants/routes'

/**
 * GlobalSearch: movie search input in the Header.
 * - Uses React Query + debounce to keep requests lightweight.
 * - Returns up to 5 results.
 */
const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const searchRef = useRef<HTMLDivElement>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['movieSearch', debouncedQuery],
    queryFn: () => moviesApi.searchMovies(debouncedQuery, { page: 0, size: 5 }),
    enabled: !!debouncedQuery,
  })

  const results = useMemo(() => data?.content || [], [data])
  const showResults = isFocused && query.trim().length > 0

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative w-full max-w-xs md:max-w-sm lg:max-w-md" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search for movies..."
          className="bg-[#242b3d] border border-gray-700 rounded-full w-full py-2.5 pl-10 pr-10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#fe7e32] transition-all duration-300"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
        />
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
        {isLoading && (
          <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 animate-spin" />
        )}
      </div>

      {showResults && (
        <div className="absolute top-full mt-2 w-full bg-[#242b3d] rounded-lg shadow-xl border border-white/10 overflow-hidden animate-in fade-in zoom-in-95">
          {results.length > 0 ? (
            <div className="max-h-96 overflow-y-auto">
              {results.map((movie) => (
                <Link
                  key={movie.id}
                  to={ROUTES.MOVIE_DETAIL(movie.id)}
                  className="flex items-center gap-4 p-3 hover:bg-[#1a2232] transition-colors"
                  onClick={() => setIsFocused(false)}
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-12 h-16 object-cover rounded-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = 'https://via.placeholder.com/80x120/1a2232/ffffff?text=Movie'
                    }}
                  />
                  <div className="min-w-0">
                    <p className="font-semibold text-white line-clamp-1">{movie.title}</p>
                    <p className="text-xs text-gray-400">{movie.duration} min</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : !isLoading ? (
            <div className="p-4 text-center text-sm text-gray-400">No results found for "{debouncedQuery}"</div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default GlobalSearch






