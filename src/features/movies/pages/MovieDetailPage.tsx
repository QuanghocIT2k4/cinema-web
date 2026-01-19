import React, { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  Calendar,
  Clock,
  Film,
  ArrowLeft,
  Play,
  Users,
  Ticket,
  Star,
} from 'lucide-react'
import { useMovieDetail } from '../hooks/useMovieDetail'
import { useMovies } from '../hooks/useMovies'
import { ROUTES } from '@/shared/constants/routes'

const formatDate = (iso?: string) => {
  if (!iso) return 'N/A'
  return new Date(iso).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const formatDuration = (minutes?: number) => {
  if (!minutes && minutes !== 0) return 'N/A'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h ? `${h}h ${m}m` : `${m}m`
}

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data: movie, isLoading, isError, error } = useMovieDetail(id || null)

  // Similar movies (simple): lấy 6 phim, bỏ trùng id hiện tại
  const { data: similarData } = useMovies({ page: 0, size: 6 })
  const similarMovies = useMemo(
    () => (similarData?.content || []).filter((m) => `${m.id}` !== id),
    [similarData, id],
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0b1220] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#fe7e32] border-t-transparent rounded-full animate-spin" />
          <p>Đang tải thông tin phim...</p>
        </div>
      </div>
    )
  }

  if (isError || !movie) {
    return (
      <div className="min-h-screen bg-[#0b1220] flex items-center justify-center text-white">
        <div className="text-center space-y-3">
          <p className="text-lg font-semibold">Không tìm thấy phim.</p>
          <p className="text-gray-400 text-sm">
            {error && typeof error === 'object' && 'message' in (error as any)
              ? (error as any).message
              : 'Vui lòng thử lại sau.'}
          </p>
          <Link
            to={ROUTES.MOVIES}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#fe7e32] rounded-lg text-white font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Quay lại Movies
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      {/* Hero */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-[420px] object-cover blur-sm opacity-70"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src =
                'https://via.placeholder.com/1200x420/1a2232/ffffff?text=Movie+Backdrop'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b1220] via-[#0b1220]/75 to-transparent" />
        </div>

        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="w-full sm:w-72 lg:w-80 flex-shrink-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src =
                    'https://via.placeholder.com/360x540/1a2232/ffffff?text=Movie'
                }}
              />
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-md border border-white/10 text-xs font-bold">
                {movie.ageRating || 'PG-13'}
              </div>
            </div>
          </div>

          {/* Main info */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
              <Link
                to={ROUTES.MOVIES}
                className="inline-flex items-center gap-2 text-sm text-gray-200 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Movies
              </Link>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold">{movie.title}</h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#fe7e32]" />
                <span>{formatDate(movie.releaseDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#fe7e32]" />
                <span>{formatDuration(movie.duration)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Film className="w-4 h-4 text-[#fe7e32]" />
                <span>{movie.status}</span>
              </div>
              {movie.endDate && (
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <span>Kết thúc:</span>
                  <span>{formatDate(movie.endDate)}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {movie.genre?.split(',').map((g) => (
                <span
                  key={g.trim()}
                  className="px-3 py-1 bg-white/10 text-gray-100 rounded-full text-xs border border-white/10"
                >
                  {g.trim()}
                </span>
              ))}
            </div>

            <p className="text-gray-200 leading-relaxed">{movie.description}</p>

            <div className="flex flex-wrap gap-3">
              {movie.trailer && (
                <a
                  href={movie.trailer}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#fe7e32] text-white rounded-lg font-semibold shadow-lg shadow-[#fe7e32]/25 hover:opacity-90 transition-all"
                >
                  <Play className="w-4 h-4" />
                  Xem trailer
                </a>
              )}
              <Link
                to={ROUTES.MOVIES}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                Quay lại danh sách
              </Link>
            </div>
          </div>

          {/* Sidebar - Similar */}
          <div className="hidden lg:block lg:w-72 flex-shrink-0">
            <div className="bg-[#1a2232] rounded-2xl p-5 shadow-xl border border-white/5 sticky top-20 space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Film className="w-4 h-4 text-[#fe7e32]" />
                You Might Also Like
              </h3>
              <div className="space-y-4">
                {similarMovies.map((m) => (
                  <Link
                    key={m.id}
                    to={ROUTES.MOVIE_DETAIL(m.id)}
                    className="flex gap-3 bg-[#0f172a]/60 hover:bg-[#0f172a] rounded-lg p-2 transition-all border border-transparent hover:border-[#fe7e32]/40"
                  >
                    <img
                      src={m.poster}
                      alt={m.title}
                      className="w-14 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white line-clamp-2 hover:text-[#fe7e32] transition-colors">
                        {m.title}
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-gray-300 mt-1">
                        <Star className="w-3 h-3 text-yellow-400" />
                        <span>{formatDuration(m.duration)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
                {similarMovies.length === 0 && (
                  <p className="text-sm text-gray-400">Chưa có gợi ý tương tự.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Body sections */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Cast (placeholder) */}
        <div className="bg-[#1a2232] rounded-2xl p-6 shadow-xl border border-white/5">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Users className="w-6 h-6 text-[#fe7e32]" />
            Cast & Crew
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="text-center">
                <div className="w-20 h-20 rounded-full bg-[#0f172a] border border-white/10 mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-300">Updating...</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking placeholder */}
        <div className="bg-[#1a2232] rounded-2xl p-6 shadow-xl border border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#fe7e32] rounded-lg flex items-center justify-center shadow-lg shadow-[#fe7e32]/20">
              <Ticket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Booking đang được tích hợp</h3>
              <p className="text-sm text-gray-300">Sẽ mở khi hoàn thiện flow đặt vé.</p>
            </div>
          </div>
          <Link
            to={ROUTES.HOME}
            className="inline-flex items-center justify-center px-5 py-2.5 bg-white/10 border border-white/10 text-white rounded-lg font-semibold hover:bg-white/15 transition-colors"
          >
            Về trang chủ
          </Link>
        </div>

        {/* Reviews placeholder */}
        <div className="bg-[#1a2232] rounded-2xl p-6 shadow-xl border border-white/5">
          <h3 className="text-2xl font-bold text-white mb-2">Reviews</h3>
          <p className="text-sm text-gray-300">Sẽ mở sau khi kết nối API đánh giá.</p>
        </div>
      </div>
    </div>
  )
}

export default MovieDetailPage

