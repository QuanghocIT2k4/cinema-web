import { useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/api-client'
import { toast } from 'react-hot-toast'
import type { Room } from '@/shared/types/room.types'

interface RoomFormData {
  cinemaId: number | ''
  roomNumber: string
  totalRows: number
  totalCols: number
}

/**
 * Hook để xử lý các mutations cho rooms (create, update, delete)
 */
export function useRoomMutations() {
  const queryClient = useQueryClient()

  const saveMutation = useMutation({
    mutationFn: ({ roomData, editingRoom }: { roomData: RoomFormData; editingRoom: Room | null }) => {
      if (editingRoom) {
        return apiClient.put(`/api/rooms/${editingRoom.id}`, roomData)
      }
      return apiClient.post('/api/rooms', roomData)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'rooms'] })
      toast.success(variables.editingRoom ? 'Room updated successfully!' : 'Room created successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Action failed')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiClient.delete(`/api/rooms/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'rooms'] })
      toast.success('Room deleted successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete room')
    },
  })

  return {
    saveMutation,
    deleteMutation,
  }
}


