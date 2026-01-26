import { Link } from 'react-router-dom'
import { ROUTES } from '@/shared/constants/routes'

export function AboutHero() {
  return (
    <div className="relative h-72 bg-gradient-to-r from-[#242b3d] to-[#1a2232]">
      <div className="relative max-w-screen-xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Link to={ROUTES.HOME} className="hover:text-white">
            Home
          </Link>
          <span className="text-gray-500">/</span>
          <span className="text-white font-semibold">About</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mt-3">About CineTECH</h1>
        <p className="text-lg text-gray-300 mt-2 max-w-3xl">
          Our story, mission, and commitment to delivering the best cinema experience.
        </p>
      </div>
    </div>
  )
}


