import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import MovieCard from './MovieCard'
import type { Movie } from '@/shared/types/movie.types'

type Props = {
  movies: Movie[]
  title: string
  viewAllUrl?: string
}

const MovieSlider: React.FC<Props> = ({ movies, title, viewAllUrl }) => {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -400, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 400, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleScroll = () => checkScrollButtons()
    const slider = sliderRef.current
    slider?.addEventListener('scroll', handleScroll)

    checkScrollButtons()

    return () => {
      slider?.removeEventListener('scroll', handleScroll)
    }
  }, [movies])

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-8 bg-gradient-to-b from-[#a855f7] to-[#648DDB] rounded-full"></div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white">{title}</h2>
        </div>
      </div>

      <div className="relative">
        {/* Navigation Buttons */}
        {movies.length > 0 && (
          <div className="absolute -top-12 right-0 flex items-center gap-3 z-10">
            {viewAllUrl && (
              <Link
                to={viewAllUrl}
                className="text-sm font-semibold text-[#648DDB] hover:text-[#648DDB]/80 transition-colors"
              >
                View all →
              </Link>
            )}
            <button
              onClick={scrollLeft}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                canScrollLeft
                  ? 'bg-[#242b3d] border-[#fe7e32] hover:bg-[#fe7e32] text-[#fe7e32] hover:text-white shadow-lg hover:shadow-[#fe7e32]/30'
                  : 'bg-[#1a2232] border-gray-700 text-gray-600 cursor-not-allowed opacity-50'
              }`}
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={scrollRight}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                canScrollRight
                  ? 'bg-[#242b3d] border-[#648ddb] hover:bg-[#648ddb] text-[#648ddb] hover:text-white shadow-lg hover:shadow-[#648ddb]/30'
                  : 'bg-[#1a2232] border-gray-700 text-gray-600 cursor-not-allowed opacity-50'
              }`}
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Movies Slider */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
        {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Gradient Fade Effects */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-4 w-16 bg-gradient-to-r from-[#1A1F2E] to-transparent pointer-events-none z-10" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-[#1A1F2E] to-transparent pointer-events-none z-10" />
        )}
      </div>
    </section>
  )
}

export default MovieSlider





