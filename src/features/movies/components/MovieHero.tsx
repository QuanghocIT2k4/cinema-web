import type { Movie } from '@/shared/types/movie.types'
import MovieInfo from './MovieInfo'

interface MovieHeroProps {
  movie: Movie
  onWatchTrailer?: () => void
}

export default function MovieHero({ movie, onWatchTrailer }: MovieHeroProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl isolate">
      {/* Backdrop Image with Gradient Overlay */}
      <div className="absolute inset-0 z-[-1]">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://via.placeholder.com/1920x500/1a2232/ffffff?text=Movie+Backdrop'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a2232] via-[#1a2232]/80 to-transparent" />
      </div>

      <div className="flex flex-col md:flex-row gap-8 p-8">
        {/* Poster */}
        <div className="flex-shrink-0 mx-auto md:mx-0 relative">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-60 md:w-64 rounded-xl shadow-lg border-2 border-white/10"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = 'https://via.placeholder.com/288x432/1a2232/ffffff?text=Movie'
            }}
          />
          <div className="absolute top-3 right-3 px-3 py-1 bg-black/80 backdrop-blur-sm rounded-md border border-white/20">
            <span className="text-xs font-bold text-white">{movie.ageRating || 'PG-13'}</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-white flex flex-col justify-between py-2">
          <MovieInfo movie={movie} onWatchTrailer={onWatchTrailer} />
        </div>
      </div>
    </div>
  )
}
