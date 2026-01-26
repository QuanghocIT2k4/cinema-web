import { useQuery } from '@tanstack/react-query'
import { refreshmentsApi } from '@/shared/api/refreshments.api'

/**
 * Hook để lấy danh sách refreshments hiện tại
 */
export function useRefreshments() {
  return useQuery({
    queryKey: ['refreshments', 'current'],
    queryFn: () => refreshmentsApi.getCurrentRefreshments(),
  })
}


