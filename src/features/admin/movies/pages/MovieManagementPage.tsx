import { useState } from 'react'
import { Plus, Search, Edit, Trash2 } from 'lucide-react'
import { useMovies } from '../hooks/useMovies'
import { useCreateMovie } from '../hooks/useCreateMovie'
import { useUpdateMovie } from '../hooks/useUpdateMovie'
import { useDeleteMovie } from '../hooks/useDeleteMovie'
import type { Movie } from '../../../../shared/types/movie.types'
import { MovieStatus } from '../../../../shared/types/movie.types'
import MovieFormModal from '../components/MovieFormModal'
import DeleteMovieModal from '../components/DeleteMovieModal'

const MovieManagementPage = () => {
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState<MovieStatus | ''>('')
    const [isFormModalOpen, setIsFormModalOpen] = useState(false)
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

    const { data: moviesData, isLoading, error } = useMovies({
        page,
        size: 10,
        search: search || undefined,
        status: statusFilter || undefined
    })

    const createMutation = useCreateMovie()
    const updateMutation = useUpdateMovie()
    const deleteMutation = useDeleteMovie()

    const handleAddMovie = () => {
        setSelectedMovie(null)
        setIsFormModalOpen(true)
    }

    const handleEditMovie = (movie: Movie) => {
        setSelectedMovie(movie)
        setIsFormModalOpen(true)
    }

    const handleDeleteMovie = (movie: Movie) => {
        setSelectedMovie(movie)
        setIsDeleteModalOpen(true)
    }

    const handleFormSubmit = async (data: any) => {
        try {
            if (selectedMovie) {
                await updateMutation.mutateAsync({ id: selectedMovie.id, data })
            } else {
                await createMutation.mutateAsync(data)
            }
            setIsFormModalOpen(false)
        } catch (error) {
            console.error('Form submission error:', error)
        }
    }

    const handleConfirmDelete = async () => {
        if (selectedMovie) {
            try {
                await deleteMutation.mutateAsync(selectedMovie.id)
                setIsDeleteModalOpen(false)
            } catch (error) {
                console.error('Delete error:', error)
            }
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">Movie Management</h1>
                <button
                    onClick={handleAddMovie}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                    <Plus size={20} />
                    Add Movie
                </button>
            </div>

            {/* Search and Filters */}
            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search movies..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as MovieStatus | '')}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                >
                    <option value="">All Status</option>
                    <option value={MovieStatus.NOW_SHOWING}>Now Showing</option>
                    <option value={MovieStatus.COMING_SOON}>Coming Soon</option>
                    <option value={MovieStatus.ENDED}>Ended</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                <table className="w-full">
                    <thead className="bg-gray-700">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Poster
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Genre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Duration
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Release Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {isLoading ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-center text-gray-400">
                                    Loading...
                                </td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-center text-red-400">
                                    Error loading movies
                                </td>
                            </tr>
                        ) : moviesData?.content.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-4 text-center text-gray-400">
                                    No movies found
                                </td>
                            </tr>
                        ) : (
                            moviesData?.content.map((movie) => (
                                <tr key={movie.id} className="hover:bg-gray-700 transition-colors">
                                    <td className="px-6 py-4">
                                        <img
                                            src={movie.poster}
                                            alt={movie.title}
                                            className="w-16 h-24 object-cover rounded"
                                            onError={(e) => {
                                                e.currentTarget.src = 'https://via.placeholder.com/64x96?text=No+Image'
                                            }}
                                        />
                                    </td>
                                    <td className="px-6 py-4 text-white font-medium">{movie.title}</td>
                                    <td className="px-6 py-4 text-gray-300">{movie.genre}</td>
                                    <td className="px-6 py-4 text-gray-300">{movie.duration} min</td>
                                    <td className="px-6 py-4 text-gray-300">
                                        {new Date(movie.releaseDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${movie.status === MovieStatus.NOW_SHOWING
                                                ? 'bg-green-900 text-green-300'
                                                : movie.status === MovieStatus.COMING_SOON
                                                    ? 'bg-blue-900 text-blue-300'
                                                    : 'bg-gray-600 text-gray-300'
                                                }`}
                                        >
                                            {movie.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditMovie(movie)}
                                                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteMovie(movie)}
                                                className="p-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {moviesData && moviesData.totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-gray-400">
                        Showing {moviesData.content.length} of {moviesData.totalElements} movies
                    </p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setPage(page - 1)}
                            disabled={page === 0}
                            className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                        >
                            Previous
                        </button>
                        <span className="px-4 py-2 bg-gray-700 text-white rounded-lg">
                            Page {page + 1} of {moviesData.totalPages}
                        </span>
                        <button
                            onClick={() => setPage(page + 1)}
                            disabled={page >= moviesData.totalPages - 1}
                            className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            {/* Modals */}
            <MovieFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSubmit={handleFormSubmit}
                movie={selectedMovie}
                isLoading={createMutation.isPending || updateMutation.isPending}
            />

            <DeleteMovieModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                movieTitle={selectedMovie?.title || ''}
                isLoading={deleteMutation.isPending}
            />
        </div>
    )
}

export default MovieManagementPage
