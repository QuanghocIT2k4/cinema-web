import { Users } from 'lucide-react'
import { useMovieActors } from '../hooks/useMovieActors'

interface CastSectionProps {
  movieId: number | string | null
}

// Helper function để resolve avatar URL (thêm base URL nếu là relative path)
function resolveAvatarUrl(avatarUrl: string | null | undefined): string {
  if (!avatarUrl) {
    return ''
  }
  
  // Nếu đã là full URL (http/https), trả về nguyên
  if (avatarUrl.startsWith('http://') || avatarUrl.startsWith('https://')) {
    return avatarUrl
  }
  
  // Nếu là relative path (bắt đầu bằng /), thêm base URL
  if (avatarUrl.startsWith('/')) {
    // Development: dùng proxy hoặc localhost
    if (import.meta.env.DEV) {
      return `http://localhost:8080${avatarUrl}`
    }
    
    // Production: dùng VITE_API_BASE_URL hoặc window.location.origin
    const baseUrl = import.meta.env.VITE_API_BASE_URL || window.location.origin
    return `${baseUrl}${avatarUrl}`
  }
  
  return avatarUrl
}

export default function CastSection({ movieId }: CastSectionProps) {
  const { data: actors = [], isLoading, isError } = useMovieActors(movieId)

  return (
    <div className="bg-[#1a2232] rounded-2xl p-6 shadow-xl border border-white/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-[#fe7e32] rounded-lg flex items-center justify-center shadow-lg shadow-[#fe7e32]/20">
          <Users className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white">Cast &amp; Crew</h3>
      </div>

      {isLoading && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="text-center">
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center mx-auto mb-2 animate-pulse">
                <span className="text-gray-400 text-xs">Loading...</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">Failed to load cast information.</p>
        </div>
      )}

      {!isLoading && !isError && actors.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm">No cast information available.</p>
        </div>
      )}

      {!isLoading && !isError && actors.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {actors.map((actor) => (
            <div key={actor.id} className="text-center group">
              <div className="relative mb-2">
                <img
                  src={resolveAvatarUrl(actor.avatarUrl) || `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&background=648ddb&color=fff&size=96`}
                  alt={actor.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto shadow-lg transition-all border-2 border-transparent group-hover:border-[#fe7e32] group-hover:scale-105"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(actor.name)}&background=648ddb&color=fff&size=96`
                  }}
                />
              </div>
              <p className="text-xs font-medium text-[#cccccc] group-hover:text-white transition-colors line-clamp-2">
                {actor.name}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

