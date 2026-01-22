import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bookingsApi } from '../../../../shared/api/bookings.api'
import { toast } from 'react-hot-toast'

export const useCancelBooking = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: number | string) => {
            return await bookingsApi.cancelBooking(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'bookings'] })
            toast.success('Booking cancelled successfully!')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Unable to cancel booking')
        }
    })
}
