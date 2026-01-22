import { Button } from '@/shared/components/ui'
import ProfileAvatar from './ProfileAvatar'
import type { UserResponse } from '@/shared/types/auth.types'

interface ProfileInfoCardProps {
  profile: UserResponse | undefined
  onEdit: () => void
}

export default function ProfileInfoCard({ profile, onEdit }: ProfileInfoCardProps) {
  const initial = (profile?.fullName || profile?.email || 'U').charAt(0).toUpperCase()

  return (
    <div className="bg-[#111827] border border-white/10 rounded-2xl px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <ProfileAvatar initial={initial} />
        <div>
          <p className="text-sm text-gray-400">Email Address</p>
          <p className="text-base font-medium">{profile?.email || '—'}</p>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Full Name</label>
            <div className="w-full px-3 py-2 bg-[#1f2937] border border-white/10 rounded-lg text-gray-200">
              {profile?.fullName || 'Not provided'}
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Phone</label>
            <div className="w-full px-3 py-2 bg-[#1f2937] border border-white/10 rounded-lg text-gray-200">
              {profile?.phone || 'Not provided'}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Address</label>
          <div className="w-full px-3 py-2 bg-[#1f2937] border border-white/10 rounded-lg text-gray-200">
            {profile?.address || 'Not provided'}
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <Button type="button" onClick={onEdit}>
            Edit details
          </Button>
        </div>
      </div>
    </div>
  )
}