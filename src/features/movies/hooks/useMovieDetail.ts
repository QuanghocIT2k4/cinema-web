import { useQuery } from '@tanstack/react-query'
import { moviesApi } from '@/shared/api/movies.api'

/**
 * Hook để fetch chi tiết phim theo ID
 */
export const useMovieDetail = (id: number | string | null) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: () => moviesApi.getMovieDetail(id!),
    enabled: !!id, // Chỉ fetch khi có ID
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

