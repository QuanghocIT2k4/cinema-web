import { useQuery } from '@tanstack/react-query'
import { cinemasApi } from '@/shared/api/cinemas.api'

/**
 * Hook để lấy danh sách cinemas cho admin
 */
export function useCinemas() {
  return useQuery({
    queryKey: ['cinemas', 'admin'],
    queryFn: cinemasApi.list,
    staleTime: 5 * 60 * 1000, // 5 phút
  })
}


