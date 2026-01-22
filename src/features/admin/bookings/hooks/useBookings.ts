import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/api-client'
import type { BookingsParams, BookingsResponse } from '@/shared/types/booking.types'

export const useBookings = (params: BookingsParams = {}) => {
    return useQuery<BookingsResponse>({
        queryKey: ['admin', 'bookings', params],
        queryFn: async () => {
            // Backend only supports status, page, size - search is not supported
            const { search, ...apiParams } = params
            const response = await apiClient.get<BookingsResponse>('/api/bookings', { params: apiParams })
            return response.data
        },
        placeholderData: (prev: BookingsResponse | undefined) => prev,
        staleTime: 5 * 60 * 1000 // 5 minutes
    })
}

