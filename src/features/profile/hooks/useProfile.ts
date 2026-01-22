import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { profileApi } from '@/shared/api/profile.api'
import type { ChangePasswordRequest, UpdateProfileRequest } from '@/shared/types/profile.types'
import type { UserResponse } from '@/shared/types/auth.types'
import { useAuth } from '@/context/AuthContext'

export function useProfile() {
  const queryClient = useQueryClient()
  const { setUserProfile } = useAuth()

  const profileQuery = useQuery<UserResponse>({
    queryKey: ['profile', 'me'],
    queryFn: profileApi.getMe,
  })

  const updateProfileMutation = useMutation({
    mutationFn: (payload: UpdateProfileRequest) => profileApi.updateProfile(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(['profile', 'me'], data)
      setUserProfile(data)
    },
  })

  const changePasswordMutation = useMutation({
    mutationFn: (payload: ChangePasswordRequest) => profileApi.changePassword(payload),
  })

  return {
    profile: profileQuery.data,
    profileQuery,
    isLoadingProfile: profileQuery.isLoading,
    isUpdatingProfile: updateProfileMutation.isPending,
    updateProfile: updateProfileMutation.mutateAsync,
    isChangingPassword: changePasswordMutation.isPending,
    changePassword: changePasswordMutation.mutateAsync,
  }
}




