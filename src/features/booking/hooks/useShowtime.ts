import { useQuery } from '@tanstack/react-query'
import { showtimesApi } from '@/shared/api/showtimes.api'

/**
 * Hook để lấy thông tin showtime theo ID
 */
export function useShowtime(showtimeId: string | undefined) {
  return useQuery({
    queryKey: ['showtime', showtimeId],
    queryFn: () => showtimesApi.getById(showtimeId!),
    enabled: !!showtimeId,
  })
}

/**
 * Hook để lấy danh sách showtimes theo movie ID
 */
export function useShowtimesByMovie(movieId: string | undefined) {
  return useQuery({
    queryKey: ['showtimes', 'movie', movieId],
    queryFn: () => showtimesApi.getByMovie(movieId!),
    enabled: !!movieId,
  })
}


