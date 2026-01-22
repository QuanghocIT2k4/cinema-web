import type { Movie } from '../../../../shared/types/movie.types'
import { MovieStatus } from '../../../../shared/types/movie.types'

interface MovieRowProps {
  movie: Movie
  onEdit: (movie: Movie) => void
  onDelete: (movie: Movie) => void
}

export default function MovieRow({ movie, onEdit, onDelete }: MovieRowProps) {
  const getStatusBadge = (status: MovieStatus) => {
    const statusConfig = {
      [MovieStatus.NOW_SHOWING]: { label: 'Now showing', className: 'bg-green-900 text-green-300' },
      [MovieStatus.COMING_SOON]: { label: 'Coming soon', className: 'bg-blue-900 text-blue-300' },
      [MovieStatus.ENDED]: { label: 'Ended', className: 'bg-gray-700 text-gray-300' },
    }
    const config = statusConfig[status] || statusConfig[MovieStatus.COMING_SOON]
    return (
      <span className={`px-2 py-1 rounded text-xs font-semibold ${config.className}`}>
        {config.label}
      </span>
    )
  }

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors">
      <td className="px-6 py-4">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-16 h-24 object-cover rounded"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://via.placeholder.com/64x96/1a2232/ffffff?text=Movie'
          }}
        />
      </td>
      <td className="px-6 py-4">
        <div className="text-sm font-medium text-white">{movie.title}</div>
        <div className="text-xs text-gray-400 mt-1 line-clamp-2">{movie.description}</div>
      </td>
      <td className="px-6 py-4 text-sm text-gray-300">{movie.genre}</td>
      <td className="px-6 py-4 text-sm text-gray-300">{movie.duration} min</td>
      <td className="px-6 py-4">{getStatusBadge(movie.status)}</td>
      <td className="px-6 py-4">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(movie)}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(movie)}
            className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-xs"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

