import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { X } from 'lucide-react'
import { movieSchema } from '../validation/movieSchema'
import type { MovieFormValues } from '../validation/movieSchema'
import type { Movie } from '../../../../shared/types/movie.types'
import { MovieStatus } from '../../../../shared/types/movie.types'

interface MovieFormModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: MovieFormValues) => void
    movie: Movie | null
    isLoading: boolean
}

const MovieFormModal = ({ isOpen, onClose, onSubmit, movie, isLoading }: MovieFormModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<MovieFormValues>({
        resolver: yupResolver(movieSchema)
    })

    useEffect(() => {
        if (movie) {
            reset({
                title: movie.title,
                description: movie.description,
                genre: movie.genre,
                duration: movie.duration,
                releaseDate: movie.releaseDate.split('T')[0],
                endDate: movie.endDate.split('T')[0],
                status: movie.status,
                ageRating: movie.ageRating,
                poster: movie.poster,
                trailer: movie.trailer
            })
        } else {
            reset({
                title: '',
                description: '',
                genre: '',
                duration: 0,
                releaseDate: '',
                endDate: '',
                status: MovieStatus.COMING_SOON,
                ageRating: '',
                poster: '',
                trailer: ''
            })
        }
    }, [movie, reset])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <h2 className="text-2xl font-bold text-white">
                        {movie ? 'Edit Movie' : 'Add New Movie'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Title *
                        </label>
                        <input
                            {...register('title')}
                            type="text"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-400">{errors.title.message}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Description *
                        </label>
                        <textarea
                            {...register('description')}
                            rows={3}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-400">{errors.description.message}</p>
                        )}
                    </div>

                    {/* Genre and Duration */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Genre *
                            </label>
                            <input
                                {...register('genre')}
                                type="text"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                            {errors.genre && (
                                <p className="mt-1 text-sm text-red-400">{errors.genre.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Duration (minutes) *
                            </label>
                            <input
                                {...register('duration')}
                                type="number"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                            {errors.duration && (
                                <p className="mt-1 text-sm text-red-400">{errors.duration.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Release Date and End Date */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Release Date *
                            </label>
                            <input
                                {...register('releaseDate')}
                                type="date"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                            {errors.releaseDate && (
                                <p className="mt-1 text-sm text-red-400">{errors.releaseDate.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                End Date *
                            </label>
                            <input
                                {...register('endDate')}
                                type="date"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                            {errors.endDate && (
                                <p className="mt-1 text-sm text-red-400">{errors.endDate.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Status and Age Rating */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Status *
                            </label>
                            <select
                                {...register('status')}
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            >
                                <option value={MovieStatus.NOW_SHOWING}>Now Showing</option>
                                <option value={MovieStatus.COMING_SOON}>Coming Soon</option>
                                <option value={MovieStatus.ENDED}>Ended</option>
                            </select>
                            {errors.status && (
                                <p className="mt-1 text-sm text-red-400">{errors.status.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">
                                Age Rating *
                            </label>
                            <input
                                {...register('ageRating')}
                                type="text"
                                placeholder="e.g., PG-13, R, G"
                                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                            />
                            {errors.ageRating && (
                                <p className="mt-1 text-sm text-red-400">{errors.ageRating.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Poster URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Poster URL *
                        </label>
                        <input
                            {...register('poster')}
                            type="url"
                            placeholder="https://example.com/poster.jpg"
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                        {errors.poster && (
                            <p className="mt-1 text-sm text-red-400">{errors.poster.message}</p>
                        )}
                    </div>

                    {/* Trailer URL */}
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">
                            Trailer URL *
                        </label>
                        <input
                            {...register('trailer')}
                            type="url"
                            placeholder="https://youtube.com/watch?v=..."
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                        {errors.trailer && (
                            <p className="mt-1 text-sm text-red-400">{errors.trailer.message}</p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Saving...' : movie ? 'Update Movie' : 'Create Movie'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default MovieFormModal
