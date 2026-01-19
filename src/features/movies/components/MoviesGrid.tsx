import React from 'react'
import { Calendar, Clock, Grid3X3, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Movie } from '@/shared/types/movie.types'
import MovieCard from '@/features/home/components/MovieCard'

type Props = {
  movies: Movie[]
  isLoading: boolean
  isError: boolean
  error?: unknown
  currentPage: number
  totalPages: number
  totalElements: number
  onPageChange: (page: number) => void
}

const formatDate = (iso?: string) => {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

const formatDuration = (minutes?: number) => {
  if (!minutes && minutes !== 0) return ''
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h ? `${h}h ${m}m` : `${m}m`
}

const MoviesGrid: React.FC<Props> = ({
  movies,
  isLoading,
  isError,
  error,
  currentPage,
  totalPages,
  totalElements,
  onPageChange,
}) => {
  const renderPagination = () => {
    if (totalPages <= 1) return null
    const max = 5
    let start = Math.max(0, currentPage - Math.floor(max / 2))
    let end = Math.min(totalPages - 1, start + max - 1)
    if (end - start + 1 < max) start = Math.max(0, end - max + 1)

    const pages = []
    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
            i === currentPage
              ? 'bg-[#fe7e32] text-white'
              : 'bg-[#0f172a] text-gray-300 hover:bg-[#1f2937]'
          }`}
        >
          {i + 1}
        </button>,
      )
    }
    return pages
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-[#1a2232] rounded-lg p-6 shadow-lg">
          <div className="h-6 bg-white/10 rounded w-1/3 mb-2 animate-pulse" />
          <div className="h-4 bg-white/10 rounded w-1/2 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-[#1a2232] rounded-lg overflow-hidden shadow-lg animate-pulse">
              <div className="h-72 bg-white/10" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-white/10 rounded" />
                <div className="h-3 bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-white/10 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-[#1a2232] rounded-lg p-8 shadow-lg text-center">
        <h3 className="text-xl font-bold text-white mb-2">Không tải được danh sách phim</h3>
        <p className="text-gray-400 mb-4">
          {error && typeof error === 'object' && 'message' in (error as any) ? (error as any).message : 'Vui lòng thử lại sau.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 bg-[#fe7e32] text-white rounded-lg font-semibold hover:opacity-90 transition-colors"
        >
          Thử lại
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-[#1a2232] rounded-lg p-6 shadow-lg flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Grid3X3 className="w-5 h-5 text-[#fe7e32]" />
            Danh sách phim
          </h2>
          <p className="text-gray-400 text-sm">Hiển thị {movies.length} / {totalElements} phim</p>
        </div>
      </div>

      {movies.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <div key={movie.id} className="group">
                <MovieCard movie={movie} />
                <div className="mt-3 space-y-2 text-sm text-gray-300 px-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#fe7e32]" />
                    <span>{formatDate(movie.releaseDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#fe7e32]" />
                    <span>{formatDuration(movie.duration)}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {movie.genre?.split(',').slice(0, 2).map((g) => (
                      <span
                        key={g.trim()}
                        className="px-2 py-0.5 bg-white/10 text-gray-200 rounded-full text-[11px]"
                      >
                        {g.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="bg-[#1a2232] rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <button
                  onClick={() => onPageChange(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className="p-2 rounded bg-[#0f172a] text-gray-300 hover:bg-[#1f2937] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {renderPagination()}
                <button
                  onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="p-2 rounded bg-[#0f172a] text-gray-300 hover:bg-[#1f2937] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-[#1a2232] rounded-lg p-12 shadow-lg text-center">
          <Grid3X3 className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">Không có phim</h3>
          <p className="text-gray-400">Thử thay đổi bộ lọc để tìm phim khác.</p>
        </div>
      )}
    </div>
  )
}

export default MoviesGrid

