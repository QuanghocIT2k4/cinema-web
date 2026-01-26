import { MessageSquare, Star } from 'lucide-react'
import { useMovieReviews } from '../hooks/useMovieReviews'

interface ReviewsSectionProps {
  movieId: number | string | null
}

function renderStars(rating: number) {
  const stars = []
  for (let i = 1; i <= 5; i += 1) {
    stars.push(
      <Star
        key={i}
        className={`w-3.5 h-3.5 ${i <= rating ? 'text-yellow-400' : 'text-gray-600'}`}
        fill={i <= rating ? 'currentColor' : 'none'}
      />,
    )
  }
  return stars
}

export default function ReviewsSection({ movieId }: ReviewsSectionProps) {
  const { data: reviews = [], isLoading, isError } = useMovieReviews(movieId)

  return (
    <div className="bg-[#1a2232] rounded-2xl p-6 shadow-xl border border-white/5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-[#fe7e32] rounded-lg flex items-center justify-center shadow-lg shadow-[#fe7e32]/20">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Reviews</h3>
          <p className="text-sm text-gray-300">Share your thoughts about this movie</p>
        </div>
      </div>

      {isLoading && (
        <div className="text-center py-8 bg-[#0f172a] rounded-xl border border-white/10">
          <p className="text-sm text-[#9aa4b8]">Loading reviews...</p>
        </div>
      )}

      {isError && (
        <div className="text-center py-8 bg-[#0f172a] rounded-xl border border-white/10">
          <p className="text-sm text-[#9aa4b8]">Failed to load reviews.</p>
        </div>
      )}

      {!isLoading && !isError && reviews.length === 0 && (
        <div className="text-center py-8 bg-[#0f172a] rounded-xl border border-white/10">
          <p className="text-sm text-[#9aa4b8]">No reviews yet.</p>
        </div>
      )}

      {!isLoading && !isError && reviews.length > 0 && (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-[#0f172a] rounded-xl border border-white/10 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{review.authorName}</p>
                  <div className="flex items-center gap-1 mt-1">{renderStars(review.rating)}</div>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(review.createdAt).toLocaleDateString('vi-VN')}
                </span>
              </div>
              <p className="text-sm text-[#9aa4b8] mt-3">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


