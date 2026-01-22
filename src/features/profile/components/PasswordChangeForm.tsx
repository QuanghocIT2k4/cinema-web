import { useState } from 'react'
import { Button } from '@/shared/components/ui'
import { Lock } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface PasswordChangeFormProps {
  onSubmit: (data: { oldPassword: string; newPassword: string }) => Promise<void>
  onCancel: () => void
}

export default function PasswordChangeForm({ onSubmit, onCancel }: PasswordChangeFormProps) {
  const [form, setForm] = useState<{
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (form.newPassword !== form.confirmPassword) {
      toast.error('Mật khẩu mới không khớp')
      return
    }

    if (form.newPassword.length < 6) {
      toast.error('Mật khẩu mới phải có ít nhất 6 ký tự')
      return
    }

    setIsSubmitting(true)
    try {
      await onSubmit({
        oldPassword: form.currentPassword,
        newPassword: form.newPassword,
      })
      toast.success('Đổi mật khẩu thành công!')
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      onCancel()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Đổi mật khẩu thất bại')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-[#111827] border border-white/10 rounded-2xl px-6 py-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-[#fe7e32] rounded-lg flex items-center justify-center">
          <Lock className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Đổi mật khẩu</h3>
          <p className="text-sm text-gray-400">Cập nhật mật khẩu của bạn</p>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Mật khẩu hiện tại</label>
          <input
            type="password"
            value={form.currentPassword}
            onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
            className="w-full px-3 py-2 bg-[#1f2937] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fe7e32]"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Mật khẩu mới</label>
          <input
            type="password"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            className="w-full px-3 py-2 bg-[#1f2937] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fe7e32]"
            required
            minLength={6}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-gray-300">Xác nhận mật khẩu mới</label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            className="w-full px-3 py-2 bg-[#1f2937] border border-white/10 rounded-lg text-white focus:outline-none focus:border-[#fe7e32]"
            required
            minLength={6}
          />
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" onClick={onCancel} variant="outline">
            Hủy
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Đang đổi...' : 'Đổi mật khẩu'}
          </Button>
        </div>
      </div>
    </form>
  )
}

