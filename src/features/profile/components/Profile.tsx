import { useState } from 'react'
import { useProfile } from '../hooks/useProfile'
import { ProfileSidebar, ProfileContent } from './index'

export default function Profile() {
  const { profile, profileQuery, updateProfile, changePassword, isUpdatingProfile } = useProfile()
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile')
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  const handleProfileSubmit = async (data: Parameters<typeof updateProfile>[0]) => {
    await updateProfile(data)
    setIsEditingProfile(false)
  }

  return (
    <div className="min-h-screen bg-[#0b1220] text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-gray-400 text-sm mb-8">Update your personal information and change your password</p>

        <div className="flex flex-col md:flex-row gap-6">
          <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="flex-1 space-y-6">
            <ProfileContent
              activeTab={activeTab}
              profile={profile}
              isEditingProfile={isEditingProfile}
              isLoadingProfile={profileQuery.isLoading}
              isUpdatingProfile={isUpdatingProfile}
              onEdit={() => setIsEditingProfile(true)}
              onProfileSubmit={handleProfileSubmit}
              onProfileCancel={() => setIsEditingProfile(false)}
              onPasswordSubmit={changePassword}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

