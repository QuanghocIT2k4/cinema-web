import { useQuery } from '@tanstack/react-query'
import { bookingsApi } from '@/shared/api/bookings.api'

/**
 * Hook để lấy danh sách ghế đã được đặt cho showtime
 */
export function useBookedSeats(showtimeId: string | undefined) {
  return useQuery({
    queryKey: ['bookedSeats', showtimeId],
    queryFn: () => bookingsApi.getBookedSeatsByShowtime(showtimeId!),
    enabled: !!showtimeId,
  })
}


