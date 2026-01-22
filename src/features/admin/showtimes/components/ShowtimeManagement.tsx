import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { showtimesApi, type ShowtimePage } from '@/shared/api/showtimes.api'
import { moviesApi } from '@/shared/api/movies.api'
import { cinemasApi } from '@/shared/api/cinemas.api'
import { roomsApi } from '@/shared/api/rooms.api'
import type { Showtime } from '@/shared/types/showtime.types'
import { toast } from 'react-hot-toast'
import { ShowtimesTable, ShowtimesPagination, ShowtimeFormModal } from './index'

const PAGE_SIZE = 10

export default function ShowtimeManagement() {
  const [page, setPage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingShowtime, setEditingShowtime] = useState<Showtime | null>(null)
  const [form, setForm] = useState({
    movieId: '' as number | '',
    cinemaId: '' as number | '',
    roomId: '' as number | '',
    startTime: '',
    endTime: '',
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
    mutationFn: (showtimeData: { movieId: number; roomId: number; startTime: string; endTime: string; price: number }) => {
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
        endTime: editingShowtime.endTime ? new Date(editingShowtime.endTime).toISOString().slice(0, 16) : '',
        price: editingShowtime.price || 50000,
      })
    } else {
      setForm({
        movieId: '',
        cinemaId: '',
        roomId: '',
        startTime: '',
        endTime: '',
        price: 50000,
      })
    }
  }, [editingShowtime])

  const handleEdit = (showtime: Showtime) => {
    setEditingShowtime(showtime)
    setIsModalOpen(true)
  }

  const handleDelete = (showtime: Showtime) => {
    if (confirm('Are you sure you want to delete this showtime?')) {
      deleteMutation.mutate(showtime.id)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingShowtime(null)
  }

  const handleFormChange = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = () => {
    if (!form.movieId || !form.roomId || !form.startTime || !form.endTime) {
      toast.error('Please fill in all required fields')
      return
    }
    saveMutation.mutate({
      movieId: form.movieId as number,
      roomId: form.roomId as number,
      startTime: form.startTime,
      endTime: form.endTime,
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
        movies={moviesData?.content || []}
        cinemas={cinemasData || []}
        rooms={roomsData || []}
        isLoading={saveMutation.isPending}
        onFormChange={handleFormChange}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
