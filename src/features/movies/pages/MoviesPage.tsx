import React, { useMemo, useState } from 'react'
import MoviesFilter, { type MoviesFilterState } from '../components/MoviesFilter'
import MoviesGrid from '../components/MoviesGrid'
import { useMovies } from '../hooks/useMovies'

const MoviesPage: React.FC = () => {
  const [page, setPage] = useState(0)
  const [filters, setFilters] = useState<MoviesFilterState>({
    genres: [],
    year: '',
    rating: '',
    sortBy: 'releaseDate',
    sortOrder: 'desc',
  })

  const pageSize = 12

  const queryParams = useMemo(
    () => ({
      page,
      size: pageSize,
      genre: filters.genres.length > 0 ? filters.genres.join(',') : undefined,
      sortBy: filters.sortBy,
      sortOrder: filters.sortOrder,
    }),
    [filters, page],
  )

  const { data, isLoading, isError, error } = useMovies(queryParams)
  const movies = data?.content || []
  const totalPages = data?.totalPages || 1
  const totalElements = data?.totalElements || movies.length

  const handleFilterChange = (next: MoviesFilterState) => {
    setFilters(next)
    setPage(0)
  }

  const handlePageChange = (p: number) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#0b1220]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="space-y-1">
          <p className="text-sm text-gray-400">Trang 6 - Movies</p>
          <h1 className="text-3xl lg:text-4xl font-bold text-white">Movies</h1>
          <p className="text-gray-400">Bộ sưu tập phim đang chiếu và sắp chiếu.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <MoviesFilter filters={filters} onFilterChange={handleFilterChange} />
            </div>
          </div>

          <div className="lg:col-span-9">
            <MoviesGrid
              movies={movies}
              isLoading={isLoading}
              isError={isError}
              error={error as any}
              currentPage={page}
              totalPages={totalPages}
              totalElements={totalElements}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoviesPage

