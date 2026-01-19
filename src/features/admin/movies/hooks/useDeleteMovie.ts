import { useMutation, useQueryClient } from '@tanstack/react-query'
import apiClient from '../../../../services/api'
import { toast } from 'react-hot-toast'

export const useDeleteMovie = () => {
    const queryClient = useQueryClient()

    return useMutation<void, Error, number>({
        mutationFn: async (id: number) => {
            await apiClient.delete(`/movies/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['admin', 'movies'] })
            toast.success('Movie deleted successfully!')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to delete movie')
        }
    })
}
