import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/api-client'
import type { MoviesParams, MoviesResponse } from '@/shared/types/movie.types'

export const useMovies = (params: MoviesParams = {}) => {
    return useQuery<MoviesResponse>({
        queryKey: ['admin', 'movies', params],
        queryFn: async () => {
            const response = await apiClient.get<MoviesResponse>('/api/movies', { params })
            return response.data
        },
        placeholderData: (prev) => prev, // giữ lại dữ liệu cũ để tránh nhấp nháy khi refetch
        staleTime: 5 * 60 * 1000 // 5 phút
    })
}