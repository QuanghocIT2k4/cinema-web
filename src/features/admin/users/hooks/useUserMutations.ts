import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usersApi } from '@/shared/api/users.api'
import { toast } from 'react-hot-toast'
import type { UserResponse } from '@/shared/types/auth.types'
import type { UserRequest } from '@/shared/types/user.types'

/**
 * Hook để xử lý các mutations cho users (create, update, delete)
 */
export function useUserMutations() {
  const queryClient = useQueryClient()

  const saveMutation = useMutation({
    mutationFn: ({ userData, editingUser }: { userData: UserRequest; editingUser: UserResponse | null }) => {
      if (editingUser) {
        return usersApi.update(editingUser.id, userData)
      }
      return usersApi.create(userData)
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
      toast.success(variables.editingUser ? 'User updated successfully!' : 'User created successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Action failed')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => usersApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
      toast.success('User deleted successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete user')
    },
  })

  return {
    saveMutation,
    deleteMutation,
  }
}


