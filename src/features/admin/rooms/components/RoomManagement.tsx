import { useState, useEffect } from 'react'
import { RoomsTable, RoomFormModal, RoomsPagination, RoomsFilter } from './index'
import { useRooms, useCinemasForRooms, useRoomMutations } from '../hooks'
import type { Room } from '@/shared/types/room.types'
import ConfirmModal from '@/shared/components/ConfirmModal'

export default function RoomManagement() {
  const [page, setPage] = useState(0)
  const [selectedCinemaId, setSelectedCinemaId] = useState<number | 'all'>('all')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingRoom, setEditingRoom] = useState<Room | null>(null)
  const [form, setForm] = useState({
    cinemaId: '' as number | '',
    roomNumber: '',
    totalRows: 10,
    totalCols: 10,
  })

  const { data: cinemasData } = useCinemasForRooms()
  const { data, isLoading, error } = useRooms({ page, selectedCinemaId })
  const { saveMutation, deleteMutation } = useRoomMutations()

  useEffect(() => {
    if (editingRoom) {
      setForm({
        cinemaId: editingRoom.cinemaId || '',
        roomNumber: editingRoom.roomNumber || '',
        totalRows: editingRoom.totalRows || 10,
        totalCols: editingRoom.totalCols || 10,
      })
    } else {
      setForm({
        cinemaId: '',
        roomNumber: '',
        totalRows: 10,
        totalCols: 10,
      })
    }
  }, [editingRoom])

  const handleEdit = (room: Room) => {
    setEditingRoom(room)
    setIsModalOpen(true)
  }

  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; room: Room | null }>({
    isOpen: false,
    room: null,
  })

  const handleDelete = (room: Room) => {
    setDeleteModal({ isOpen: true, room })
  }

  const handleConfirmDelete = () => {
    if (deleteModal.room) {
      deleteMutation.mutate(deleteModal.room.id)
    }
    setDeleteModal({ isOpen: false, room: null })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingRoom(null)
  }

  const handleFormChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    saveMutation.mutate(
      { roomData: form, editingRoom },
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
        <h1 className="text-2xl font-bold text-white">Room Management</h1>
        <button
          onClick={() => {
            setEditingRoom(null)
            setIsModalOpen(true)
          }}
          className="px-4 py-2 bg-[#fe7e32] text-white rounded-lg hover:bg-[#fe7e32]/90"
        >
          + Add room
        </button>
      </div>

      <RoomsFilter
        selectedCinemaId={selectedCinemaId}
        cinemas={cinemasData || []}
        onCinemaChange={setSelectedCinemaId}
      />

      <RoomsTable
        rooms={data?.content || []}
        isLoading={isLoading}
        error={error as Error | null}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {data && (
        <RoomsPagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}

      <RoomFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editing={editingRoom}
        form={form}
        cinemas={cinemasData || []}
        isLoading={saveMutation.isPending}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Room"
        message={`Are you sure you want to delete room "${deleteModal.room?.roomNumber}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, room: null })}
      />
    </div>
  )
}

