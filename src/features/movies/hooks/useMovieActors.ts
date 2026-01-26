import { useQuery } from '@tanstack/react-query'
import { moviesApi } from '@/shared/api/movies.api'

export function useMovieActors(movieId: number | string | null) {
  return useQuery({
    queryKey: ['movie-actors', movieId],
    queryFn: () => moviesApi.getMovieActors(movieId as number | string),
    enabled: !!movieId,
    staleTime: 5 * 60 * 1000, // 5 phút
  })
}

