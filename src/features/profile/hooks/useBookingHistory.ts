import { useQuery } from '@tanstack/react-query'
import { bookingsApi } from '@/shared/api/bookings.api'
import { BookingStatus } from '@/shared/types/booking.types'

const PAGE_SIZE = 10

interface UseBookingHistoryParams {
  page: number
  statusFilter?: BookingStatus | ''
}

/**
 * Hook để lấy lịch sử đặt vé của user
 * Tự động refetch mỗi 5 giây để cập nhật real-time khi Admin confirm/cancel
 */
export function useBookingHistory({ page, statusFilter = '' }: UseBookingHistoryParams) {
  return useQuery({
    queryKey: ['user', 'bookings', page, statusFilter],
    queryFn: async () => {
      try {
        const result = await bookingsApi.getBookings({
          page,
          size: PAGE_SIZE,
          ...(statusFilter ? { status: statusFilter } : {}),
        })
        return result
      } catch (err: any) {
        console.error('Error loading bookings:', err)
        throw err
      }
    },
    retry: 1,
    // Tự động refetch mỗi 5 giây để cập nhật real-time
    refetchInterval: 5000,
    // Refetch khi user quay lại tab/window
    refetchOnWindowFocus: true,
    // Refetch khi reconnect
    refetchOnReconnect: true,
  })
}


