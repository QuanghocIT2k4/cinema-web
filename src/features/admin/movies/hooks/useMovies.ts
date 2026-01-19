import { useQuery } from '@tanstack/react-query'
import apiClient from '../../../../services/api'
import type { MoviesParams, MoviesResponse } from '../../../../shared/types/movie.types'

export const useMovies = (params: MoviesParams = {}) => {
    return useQuery<MoviesResponse>({
        queryKey: ['admin', 'movies', params],
        queryFn: async () => {
            const response = await apiClient.get<MoviesResponse>('/movies', { params })
            return response.data
        },
        staleTime: 5 * 60 * 1000 // 5 minutes
    })
}
