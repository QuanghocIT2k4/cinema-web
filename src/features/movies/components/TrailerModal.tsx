import React from 'react'
import { X } from 'lucide-react'

export default function TrailerModal({
  trailerUrl,
  onClose,
}: {
  trailerUrl: string
  onClose: () => void
}) {
  const handleContentClick = (e: React.MouseEvent) => e.stopPropagation()

  return (
    <div
      className="fixed inset-0 z-[999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
        aria-label="Đóng trailer"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      <div
        className="relative w-full max-w-4xl aspect-video bg-[#1a2232] rounded-lg overflow-hidden shadow-2xl animate-scale-in"
        onClick={handleContentClick}
      >
        <iframe
          src={`${trailerUrl.replace('watch?v=', 'embed/') }?autoplay=1&rel=0&modestbranding=1`}
          title="Trailer phim"
          allowFullScreen
          allow="autoplay; encrypted-media"
          className="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    </div>
  )
}




