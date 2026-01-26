import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/api-client'
import { cinemasApi } from '@/shared/api/cinemas.api'
import type { Room } from '@/shared/types/room.types'

const PAGE_SIZE = 10

interface UseRoomsParams {
  page: number
  selectedCinemaId: number | 'all'
}

/**
 * Hook để lấy danh sách rooms với pagination và filter
 */
export function useRooms({ page, selectedCinemaId }: UseRoomsParams) {
  return useQuery({
    queryKey: ['admin', 'rooms', page, selectedCinemaId],
    queryFn: async () => {
      const params: any = { page, size: PAGE_SIZE }
      if (selectedCinemaId !== 'all') params.cinemaId = selectedCinemaId
      const res = await apiClient.get<{ content: Room[]; totalElements: number; totalPages: number }>(
        '/api/rooms',
        { params }
      )
      return res.data
    },
  })
}

/**
 * Hook để lấy danh sách cinemas (dùng cho filter)
 */
export function useCinemasForRooms() {
  return useQuery({
    queryKey: ['cinemas'],
    queryFn: () => cinemasApi.list(),
  })
}


