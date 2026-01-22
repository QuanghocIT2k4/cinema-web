import { useEffect, useRef, useState } from 'react'
import HeroBanner from './HeroBanner'
import QuickBooking from './QuickBooking'
import MovieSlider from './MovieSlider'
import PromotionsSection from './PromotionsSection'
import MobileAppBanner from './MobileAppBanner'
import ContactSection from './ContactSection'
import { useNowShowingMovies, useComingSoonMovies } from '@/features/movies/hooks/useMovies'
import type { Movie } from '@/shared/types/movie.types'
import { ROUTES } from '@/shared/constants/routes'

const promotions = [
  {
    id: 'promo-1',
    image: 'https://api-website.cinestar.com.vn/media/MageINIC/bannerslider/MONDAY_1.jpg',
  },
  {
    id: 'promo-2',
    image: 'https://api-website.cinestar.com.vn/media/MageINIC/bannerslider/HSSV-2.jpg',
  },
  {
    id: 'promo-3',
    image: 'https://api-website.cinestar.com.vn/media/MageINIC/bannerslider/CTEN.jpg',
  },
]

const contactItems = [
  { id: 'c1', title: 'Customer Support', desc: '1900 1000 (08:00-22:00)' },
  { id: 'c2', title: 'Email', desc: 'support@cinestech.vn' },
  { id: 'c3', title: 'Partners & Box Office', desc: 'partner@cinestech.vn' },
]

const qrImage =
  'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://cinestech.example.com/app'

const HomeSkeleton = () => {
  return (
    <div className="min-h-screen bg-[#1A1F2E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Banner skeleton */}
        <div className="w-full h-[360px] md:h-[480px] rounded-xl bg-[#262C3D] animate-pulse" />

        {/* Quick booking skeleton */}
        <div className="rounded-2xl border border-gray-700/50 bg-[#242b3d] p-6 animate-pulse">
          <div className="h-6 w-40 bg-[#1A1F2E] rounded mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-10 bg-[#1A1F2E] rounded-lg" />
            ))}
          </div>
        </div>

        {/* Movie slider skeletons */}
        {Array.from({ length: 2 }).map((_, sectionIdx) => (
          <div key={sectionIdx} className="space-y-4">
            <div className="h-8 w-56 bg-[#262C3D] rounded animate-pulse" />
            <div className="flex gap-4 overflow-hidden">
              {Array.from({ length: 6 }).map((__, cardIdx) => (
                <div
                  key={cardIdx}
                  className="w-48 h-72 rounded-xl bg-[#262C3D] animate-pulse flex-shrink-0"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const HomeSection = () => {
  const [isQuickBookingSticky, setIsQuickBookingSticky] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const quickBookingRef = useRef<HTMLDivElement>(null)

  // Fetch movies từ API
  const {
    data: nowShowingData,
    isLoading: nowShowingLoading,
    isError: nowShowingIsError,
    error: nowShowingError,
    refetch: refetchNowShowing,
  } = useNowShowingMovies({ page: 0, size: 10 })
  const {
    data: comingSoonData,
    isLoading: comingSoonLoading,
    isError: comingSoonIsError,
    error: comingSoonError,
    refetch: refetchComingSoon,
  } = useComingSoonMovies({ page: 0, size: 10 })

  const nowShowingMovies: Movie[] = nowShowingData?.content || []
  const comingSoonMovies: Movie[] = comingSoonData?.content || []

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current && quickBookingRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom
        const shouldStick = heroBottom < 80
        setIsQuickBookingSticky(shouldStick)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Loading state
  if (nowShowingLoading && comingSoonLoading) {
    return <HomeSkeleton />
  }

  // Error state (nếu cả 2 fail hoặc 1 fail và không có data để render)
  const hasAnyMovies = nowShowingMovies.length > 0 || comingSoonMovies.length > 0
  const isError = nowShowingIsError || comingSoonIsError
  if (isError && !hasAnyMovies) {
    const msg =
      (nowShowingError as any)?.message ||
      (comingSoonError as any)?.message ||
      'Unable to load data. Please try again.'
    return (
      <div className="min-h-screen bg-[#1A1F2E] flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl border border-gray-700/50 bg-[#242b3d] p-6 text-center">
          <h3 className="text-white text-xl font-semibold mb-2">Something went wrong</h3>
          <p className="text-gray-400 text-sm mb-5">{msg}</p>
          <button
            onClick={() => {
              refetchNowShowing()
              refetchComingSoon()
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-[#a855f7] to-[#648ddb] text-white rounded-lg font-semibold hover:opacity-95 transition-opacity"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1A1F2E]">
      {/* Hero Banner */}
      <div ref={heroRef} className="relative">
        <div className="animate-in fade-in slide-in-from-top duration-700">
          <HeroBanner />
        </div>
      </div>

      {/* Quick Booking Bar */}
      <div ref={quickBookingRef} className="relative z-30">
        <div
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in slide-in-from-bottom duration-700`}
          style={{ animationDelay: '200ms' }}
        >
          <QuickBooking />
        </div>
      </div>

      {/* Movie Sections */}
      <div className="py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-20">
          {/* Now Showing */}
          {nowShowingMovies.length > 0 && (
            <div
              className="animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: '300ms' }}
            >
              <MovieSlider movies={nowShowingMovies} title="Now Showing" viewAllUrl={ROUTES.MOVIES} />
            </div>
          )}

          {/* Coming Soon */}
          {comingSoonMovies.length > 0 && (
            <div
              className="animate-in fade-in slide-in-from-bottom duration-700"
              style={{ animationDelay: '400ms' }}
            >
              <MovieSlider movies={comingSoonMovies} title="Coming Soon" viewAllUrl={ROUTES.MOVIES} />
            </div>
          )}

          {/* Empty State */}
          {nowShowingMovies.length === 0 && comingSoonMovies.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">No movies available at the moment.</p>
            </div>
          )}
        </div>
      </div>

      {/* Other Sections */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12 pb-16">
        <PromotionsSection promotions={promotions} />
        <MobileAppBanner qrImage={qrImage} />
        <ContactSection items={contactItems} />
      </div>

      {/* Back to top button */}
      {isQuickBookingSticky && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-[#a855f7] to-[#648ddb] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center group"
          aria-label="Back to top"
        >
          <svg
            className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default HomeSection





