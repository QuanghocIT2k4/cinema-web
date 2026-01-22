import { useQuery } from '@tanstack/react-query'
import { moviesApi } from '@/shared/api/movies.api'
import { MovieStatus, type MoviesParams } from '@/shared/types/movie.types'

/**
 * Hook để fetch danh sách phim với React Query
 */
export const useMovies = (params?: MoviesParams) => {
  return useQuery({
    queryKey: ['movies', params],
    queryFn: () => moviesApi.getMovies(params),
    staleTime: 5 * 60 * 1000, // 5 phút
  })
}

/**
 * Hook để fetch phim đang chiếu (NOW_SHOWING)
 */
export const useNowShowingMovies = (params?: Omit<MoviesParams, 'status'>) => {
  return useQuery({
    queryKey: ['movies', 'now-showing', params],
    queryFn: () => moviesApi.getMovies({ ...params, status: MovieStatus.NOW_SHOWING }),
    staleTime: 5 * 60 * 1000,
  })
}

/**
 * Hook để fetch phim sắp chiếu (COMING_SOON)
 */
export const useComingSoonMovies = (params?: Omit<MoviesParams, 'status'>) => {
  return useQuery({
    queryKey: ['movies', 'coming-soon', params],
    queryFn: () => moviesApi.getMovies({ ...params, status: MovieStatus.COMING_SOON }),
    staleTime: 5 * 60 * 1000,
  })
}

