import { useQuery } from '@tanstack/react-query'
import { roomsApi } from '@/shared/api/rooms.api'

/**
 * Hook để lấy danh sách ghế theo room ID
 */
export function useSeatsByRoom(roomId: number | undefined) {
  return useQuery({
    queryKey: ['seats', 'room', roomId],
    queryFn: () => roomsApi.getSeatsByRoom(roomId!),
    enabled: !!roomId,
  })
}


