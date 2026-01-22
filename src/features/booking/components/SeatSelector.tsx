import { useQuery } from '@tanstack/react-query'
import { bookingsApi } from '@/shared/api/bookings.api'

interface SeatSelectorProps {
  showtimeId: string
  selectedSeats: number[]
  onSeatToggle: (seatId: number) => void
  onContinue: () => void
}

export default function SeatSelector({
  showtimeId,
  selectedSeats,
  onSeatToggle,
  onContinue,
}: SeatSelectorProps) {
  const { data: bookedSeats, isLoading } = useQuery({
    queryKey: ['bookedSeats', showtimeId],
    queryFn: () => bookingsApi.getBookedSeatsByShowtime(showtimeId),
  })

  // Mock seat layout - trong thực tế cần fetch từ API
  const rows = 10
  const cols = 12
  const seats: Array<{ id: number; row: string; col: number; isBooked: boolean }> = []

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const seatId = r * cols + c + 1
      const isBooked = bookedSeats?.some((bs) => bs.seatId === seatId) || false
      seats.push({
        id: seatId,
        row: String.fromCharCode(65 + r), // A, B, C...
        col: c + 1,
        isBooked,
      })
    }
  }

  if (isLoading) {
    return (
      <div className="bg-[#1a2232] rounded-2xl p-6 text-center">
        <div className="text-gray-400">Loading seat map...</div>
      </div>
    )
  }

  return (
    <div className="bg-[#1a2232] rounded-2xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Choose seats</h2>
      <div className="mb-6">
        <div className="flex gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-600 rounded"></div>
            <span className="text-gray-400">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#fe7e32] rounded"></div>
            <span className="text-gray-400">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <span className="text-gray-400">Booked</span>
          </div>
        </div>
      </div>
      <div className="mb-4 text-center">
        <div className="inline-block bg-gray-700 px-4 py-2 rounded text-white text-sm">Screen</div>
      </div>
      <div className="space-y-2">
        {Array.from({ length: rows }, (_, r) => (
          <div key={r} className="flex items-center gap-2">
            <div className="w-8 text-gray-400 text-sm">{String.fromCharCode(65 + r)}</div>
            <div className="flex gap-1">
              {Array.from({ length: cols }, (_, c) => {
                const seat = seats[r * cols + c]
                const isSelected = selectedSeats.includes(seat.id)
                return (
                  <button
                    key={c}
                    onClick={() => !seat.isBooked && onSeatToggle(seat.id)}
                    disabled={seat.isBooked}
                    className={`w-8 h-8 rounded text-xs font-semibold transition-colors ${
                      seat.isBooked
                        ? 'bg-red-600 cursor-not-allowed'
                        : isSelected
                          ? 'bg-[#fe7e32] text-white'
                          : 'bg-gray-600 hover:bg-gray-500 text-white'
                    }`}
                  >
                    {seat.col}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
      {selectedSeats.length > 0 && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={onContinue}
            className="px-6 py-2 bg-[#fe7e32] text-white rounded-lg font-semibold hover:bg-[#fe7e32]/90"
          >
            Continue ({selectedSeats.length} seats)
          </button>
        </div>
      )}
    </div>
  )
}

