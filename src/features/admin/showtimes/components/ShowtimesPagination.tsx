interface ShowtimesPaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function ShowtimesPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ShowtimesPaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between text-gray-300">
      <button
        disabled={currentPage <= 0}
        onClick={() => onPageChange(Math.max(0, currentPage - 1))}
        className="px-3 py-1.5 rounded-md bg-gray-700 disabled:opacity-50"
      >
        Prev
      </button>
      <span>
        Page {currentPage + 1} / {Math.max(1, totalPages)}
      </span>
      <button
        disabled={totalPages === 0 || currentPage >= totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-3 py-1.5 rounded-md bg-gray-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  )
}
