import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Ticket, Calendar, MapPin } from 'lucide-react'
import { ROUTES } from '@/shared/constants/routes'
import type { Showtime } from '@/shared/types/showtime.types'

interface ShowtimesSectionProps {
  showtimes: Showtime[]
  isLoading: boolean
  isError: boolean
}

export default function ShowtimesSection({ showtimes, isLoading, isError }: ShowtimesSectionProps) {
  // Nhóm các suất chiếu theo ngày và rạp
  const groupedShowtimes = useMemo(() => {
    if (!showtimes.length) return {}

    const grouped: Record<string, Record<string, Showtime[]>> = {}

    showtimes.forEach((showtime) => {
      const dateKey = new Date(showtime.startTime).toISOString().split('T')[0]
      const cinemaKey = `${showtime.cinemaId}-${showtime.cinemaName}`

      if (!grouped[dateKey]) {
        grouped[dateKey] = {}
      }
      if (!grouped[dateKey][cinemaKey]) {
        grouped[dateKey][cinemaKey] = []
      }
      grouped[dateKey][cinemaKey].push(showtime)
    })

    // Sắp xếp các suất chiếu trong từng nhóm theo thời gian bắt đầu
    Object.keys(grouped).forEach((dateKey) => {
      Object.keys(grouped[dateKey]).forEach((cinemaKey) => {
        grouped[dateKey][cinemaKey].sort(
          (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
        )
      })
    })

    return grouped
  }, [showtimes])

  const dateKeys = Object.keys(groupedShowtimes).sort()

  return (
    <div className="bg-[#1a2232] rounded-2xl p-6 shadow-xl border border-white/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-[#fe7e32] rounded-lg flex items-center justify-center shadow-lg shadow-[#fe7e32]/20">
          <Ticket className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Book tickets</h3>
          <p className="text-sm text-gray-300">Choose a showtime to start booking</p>
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <div className="text-gray-400">Loading showtimes...</div>
        </div>
      )}

      {isError && (
        <div className="text-center py-8">
          <div className="text-red-300">Failed to load showtimes for this movie.</div>
        </div>
      )}

      {!isLoading && !isError && showtimes.length === 0 && (
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-3" />
          <p className="text-gray-400">There are no upcoming showtimes for this movie.</p>
          <Link
            to={ROUTES.MOVIES}
            className="inline-block mt-4 px-4 py-2 bg-[#fe7e32] text-white rounded-lg hover:bg-[#fe7e32]/90 transition-colors"
          >
            Browse other movies
          </Link>
        </div>
      )}

      {dateKeys.length > 0 && (
        <div className="space-y-6">
          {dateKeys.map((dateKey) => {
            const date = new Date(dateKey)
            const dateStr = date.toLocaleDateString('vi-VN', {
              weekday: 'long',
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            })
            const cinemas = groupedShowtimes[dateKey]

            return (
              <div key={dateKey} className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-gray-700">
                  <Calendar className="w-5 h-5 text-[#fe7e32]" />
                  <h4 className="text-lg font-semibold text-white">{dateStr}</h4>
                </div>

                {Object.entries(cinemas).map(([cinemaKey, cinemaShowtimes]) => {
                  const firstShowtime = cinemaShowtimes[0]
                  return (
                    <div key={cinemaKey} className="bg-[#0f172a] rounded-xl p-4 border border-white/10">
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-[#fe7e32]" />
                        <span className="font-semibold text-white">{firstShowtime.cinemaName}</span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-300">Room {firstShowtime.roomNumber}</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {cinemaShowtimes.map((showtime) => (
                          <Link
                            key={showtime.id}
                            to={ROUTES.BOOKING(String(showtime.id))}
                            className="group relative px-4 py-2.5 bg-[#1a2232] border border-white/10 rounded-lg hover:border-[#fe7e32] hover:bg-[#1a2232]/80 transition-all"
                          >
                            <div className="text-white font-semibold">
                              {new Date(showtime.startTime).toLocaleTimeString('vi-VN', {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                            <div className="text-xs text-[#fe7e32] mt-1 font-medium">
                              {Math.round(showtime.price).toLocaleString('en-US')} ₫
                            </div>
                            <div className="absolute inset-0 bg-[#fe7e32]/10 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
