import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bookingsApi } from '@/shared/api/bookings.api'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { ROUTES } from '@/shared/constants/routes'

/**
 * Hook để tạo booking
 */
export function useCreateBooking() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: { showtimeId: string; seatIds: number[] }) =>
      bookingsApi.createBooking(payload),
    onSuccess: () => {
      // Invalidate cache booking history để load lại dữ liệu mới nhất
      queryClient.invalidateQueries({ queryKey: ['user', 'bookings'] })
      
      toast.success('Booking successful!')
      navigate(ROUTES.BOOKING_HISTORY)
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Booking failed')
    },
  })
}


