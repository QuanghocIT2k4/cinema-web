import { apiClient } from './api-client'
import { API_ENDPOINTS } from '../constants/api'
import type { Movie, MoviesParams } from '../types/movie.types'
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
}

