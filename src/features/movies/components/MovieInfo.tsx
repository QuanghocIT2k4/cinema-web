import type { Movie } from '@/shared/types/movie.types'
import { Clock, Calendar, Star, Play } from 'lucide-react'

interface MovieInfoProps {
  movie: Movie
  onWatchTrailer?: () => void
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return hours > 0 ? `${hours}h ${mins}phút` : `${mins}phút`
}

export default function MovieInfo({ movie, onWatchTrailer }: MovieInfoProps) {
  return (
    <>
      <div>
        <h1 className="text-4xl md:text-5xl font-bold mb-3">{movie.title}</h1>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-[#cccccc]">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#fe7e32]" />
            <span>{movie.releaseDate ? formatDate(movie.releaseDate) : 'N/A'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#fe7e32]" />
            <span>{formatDuration(movie.duration || 120)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="font-semibold">Not rated yet</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {movie.genre && (
            <span className="px-3 py-1 bg-[#242b3d] border border-white/10 text-white rounded-full text-xs">
              {movie.genre}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-[#fe7e32]">Synopsis</h3>
          <p className="text-[#cccccc] leading-relaxed text-sm max-w-2xl">
            {movie.description || 'No description available'}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 items-center">
        {movie.trailer && (
          <button
            onClick={onWatchTrailer}
            className="flex items-center gap-2 px-6 py-3 bg-[#fe7e32] hover:bg-opacity-90 text-white rounded-lg font-semibold transition-all shadow-lg shadow-[#fe7e32]/20 hover:shadow-[#fe7e32]/40 transform hover:scale-105"
          >
            <Play className="w-5 h-5" />
            Watch Trailer
          </button>
        )}
      </div>
    </>
  )
}
