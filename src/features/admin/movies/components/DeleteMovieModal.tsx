import { X, AlertTriangle } from 'lucide-react'

interface DeleteMovieModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    movieTitle: string
    isLoading: boolean
}

const DeleteMovieModal = ({ isOpen, onClose, onConfirm, movieTitle, isLoading }: DeleteMovieModalProps) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-800 rounded-lg w-full max-w-md">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-900 rounded-full">
                            <AlertTriangle className="text-red-400" size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-white">Delete Movie</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <p className="text-gray-300 mb-2">
                        Are you sure you want to delete this movie?
                    </p>
                    <p className="text-white font-semibold mb-4">
                        "{movieTitle}"
                    </p>
                    <p className="text-sm text-gray-400">
                        This action cannot be undone. All associated data will be permanently deleted.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 p-6 border-t border-gray-700">
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Deleting...' : 'Delete'}
                    </button>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeleteMovieModal
