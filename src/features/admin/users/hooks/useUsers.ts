import { useQuery } from '@tanstack/react-query'
import { usersApi } from '@/shared/api/users.api'
import type { UserResponse } from '@/shared/types/auth.types'
import type { SpringPage } from '@/shared/types/user.types'

const PAGE_SIZE = 10

/**
 * Hook để lấy danh sách users với pagination
 */
export function useUsers(page: number) {
  return useQuery<SpringPage<UserResponse>>({
    queryKey: ['admin', 'users', page],
    queryFn: () => usersApi.list({ page, size: PAGE_SIZE }),
  })
}


