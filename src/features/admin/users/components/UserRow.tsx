import type { UserResponse } from '../../../../shared/types/auth.types'

interface UserRowProps {
  user: UserResponse
  onEdit: (user: UserResponse) => void
  onDelete: (user: UserResponse) => void
}

export default function UserRow({ user, onEdit, onDelete }: UserRowProps) {
  return (
    <tr className="hover:bg-gray-700 transition-colors">
      <td className="px-4 py-3 text-gray-200">{user.id}</td>
      <td className="px-4 py-3 text-white font-medium">{user.email}</td>
      <td className="px-4 py-3 text-gray-300">{user.username}</td>
      <td className="px-4 py-3 text-gray-300">{user.role}</td>
      <td className="px-4 py-3 text-gray-300">{user.status}</td>
      <td className="px-4 py-3 text-right">
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(user)}
            className="px-3 py-1.5 rounded-md bg-gray-700 text-white hover:bg-gray-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(user)}
            className="px-3 py-1.5 rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  )
}