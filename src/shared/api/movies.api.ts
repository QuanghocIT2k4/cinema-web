import { apiClient } from './api-client'
import { API_ENDPOINTS } from '../constants/api'
import type { Movie, MoviesParams, MovieActor, Review } from '../types/movie.types'
import type { PaginationResponse } from '../types/api.types'

/**
 * API service cho Movies
 */
export const moviesApi = {
  /**
   * Lấy danh sách phim với pagination và filters
   */
  getMovies: async (params?: MoviesParams): Promise<PaginationResponse<Movie>> => {
    const response = await apiClient.get<PaginationResponse<Movie>>(API_ENDPOINTS.MOVIES.LIST, {
      params,
    })
    return response.data
  },

  /**
   * Lấy chi tiết phim theo ID
   */
  getMovieDetail: async (id: number | string): Promise<Movie> => {
    const response = await apiClient.get<Movie>(API_ENDPOINTS.MOVIES.DETAIL(id))
    return response.data
  },

  /**
   * Tìm kiếm phim
   */
  searchMovies: async (search: string, params?: Omit<MoviesParams, 'search'>): Promise<PaginationResponse<Movie>> => {
    const response = await apiClient.get<PaginationResponse<Movie>>(API_ENDPOINTS.MOVIES.SEARCH, {
      params: { ...params, search },
    })
    return response.data
  },

  /**
   * Lấy danh sách diễn viên của một phim
   */
  getMovieActors: async (movieId: number | string): Promise<MovieActor[]> => {
    const response = await apiClient.get<MovieActor[]>(API_ENDPOINTS.MOVIES.ACTORS(movieId))
    return response.data
  },

  /**
   * Lấy danh sách review của một phim
   */
  getMovieReviews: async (movieId: number | string): Promise<Review[]> => {
    const response = await apiClient.get<Review[]>(API_ENDPOINTS.MOVIES.REVIEWS(movieId))
    return response.data
  },
}

