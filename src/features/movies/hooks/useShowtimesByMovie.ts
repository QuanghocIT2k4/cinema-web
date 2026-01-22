import { useQuery } from '@tanstack/react-query'
import { showtimesApi } from '@/shared/api/showtimes.api'

export function useShowtimesByMovie(movieId: number | string | null) {
  return useQuery({
    queryKey: ['showtimes', 'movie', movieId],
    queryFn: () => showtimesApi.getByMovie(movieId as number | string),
    enabled: !!movieId,
    staleTime: 30 * 1000,
  })
}




