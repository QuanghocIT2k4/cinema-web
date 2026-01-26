import { useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useMovieDetail } from '../hooks/useMovieDetail'
import { useMovies } from '../hooks/useMovies'
import { useShowtimesByMovie } from '../hooks/useShowtimesByMovie'
import { ROUTES } from '@/shared/constants/routes'
import { MovieHero, ShowtimesSection, CastSection, SimilarMovies } from './index'
import Breadcrumb from './Breadcrumb'
import TrailerModal from './TrailerModal'
import ReviewsSection from './ReviewsSection'

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: movie, isLoading, isError } = useMovieDetail(id || null)
  const showtimesQuery = useShowtimesByMovie(id || null)
  const [showTrailer, setShowTrailer] = useState(false)

  const { data: similarData } = useMovies({ page: 0, size: 6 })
  const similarMovies = useMemo(
    () => (similarData?.content || []).filter((m) => `${m.id}` !== id),
    [similarData, id],
  )

  const showtimes = showtimesQuery.data || []
  const upcomingShowtimes = useMemo(() => {
    const now = Date.now()
    return showtimes
      .filter((s) => new Date(s.startTime).getTime() >= now)
      .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
      .slice(0, 10)
  }, [showtimes])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1a2232] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#fe7e32] border-t-transparent rounded-full animate-spin" />
          <p>Loading movie details...</p>
        </div>
      </div>
    )
  }

  if (isError || !movie) {
    return (
      <div className="min-h-screen bg-[#1a2232] flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Oops! Movie not found.</h2>
          <Link to={ROUTES.MOVIES} className="px-6 py-2 bg-[#fe7e32] rounded-lg">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a2232] text-white">
      <div className="container-custom py-8">
        <Breadcrumb
          items={[
            { label: 'Movies', path: ROUTES.MOVIES },
            { label: movie.title, isActive: true },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/* Left Column - Main Content */}
          <div className="w-full lg:w-[calc(100%-22rem)] space-y-8">
            <MovieHero movie={movie} onWatchTrailer={() => setShowTrailer(true)} />
            <CastSection movieId={id || null} />
            <ShowtimesSection
              showtimes={upcomingShowtimes}
              isLoading={showtimesQuery.isLoading}
              isError={showtimesQuery.isError}
            />
            <ReviewsSection movieId={id || null} />
          </div>

          {/* Right Column - Sidebar */}
          <div className="hidden lg:block lg:w-80 flex-shrink-0">
            {similarMovies.length > 0 && (
              <div className="sticky top-6">
                <SimilarMovies movies={similarMovies} limit={5} />
              </div>
            )}
          </div>
        </div>
      </div>

      {showTrailer && movie.trailer && (
        <TrailerModal trailerUrl={movie.trailer} onClose={() => setShowTrailer(false)} />
      )}
    </div>
  )
}

