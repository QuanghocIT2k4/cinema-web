import React from 'react'
import { Film, Clock, X, Download } from 'lucide-react'

interface MovieTicketCardProps {
  title: string
  poster: string
  rating: string // "T13", "T16", etc.
  genres: string[]
  duration?: number // in minutes
  onViewDetails?: () => void
  onClose?: () => void
  onDownload?: () => void
}

/**
 * Movie Ticket Card Component
 * Có 2 trạng thái: Normal và Hover
 * - Normal: Hiển thị poster, title, genres, button "View Details"
 * - Hover: Hiển thị thêm duration và có hiệu ứng
 */
const MovieTicketCard: React.FC<MovieTicketCardProps> = ({
  title,
  poster,
  rating,
  genres,
  duration,
  onViewDetails,
  onClose,
  onDownload
}) => {
  return (
    <div className="group relative w-[300px] overflow-hidden rounded-xl bg-[#262c3d] shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#ff6b35]/30">
      {/* Poster Container */}
      <div className="relative h-[400px] w-full overflow-hidden">
        {/* Poster Image */}
        <img
          src={poster}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://via.placeholder.com/300x400/242b3d/fe7e32?text=Movie'
          }}
        />

        {/* Rating Badge - Top Left */}
        <div className="absolute left-2 top-2 rounded bg-[#ef4444] px-2 py-1">
          <span className="text-xs font-bold text-white">{rating}</span>
        </div>

        {/* UI Controls - Top Right */}
        <div className="absolute right-2 top-2 flex gap-2">
          {onDownload && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDownload?.()
              }}
              className="rounded bg-black/60 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
            >
              <Download className="h-4 w-4" />
            </button>
          )}
          {onClose && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose?.()
              }}
              className="rounded bg-black/60 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/80"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Title Overlay on Poster - Only visible on hover */}
        <div className="absolute inset-0 flex items-start justify-center pt-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <h3 className="text-center text-lg font-light text-white">
            {title.split(' ').map((word, idx) => (
              <span key={idx}>
                {word === 'said' ? (
                  <>
                    said<span className="text-[#ef4444]">♥</span>
                  </>
                ) : (
                  word
                )}{' '}
              </span>
            ))}
          </h3>
        </div>
      </div>

      {/* Info Section - Below Poster */}
      <div className="p-4">
        {/* Main Title */}
        <h2 className="mb-2 text-xl font-bold text-white">{title}</h2>

        {/* Genre Tags */}
        <div className="mb-3 flex flex-wrap gap-2">
          {genres.slice(0, 2).map((genre) => (
            <span
              key={genre}
              className="rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm"
            >
              {genre}
            </span>
          ))}
        </div>

        {/* Duration - Only visible on hover */}
        {duration && (
          <div className="mb-3 flex items-center gap-2 text-sm text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Clock className="h-4 w-4" />
            <span>{duration} min</span>
          </div>
        )}

        {/* View Details Button */}
        <button
          onClick={onViewDetails}
          className="group/btn w-full rounded-lg bg-gradient-to-r from-[#ff6b35] to-[#648ddb] py-3 px-4 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
        >
          <div className="flex items-center justify-center gap-2">
            <Film className="h-4 w-4" />
            <span>View Details</span>
          </div>
        </button>
      </div>
    </div>
  )
}

export default MovieTicketCard

