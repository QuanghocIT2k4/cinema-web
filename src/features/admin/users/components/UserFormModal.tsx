import type { UserResponse } from '../../../../shared/types/auth.types'
import type { UserRequest, UserRole, UserStatus } from '../../../../shared/types/user.types'

function toUsernameFromEmail(email: string) {
  return (email.split('@')[0] || 'user').replace(/[^a-zA-Z0-9]/g, '').slice(0, 20) || 'user'
}

interface UserFormModalProps {
  isOpen: boolean
  editing: UserResponse | null
  form: UserRequest
  isLoading: boolean
  onClose: () => void
  onFormChange: (field: keyof UserRequest, value: any) => void
  onSubmit: () => void
}

export default function UserFormModal({
  isOpen,
  editing,
  form,
  isLoading,
  onClose,
  onFormChange,
  onSubmit,
}: UserFormModalProps) {
  if (!isOpen) return null

  const title = editing ? `Edit user #${editing.id}` : 'Create user'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-xl rounded-xl bg-gray-800 border border-gray-700 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            ✕
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-gray-300">Email</label>
            <input
              value={form.email || ''}
              onChange={(e) => {
                const email = e.target.value
                onFormChange('email', email)
                if (!form.username) {
                  onFormChange('username', toUsernameFromEmail(email))
                }
              }}
              className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white"
              placeholder="user@gmail.com"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">Username (letters + numbers only)</label>
            <input
              value={form.username || ''}
              onChange={(e) => onFormChange('username', e.target.value)}
              className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white"
              placeholder="user123"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">
              Password {editing ? '(leave blank to keep unchanged)' : ''}
            </label>
            <input
              type="password"
              value={form.password || ''}
              onChange={(e) => onFormChange('password', e.target.value)}
              className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white"
              placeholder="******"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">Full name</label>
            <input
              value={form.fullName || ''}
              onChange={(e) => onFormChange('fullName', e.target.value)}
              className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">Phone</label>
            <input
              value={form.phone || ''}
              onChange={(e) => onFormChange('phone', e.target.value)}
              className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white"
              placeholder="10-11 digits"
            />
          </div>
          <div>
            <label className="text-sm text-gray-300">Status</label>
            <select
              value={(form.status || 'ACTIVE') as UserStatus}
              onChange={(e) => onFormChange('status', e.target.value as UserStatus)}
              className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white"
            >
              <option value="ACTIVE">ACTIVE</option>
              <option value="INACTIVE">INACTIVE</option>
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-300">Role</label>
            <select
              value={(form.role || 'CUSTOMER') as UserRole}
              onChange={(e) => onFormChange('role', e.target.value as UserRole)}
              className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white"
            >
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-gray-300">Address</label>
            <input
              value={form.address || ''}
              onChange={(e) => onFormChange('address', e.target.value)}
              className="mt-1 w-full rounded-lg bg-gray-900 border border-gray-700 px-3 py-2 text-white"
              placeholder="Address"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {editing ? 'Save' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  )
}