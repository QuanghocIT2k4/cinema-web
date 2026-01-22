import { useState, useEffect } from 'react'
import { Button } from '@/shared/components/ui'
import ProfileAvatar from './ProfileAvatar'
import type { UserResponse } from '@/shared/types/auth.types'
import type { UpdateProfileRequest } from '@/shared/types/profile.types'

interface ProfileEditFormProps {
  profile: UserResponse | undefined
  onSubmit: (data: UpdateProfileRequest) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export default function ProfileEditForm({ profile, onSubmit, onCancel, isLoading = false }: ProfileEditFormProps) {
  const [form, setForm] = useState<UpdateProfileRequest>({
    fullName: '',
    phone: '',
    address: '',
  })

  useEffect(() => {
    if (profile) {
      setForm({
        fullName: profile.fullName || '',
        phone: profile.phone || '',
        address: profile.address || '',
      })
    }
  }, [profile])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit(form)
  }

  const initial = (profile?.fullName || profile?.email || 'U').charAt(0).toUpperCase()

  return (
    <form onSubmit={handleSubmit} className="bg-[#111827] border border-white/10 rounded-2xl px-6 py-6 space-y-6">
      <div className="flex items-center gap-4">
        <ProfileAvatar initial={initial} />
        <div>
          <p className="text-sm text-gray-400">Email Address</p>
          <p className="text-base font-medium text-gray-300">{profile?.email || '—'}</p>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Full Name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full px-3 py-2 bg-[#1f2937] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fe7e32]"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-300">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-3 py-2 bg-[#1f2937] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fe7e32]"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Address</label>
          <textarea
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 bg-[#1f2937] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fe7e32] resize-none"
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" onClick={onCancel} variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save changes'}
          </Button>
        </div>
      </div>
    </form>
  )
}

