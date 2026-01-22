interface MoviesPaginationProps {
  currentPage: number
  totalPages: number
  totalElements: number
  pageSize: number
  isFetching: boolean
  onPageChange: (page: number) => void
}

export default function MoviesPagination({
  currentPage,
  totalPages,
  totalElements,
  pageSize,
  isFetching,
  onPageChange,
}: MoviesPaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between">
      <p className="text-gray-400">
        Showing {pageSize} of {totalElements} movies
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0 || isFetching}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
        >
          Prev
        </button>
        <span className="px-4 py-2 bg-gray-700 text-white rounded-lg">
          Page {currentPage + 1} / {totalPages}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1 || isFetching}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  )
}

