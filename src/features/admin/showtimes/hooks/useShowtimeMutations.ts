import { useMutation, useQueryClient } from '@tanstack/react-query'
import { showtimesApi } from '@/shared/api/showtimes.api'
import { toast } from 'react-hot-toast'
import type { Showtime } from '@/shared/types/showtime.types'

interface ShowtimeFormData {
  movieId: number | ''
  roomId: number | ''
  startTime: string
  price: number
}

/**
 * Hook để xử lý các mutations cho showtimes (create, update, delete)
 */
export function useShowtimeMutations() {
  const queryClient = useQueryClient()

  const saveMutation = useMutation({
    mutationFn: ({
      showtimeData,
      editingShowtime,
    }: {
      showtimeData: ShowtimeFormData
      editingShowtime: Showtime | null
    }) => {
      const payload = {
        movieId: showtimeData.movieId as number,
        roomId: showtimeData.roomId as number,
        startTime: showtimeData.startTime,
        price: showtimeData.price,
      }

      if (editingShowtime) {
        return showtimesApi.update(editingShowtime.id, payload)
      }
      return showtimesApi.create(payload)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'showtimes'] })
      toast.success(variables.editingShowtime ? 'Showtime updated successfully!' : 'Showtime created successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Action failed')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => showtimesApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'showtimes'] })
      toast.success('Showtime deleted successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete showtime')
    },
  })

  return {
    saveMutation,
    deleteMutation,
  }
}


