import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ROUTES } from '@/shared/constants/routes'

export default function BookingHeader() {
  return (
    <div className="bg-[#1a2232] border-b border-white/10">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          to={ROUTES.MOVIES}
          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại danh sách phim</span>
        </Link>
      </div>
    </div>
  )
}

