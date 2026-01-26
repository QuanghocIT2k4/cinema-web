import { useState, useEffect } from 'react'
import { UsersTable, UserFormModal, UsersPagination } from './index'
import { useUsers, useUserMutations } from '../hooks'
import type { UserResponse } from '@/shared/types/auth.types'
import type { UserRequest } from '@/shared/types/user.types'
import ConfirmModal from '@/shared/components/ConfirmModal'

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

  const { data, isLoading, error } = useUsers(page)
  const { saveMutation, deleteMutation } = useUserMutations()

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

  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; user: UserResponse | null }>({
    isOpen: false,
    user: null,
  })

  const handleDelete = (user: UserResponse) => {
    setDeleteModal({ isOpen: true, user })
  }

  const handleConfirmDelete = () => {
    if (deleteModal.user) {
      deleteMutation.mutate(deleteModal.user.id)
    }
    setDeleteModal({ isOpen: false, user: null })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingUser(null)
  }

  const handleFormChange = (field: keyof UserRequest, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    saveMutation.mutate(
      { userData: form, editingUser },
      {
        onSuccess: () => {
          handleCloseModal()
        },
      }
    )
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

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete User"
        message={`Are you sure you want to delete user "${deleteModal.user?.email}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, user: null })}
      />
    </div>
  )
}

