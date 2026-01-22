import { useState, useEffect, useMemo } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { showtimesApi, type ShowtimePage } from '@/shared/api/showtimes.api'
import { moviesApi } from '@/shared/api/movies.api'
import { cinemasApi } from '@/shared/api/cinemas.api'
import { roomsApi } from '@/shared/api/rooms.api'
import type { Showtime } from '@/shared/types/showtime.types'
import { MovieStatus } from '@/shared/types/movie.types'
import { toast } from 'react-hot-toast'
import ConfirmModal from '@/shared/components/ConfirmModal'
import { ShowtimesTable, ShowtimesPagination, ShowtimeFormModal } from './index'

const PAGE_SIZE = 10

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
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery<ShowtimePage>({
    queryKey: ['admin', 'showtimes', page],
    queryFn: () => showtimesApi.list({ page, size: PAGE_SIZE }),
  })

  const { data: moviesData } = useQuery({
    queryKey: ['movies', 'all'],
    queryFn: () => moviesApi.getMovies({ page: 0, size: 100 }),
  })

  // Lọc phim chỉ hiển thị trạng thái NOW_SHOWING và COMING_SOON (loại ENDED)
  // Khi chỉnh sửa, vẫn thêm phim đang được chọn kể cả khi phim đã ENDED
  const availableMovies = useMemo(() => {
    if (!moviesData?.content) return []
    const filtered = moviesData.content.filter(
      (movie) => movie.status === MovieStatus.NOW_SHOWING || movie.status === MovieStatus.COMING_SOON
    )
    // Nếu đang chỉnh sửa và phim hiện tại có trạng thái ENDED thì vẫn thêm vào danh sách
    if (editingShowtime && form.movieId) {
      const selectedMovie = moviesData.content.find((m) => m.id === form.movieId)
      if (selectedMovie && selectedMovie.status === MovieStatus.ENDED) {
        // Kiểm tra nếu phim chưa tồn tại trong danh sách đã lọc thì mới thêm vào
        if (!filtered.find((m) => m.id === selectedMovie.id)) {
          return [...filtered, selectedMovie]
        }
      }
    }
    return filtered
  }, [moviesData, editingShowtime, form.movieId])

  const { data: cinemasData } = useQuery({
    queryKey: ['cinemas'],
    queryFn: () => cinemasApi.list(),
  })

  const { data: roomsData } = useQuery({
    queryKey: ['rooms', form.cinemaId],
    queryFn: () => (form.cinemaId ? roomsApi.byCinema(form.cinemaId) : Promise.resolve([])),
    enabled: !!form.cinemaId,
  })

  const saveMutation = useMutation({
    mutationFn: (showtimeData: { movieId: number; roomId: number; startTime: string; price: number }) => {
      if (editingShowtime) {
        return showtimesApi.update(editingShowtime.id, showtimeData)
      }
      return showtimesApi.create(showtimeData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'showtimes'] })
      toast.success(editingShowtime ? 'Showtime updated successfully!' : 'Showtime created successfully!')
      handleCloseModal()
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Action failed')
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => showtimesApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'showtimes'] })
      toast.success('Showtime deleted successfully!')
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to delete showtime')
    },
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

    // Kiểm tra để đảm bảo phim được chọn không có trạng thái ENDED
    const selectedMovie = moviesData?.content?.find((m) => m.id === form.movieId)
    if (selectedMovie && selectedMovie.status === MovieStatus.ENDED) {
      toast.error('Cannot create showtime for a movie that has ended')
      return
    }

    saveMutation.mutate({
      movieId: form.movieId as number,
      roomId: form.roomId as number,
      startTime: form.startTime,
      price: form.price,
    })
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
        movies={availableMovies}
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
