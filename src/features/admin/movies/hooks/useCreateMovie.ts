import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/api-client'
import type { MovieFormData, Movie } from '@/shared/types/movie.types'
import { toast } from 'react-hot-toast'

export const useCreateMovie = () => {
    const queryClient = useQueryClient()

    return useMutation<Movie, Error, MovieFormData>({
        mutationFn: async (data: MovieFormData) => {
            const response = await apiClient.post<Movie>('/api/movies', data)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'movies'] })
            toast.success('Movie created successfully!')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to create movie')
        }
    })
}
