import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/api-client'
import type { BookingsParams, BookingsResponse } from '@/shared/types/booking.types'

/**
 * Hook để lấy danh sách bookings cho Admin
 * Tự động refetch mỗi 5 giây để cập nhật real-time khi User đặt booking mới
 */
export const useBookings = (params: BookingsParams = {}) => {
    return useQuery<BookingsResponse>({
        queryKey: ['admin', 'bookings', params],
        queryFn: async () => {
            // Backend chỉ hỗ trợ status, page, size - không hỗ trợ search
            const { search, ...apiParams } = params
            const response = await apiClient.get<BookingsResponse>('/api/bookings', { params: apiParams })
            return response.data
        },
        placeholderData: (prev: BookingsResponse | undefined) => prev,
        staleTime: 5 * 60 * 1000, // 5 phút
        // Tự động refetch mỗi 5 giây để cập nhật real-time
        refetchInterval: 5000,
        // Refetch khi user quay lại tab/window
        refetchOnWindowFocus: true,
        // Refetch khi reconnect
        refetchOnReconnect: true,
    })
}

