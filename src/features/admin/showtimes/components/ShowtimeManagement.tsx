import { useState, useEffect } from 'react'
import type { Showtime } from '@/shared/types/showtime.types'
import { MovieStatus } from '@/shared/types/movie.types'
import { toast } from 'react-hot-toast'
import ConfirmModal from '@/shared/components/ConfirmModal'
import { ShowtimesTable, ShowtimesPagination, ShowtimeFormModal } from './index'
import {
  useShowtimes,
  useAvailableMovies,
  useCinemasForShowtimes,
  useRoomsByCinema,
  useShowtimeMutations,
} from '../hooks'
import { useQuery } from '@tanstack/react-query'
import { moviesApi } from '@/shared/api/movies.api'

export default function ShowtimeManagement() {
  const [page, setPage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingShowtime, setEditingShowtime] = useState<Showtime | null>(null)
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; showtime: Showtime | null }>({
    isOpen: false,
    showtime: null,
  })
  const [form, setForm] = useState({
    movieId: '' as number | '',
    cinemaId: '' as number | '',
    roomId: '' as number | '',
    startTime: '',
    price: 50000,
  })

  const { data, isLoading, error } = useShowtimes(page)
  const { data: availableMovies } = useAvailableMovies(editingShowtime, form.movieId)
  const { data: cinemasData } = useCinemasForShowtimes()
  const { data: roomsData } = useRoomsByCinema(form.cinemaId)
  const { saveMutation, deleteMutation } = useShowtimeMutations()

  // Lấy toàn bộ movies để kiểm tra status khi submit
  const { data: allMoviesData } = useQuery({
    queryKey: ['movies', 'all'],
    queryFn: () => moviesApi.getMovies({ page: 0, size: 100 }),
  })

  useEffect(() => {
    if (editingShowtime) {
      setForm({
        movieId: editingShowtime.movieId || '',
        cinemaId: editingShowtime.cinemaId || '',
        roomId: editingShowtime.roomId || '',
        startTime: editingShowtime.startTime ? new Date(editingShowtime.startTime).toISOString().slice(0, 16) : '',
        price: editingShowtime.price || 50000,
      })
    } else {
      setForm({
        movieId: '',
        cinemaId: '',
        roomId: '',
        startTime: '',
        price: 50000,
      })
    }
  }, [editingShowtime])

  const handleEdit = (showtime: Showtime) => {
    setEditingShowtime(showtime)
    setIsModalOpen(true)
  }

  const handleDelete = (showtime: Showtime) => {
    setDeleteModal({ isOpen: true, showtime })
  }

  const handleConfirmDelete = () => {
    if (deleteModal.showtime) {
      deleteMutation.mutate(deleteModal.showtime.id)
    }
    setDeleteModal({ isOpen: false, showtime: null })
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingShowtime(null)
  }

  const handleFormChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (!form.movieId || !form.roomId || !form.startTime) {
      toast.error('Please fill in all required fields')
      return
    }

    // Kiểm tra để đảm bảo phim được chọn không có trạng thái ENDED (chỉ khi tạo mới)
    if (!editingShowtime) {
      const selectedMovie = allMoviesData?.content?.find((m) => m.id === form.movieId)
      if (selectedMovie && selectedMovie.status === MovieStatus.ENDED) {
        toast.error('Cannot create showtime for a movie that has ended')
        return
      }
    }

    saveMutation.mutate(
      { showtimeData: form, editingShowtime },
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
        <h1 className="text-2xl font-bold text-white">Showtime Management</h1>
        <button
          onClick={() => {
            setEditingShowtime(null)
            setIsModalOpen(true)
          }}
          className="px-4 py-2 bg-[#fe7e32] text-white rounded-lg hover:bg-[#fe7e32]/90"
        >
          + Add showtime
        </button>
      </div>

      <ShowtimesTable
        showtimes={data?.content || []}
        isLoading={isLoading}
        error={error as Error | null}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {data && (
        <ShowtimesPagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={setPage}
        />
      )}

      <ShowtimeFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editing={editingShowtime}
        form={form}
        movies={availableMovies || []}
        cinemas={cinemasData || []}
        rooms={roomsData || []}
        isLoading={saveMutation.isPending}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
      />

      <ConfirmModal
        isOpen={deleteModal.isOpen}
        title="Delete Showtime"
        message="Are you sure you want to delete this showtime? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteModal({ isOpen: false, showtime: null })}
      />
    </div>
  )
}
