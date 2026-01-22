import { MessageSquare } from 'lucide-react'

export default function ReviewsSection() {
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

      <div className="text-center py-8 bg-[#0f172a] rounded-xl border border-white/10">
        <p className="text-sm text-[#9aa4b8]">
          No reviews yet. Be the first to share your thoughts!
        </p>
        <p className="text-xs text-gray-500 mt-2">
          (This section will be enabled after connecting the reviews API)
        </p>
      </div>
    </div>
  )
}


