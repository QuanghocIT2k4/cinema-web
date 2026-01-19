import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '../../../../services/api'
import type { MovieFormData, Movie } from '../../../../shared/types/movie.types'
import { toast } from 'react-hot-toast'

export const useUpdateMovie = () => {
    const queryClient = useQueryClient()

    return useMutation<Movie, Error, { id: number; data: MovieFormData }>({
        mutationFn: async ({ id, data }) => {
            const response = await apiClient.put<Movie>(`/movies/${id}`, data)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'movies'] })
            toast.success('Movie updated successfully!')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update movie')
        }
    })
}
