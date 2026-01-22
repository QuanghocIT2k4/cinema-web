import { useQuery } from '@tanstack/react-query'
import { showtimesApi } from '@/shared/api/showtimes.api'
import { useParams } from 'react-router-dom'

interface ShowtimeSelectorProps {
  onSelectShowtime: (id: number | string) => void
}

export default function ShowtimeSelector({ onSelectShowtime }: ShowtimeSelectorProps) {
  const { movieId } = useParams<{ movieId: string }>()

  const { data: showtimes, isLoading } = useQuery({
    queryKey: ['showtimes', 'movie', movieId],
    queryFn: () => showtimesApi.getByMovie(movieId!),
    enabled: !!movieId,
  })

  if (isLoading) {
    return (
      <div className="bg-[#1a2232] rounded-2xl p-6 text-center">
        <div className="text-gray-400">Loading showtimes...</div>
      </div>
    )
  }

  if (!showtimes || showtimes.length === 0) {
    return (
      <div className="bg-[#1a2232] rounded-2xl p-6 text-center">
        <div className="text-gray-400">No showtimes available</div>
      </div>
    )
  }

  return (
    <div className="bg-[#1a2232] rounded-2xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Choose showtime</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {showtimes.map((showtime) => (
          <button
            key={showtime.id}
            onClick={() => onSelectShowtime(showtime.id)}
            className="p-4 bg-[#0f172a] border border-white/10 rounded-lg hover:border-[#fe7e32] transition-colors text-left"
          >
            <div className="text-white font-semibold">
              {new Date(showtime.startTime).toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
            <div className="text-sm text-gray-400 mt-1">
              {showtime.cinemaName} • {showtime.roomNumber}
            </div>
            <div className="text-sm text-[#fe7e32] mt-2 font-semibold">
              {Math.round(showtime.price).toLocaleString('vi-VN')}đ
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

