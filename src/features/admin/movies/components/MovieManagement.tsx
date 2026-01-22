import { useState, useMemo } from 'react'
import { useMovies } from '../hooks/useMovies'
import { useCreateMovie } from '../hooks/useCreateMovie'
import { useUpdateMovie } from '../hooks/useUpdateMovie'
import { useDeleteMovie } from '../hooks/useDeleteMovie'
import { MoviesFilters, MoviesTable, MoviesPagination, MovieFormModal } from './index'
import type { Movie, MovieFormData } from '@/shared/types/movie.types'
import { MovieStatus } from '@/shared/types/movie.types'

const PAGE_SIZE = 10

export default function MovieManagement() {
  const [page, setPage] = useState(0)
  const [statusFilter, setStatusFilter] = useState<MovieStatus | ''>('')
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)

  const { data, isLoading, error } = useMovies({
    page,
    size: PAGE_SIZE,
    status: statusFilter || undefined,
    search: search || undefined,
  })

  const createMovie = useCreateMovie()
  const updateMovie = useUpdateMovie()
  const deleteMovie = useDeleteMovie()

  const filteredMovies = useMemo(() => {
    if (!data?.content) return []
    if (!search.trim()) return data.content

    const searchLower = search.toLowerCase()
    return data.content.filter((movie: Movie) => {
      return (
        movie.title?.toLowerCase().includes(searchLower) ||
        movie.genre?.toLowerCase().includes(searchLower) ||
        movie.description?.toLowerCase().includes(searchLower)
      )
    })
  }, [data?.content, search])

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie)
    setIsModalOpen(true)
  }

  const handleDelete = (movie: Movie) => {
    if (confirm(`Are you sure you want to delete the movie "${movie.title}"?`)) {
      deleteMovie.mutate(movie.id)
    }
  }

  const handleSubmit = (formData: MovieFormData) => {
    if (editingMovie) {
      updateMovie.mutate({ id: editingMovie.id, data: formData })
    } else {
      createMovie.mutate(formData)
    }
    handleCloseModal()
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingMovie(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Movie Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-[#fe7e32] text-white rounded-lg hover:bg-[#fe7e32]/90"
        >
          + Add movie
        </button>
      </div>

      <MoviesFilters
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        search={search}
        onSearchChange={setSearch}
      />

      <MoviesTable
        movies={filteredMovies}
        isLoading={isLoading}
        error={error as Error | null}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {data && (
        <MoviesPagination
          currentPage={page}
          totalPages={data.totalPages}
          totalElements={data.totalElements}
          pageSize={PAGE_SIZE}
          isFetching={isLoading}
          onPageChange={setPage}
        />
      )}

      <MovieFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        movie={editingMovie}
        onSubmit={handleSubmit}
        isLoading={createMovie.isPending || updateMovie.isPending}
      />
    </div>
  )
}

