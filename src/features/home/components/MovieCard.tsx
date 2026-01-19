import React from 'react'
import { Link } from 'react-router-dom'
import { Clock } from 'lucide-react'
import type { Movie } from '@/shared/types/movie.types'
import { ROUTES } from '@/shared/constants/routes'

type Props = {
  movie: Movie
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  return (
    <Link
      to={ROUTES.MOVIE_DETAIL(movie.id)}
      className="group relative block bg-black w-48 h-72 flex-shrink-0 overflow-hidden rounded-xl shadow-lg"
    >
      <div className="absolute inset-0">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://via.placeholder.com/300x450/242b3d/fe7e32?text=Movie'
          }}
        />
      </div>

      {/* Static Info at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
        <h3 className="text-white font-bold text-sm leading-tight line-clamp-2">{movie.title}</h3>
        <div className="flex items-center gap-2 mt-1 text-xs text-gray-300">
          <Clock className="w-3 h-3" />
          <span>{movie.duration} min</span>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/70 bg-gradient-to-t from-black/90 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out">
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
          <h3 className="font-bold text-lg leading-tight">{movie.title}</h3>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {movie.genre.split(',').slice(0, 2).map((genre) => (
              <span
                key={genre.trim()}
                className="px-2 py-0.5 bg-white/10 text-gray-300 rounded-full text-[10px] font-medium"
              >
                {genre.trim()}
              </span>
            ))}
          </div>
          <button className="mt-4 w-full flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#a855f7] to-[#648ddb] py-2.5 text-sm font-semibold text-white shadow-lg transition-transform duration-200 ease-in-out hover:scale-105">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
            View Details
          </button>
        </div>
      </div>

      {/* Age Rating Badge */}
      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10">
        <span className="text-white text-xs font-bold">{movie.ageRating}</span>
      </div>
    </Link>
  )
}

export default MovieCard





