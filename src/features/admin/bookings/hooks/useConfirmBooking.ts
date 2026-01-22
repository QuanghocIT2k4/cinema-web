import { useMutation, useQueryClient } from '@tanstack/react-query'
import { bookingsApi } from '../../../../shared/api/bookings.api'
import { toast } from 'react-hot-toast'

export const useConfirmBooking = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: number | string) => {
            return await bookingsApi.confirmBooking(id)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'bookings'] })
            toast.success('Payment confirmed successfully!')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Unable to confirm payment')
        }
    })
}
