import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { apiClient } from '@/shared/api/api-client'
import { UsersTable, UserFormModal, UsersPagination } from './index'
import type { UserResponse } from '@/shared/types/auth.types'
import type { UserRequest } from '@/shared/types/user.types'
import { toast } from 'react-hot-toast'

const PAGE_SIZE = 10

export default function UserManagement() {
  const [page, setPage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserResponse | null>(null)
  const [form, setForm] = useState<UserRequest>({
    email: '',
    username: '',
    password: '',
    fullName: '',
    phone: '',
    address: '',
    role: 'CUSTOMER',
    status: 'ACTIVE',
  })

  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['admin', 'users', page],
    queryFn: async () => {
      const res = await apiClient.get<{ content: UserResponse[]; totalElements: number; totalPages: number }>(
        '/api/users',
        { params: { page, size: PAGE_SIZE } }
      )
      return res.data
    },
  })

  const saveMutation = useMutation({
    mutationFn: (userData: UserRequest) => {
      if (editingUser) {
        return apiClient.put(`/api/users/${editingUser.id}`, userData)
      }
      return apiClient.post('/api/users', userData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
      toast.success(editingUser ? 'User updated successfully!' : 'User created successfully!')
      handleCloseModal()
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Action failed')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiClient.delete(`/api/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] })
      toast.success('User deleted successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete user')
    },
  })

  useEffect(() => {
    if (editingUser) {
      setForm({
        email: editingUser.email || '',
        username: editingUser.username || '',
        password: '',
        fullName: editingUser.fullName || '',
        phone: editingUser.phone || '',
        address: editingUser.address || '',
        role: editingUser.role || 'CUSTOMER',
        status: editingUser.status || 'ACTIVE',
      })
    } else {
      setForm({
        email: '',
        username: '',
        password: '',
        fullName: '',
        phone: '',
        address: '',
        role: 'CUSTOMER',
        status: 'ACTIVE',
      })
    }
  }, [editingUser])

  const handleEdit = (user: UserResponse) => {
    setEditingUser(user)
    setIsModalOpen(true)
  }

  const handleDelete = (user: UserResponse) => {
    if (confirm(`Are you sure you want to delete user "${user.email}"?`)) {
      deleteMutation.mutate(user.id)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingUser(null)
  }

  const handleFormChange = (field: keyof UserRequest, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    saveMutation.mutate(form)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">User Management</h1>
        <button
          onClick={() => {
            setEditingUser(null)
            setIsModalOpen(true)
          }}
          className="px-4 py-2 bg-[#fe7e32] text-white rounded-lg hover:bg-[#fe7e32]/90"
        >
          + Add user
        </button>
      </div>

      <UsersTable
        users={data?.content || []}
        isLoading={isLoading}
        error={error as Error | null}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {data && (
        <UsersPagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}

      <UserFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editing={editingUser}
        form={form}
        isLoading={saveMutation.isPending}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

