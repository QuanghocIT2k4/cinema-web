import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { cinemasApi } from '@/shared/api/cinemas.api'
import { moviesApi } from '@/shared/api/movies.api'
import { showtimesApi } from '@/shared/api/showtimes.api'
import type { Cinema } from '@/shared/types/cinema.types'
import type { Movie, MovieStatus } from '@/shared/types/movie.types'
import type { Showtime } from '@/shared/types/showtime.types'

/**
 * Hook để lấy danh sách cinemas cho QuickBooking
 */
export function useQuickBookingCinemas() {
  return useQuery({
    queryKey: ['cinemas'],
    queryFn: cinemasApi.list,
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Hook để lấy danh sách movies đang chiếu cho QuickBooking
 */
export function useQuickBookingMovies() {
  return useQuery({
    queryKey: ['movies', 'now-showing', { size: 100 }],
    queryFn: () => moviesApi.getMovies({ status: 'NOW_SHOWING' as MovieStatus, size: 100 }),
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Hook để lấy danh sách showtimes theo ngày, cinema và movie
 */
export function useQuickBookingShowtimes(
  date: string,
  cinemaId: string,
  movieId: string
) {
  const enableShowtimes = !!date && !!cinemaId && !!movieId

  const {
    data: showtimesData,
    isLoading: isLoadingShowtimes,
    isError: isErrorShowtimes,
  } = useQuery({
    queryKey: ['showtimes', 'by-date', date],
    queryFn: () => showtimesApi.getByDate(date),
    enabled: enableShowtimes,
    staleTime: 60 * 1000,
  })

  const filteredShowtimes: Showtime[] = useMemo(() => {
    if (!showtimesData) return []
    return showtimesData.filter((s) => {
      const okCinema = cinemaId ? String(s.cinemaId) === cinemaId : true
      const okMovie = movieId ? String(s.movieId) === movieId : true
      return okCinema && okMovie
    })
  }, [showtimesData, cinemaId, movieId])

  return {
    showtimes: filteredShowtimes,
    isLoading: enableShowtimes && isLoadingShowtimes,
    isError: isErrorShowtimes,
  }
}


