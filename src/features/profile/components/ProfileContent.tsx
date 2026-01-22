import type { UserResponse } from '@/shared/types/auth.types'
import type { UpdateProfileRequest, ChangePasswordRequest } from '@/shared/types/profile.types'
import ProfileInfoCard from './ProfileInfoCard'
import ProfileEditForm from './ProfileEditForm'
import PasswordChangeForm from './PasswordChangeForm'

interface ProfileContentProps {
  activeTab: 'profile' | 'password'
  profile: UserResponse | undefined
  isEditingProfile: boolean
  isLoadingProfile: boolean
  isUpdatingProfile: boolean
  onEdit: () => void
  onProfileSubmit: (data: UpdateProfileRequest) => Promise<void>
  onProfileCancel: () => void
  onPasswordSubmit: (data: ChangePasswordRequest) => Promise<void>
}

export default function ProfileContent({
  activeTab,
  profile,
  isEditingProfile,
  isLoadingProfile,
  isUpdatingProfile,
  onEdit,
  onProfileSubmit,
  onProfileCancel,
  onPasswordSubmit,
}: ProfileContentProps) {
  if (isLoadingProfile) {
    return (
      <div className="flex-1 bg-[#111827] border border-white/10 rounded-2xl p-6">
        <div className="text-gray-400">Đang tải...</div>
      </div>
    )
  }

  if (activeTab === 'password') {
    return <PasswordChangeForm onSubmit={onPasswordSubmit} onCancel={onProfileCancel} />
  }

  if (isEditingProfile) {
    return <ProfileEditForm profile={profile} onSubmit={onProfileSubmit} onCancel={onProfileCancel} isLoading={isUpdatingProfile} />
  }

  return <ProfileInfoCard profile={profile} onEdit={onEdit} />
}

