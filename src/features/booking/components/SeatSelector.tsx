import { useQuery } from '@tanstack/react-query'
import { bookingsApi } from '@/shared/api/bookings.api'
import { showtimesApi } from '@/shared/api/showtimes.api'
import { roomsApi } from '@/shared/api/rooms.api'

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
  // Lấy thông tin showtime để có roomId
  const { data: showtime } = useQuery({
    queryKey: ['showtime', showtimeId],
    queryFn: () => showtimesApi.getById(showtimeId),
    enabled: !!showtimeId,
  })

  // Lấy danh sách ghế thực từ database theo roomId
  const { data: seats, isLoading: isLoadingSeats } = useQuery({
    queryKey: ['seats', 'room', showtime?.roomId],
    queryFn: () => roomsApi.getSeatsByRoom(showtime!.roomId),
    enabled: !!showtime?.roomId,
  })

  // Lấy danh sách ghế đã được đặt cho showtime này
  const { data: bookedSeats, isLoading: isLoadingBooked } = useQuery({
    queryKey: ['bookedSeats', showtimeId],
    queryFn: () => bookingsApi.getBookedSeatsByShowtime(showtimeId),
    enabled: !!showtimeId,
  })

  const isLoading = isLoadingSeats || isLoadingBooked || !showtime

  // Tạo map để check ghế đã được đặt
  const bookedSeatIds = new Set(bookedSeats?.map((bs) => bs.seatId) || [])

  // Sắp xếp seats theo row và col để hiển thị đúng layout
  const sortedSeats = seats
    ? [...seats].sort((a, b) => {
        if (a.row !== b.row) {
          return a.row.localeCompare(b.row)
        }
        return a.col - b.col
      })
    : []

  // Tính số hàng từ dữ liệu thực
  const rows = showtime ? new Set(sortedSeats.map((s) => s.row)).size : 0

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
        {Array.from({ length: rows }, (_, r) => {
          const rowLetter = String.fromCharCode(65 + r)
          const rowSeats = sortedSeats.filter((s) => s.row === rowLetter)
          return (
            <div key={r} className="flex items-center gap-2">
              <div className="w-8 text-gray-400 text-sm">{rowLetter}</div>
              <div className="flex gap-1">
                {rowSeats.map((seat) => {
                  const isBooked = bookedSeatIds.has(seat.id)
                  const isSelected = selectedSeats.includes(seat.id)
                  return (
                    <button
                      key={seat.id}
                      onClick={() => !isBooked && onSeatToggle(seat.id)}
                      disabled={isBooked}
                      className={`w-8 h-8 rounded text-xs font-semibold transition-colors ${
                        isBooked
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
          )
        })}
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

