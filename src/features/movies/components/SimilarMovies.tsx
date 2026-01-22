import { Link } from 'react-router-dom'
import type { Movie } from '@/shared/types/movie.types'
import { ROUTES } from '@/shared/constants/routes'
import { Film } from 'lucide-react'

interface SimilarMoviesProps {
  movies: Movie[]
  limit?: number
}

export default function SimilarMovies({ movies, limit = 8 }: SimilarMoviesProps) {
  if (movies.length === 0) return null

  const items = limit > 0 ? movies.slice(0, limit) : movies

  return (
    <div className="bg-[#242b3d] rounded-2xl p-6 shadow-xl border border-white/5 sticky top-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <Film className="w-5 h-5 text-[#fe7e32]" />
        You might also like
      </h3>
      <div className="space-y-4">
        {items.map((movie) => (
          <Link key={movie.id} to={ROUTES.MOVIE_DETAIL(movie.id)} className="group block">
            <div className="flex gap-4 bg-[#1a2232]/50 hover:bg-[#1a2232] rounded-lg p-2 transition-all border border-transparent hover:border-[#fe7e32]/50">
              <img
                src={movie.poster}
                alt={movie.title}
                className="flex-shrink-0 w-16 h-24 object-cover rounded-md"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'https://via.placeholder.com/64x96/1a2232/ffffff?text=Movie'
                }}
              />
              <div className="flex-1 flex flex-col justify-center min-w-0">
                <h4 className="text-white font-semibold text-sm mb-1 line-clamp-2 group-hover:text-[#fe7e32] transition-colors">
                  {movie.title}
                </h4>
                <div className="text-xs text-[#9aa4b8]">
                  {movie.genre ? movie.genre : 'Genre not available'}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

