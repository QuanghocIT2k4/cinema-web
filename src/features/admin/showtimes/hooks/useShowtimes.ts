import { useQuery } from '@tanstack/react-query'
import { showtimesApi, type ShowtimePage } from '@/shared/api/showtimes.api'
import { moviesApi } from '@/shared/api/movies.api'
import { cinemasApi } from '@/shared/api/cinemas.api'
import { roomsApi } from '@/shared/api/rooms.api'
import { MovieStatus } from '@/shared/types/movie.types'

const PAGE_SIZE = 10

/**
 * Hook để lấy danh sách showtimes với pagination
 */
export function useShowtimes(page: number) {
  return useQuery<ShowtimePage>({
    queryKey: ['admin', 'showtimes', page],
    queryFn: () => showtimesApi.list({ page, size: PAGE_SIZE }),
  })
}

/**
 * Hook để lấy danh sách movies (chỉ NOW_SHOWING và COMING_SOON)
 * Khi chỉnh sửa, vẫn thêm phim đang được chọn kể cả khi phim đã ENDED
 */
export function useAvailableMovies(editingShowtime: any, selectedMovieId?: number | '') {
  return useQuery({
    queryKey: ['movies', 'all'],
    queryFn: () => moviesApi.getMovies({ page: 0, size: 100 }),
    select: (data) => {
      if (!data?.content) return []
      const filtered = data.content.filter(
        (movie) => movie.status === MovieStatus.NOW_SHOWING || movie.status === MovieStatus.COMING_SOON
      )
      // Nếu đang chỉnh sửa và phim hiện tại có trạng thái ENDED thì vẫn thêm vào danh sách
      if (editingShowtime && selectedMovieId) {
        const selectedMovie = data.content.find((m) => m.id === selectedMovieId)
        if (selectedMovie && selectedMovie.status === MovieStatus.ENDED) {
          // Kiểm tra nếu phim chưa tồn tại trong danh sách đã lọc thì mới thêm vào
          if (!filtered.find((m) => m.id === selectedMovie.id)) {
            return [...filtered, selectedMovie]
          }
        }
      }
      return filtered
    },
  })
}

/**
 * Hook để lấy danh sách cinemas
 */
export function useCinemasForShowtimes() {
  return useQuery({
    queryKey: ['cinemas'],
    queryFn: () => cinemasApi.list(),
  })
}

/**
 * Hook để lấy danh sách rooms theo cinema
 */
export function useRoomsByCinema(cinemaId: number | '' | null) {
  return useQuery({
    queryKey: ['rooms', cinemaId],
    queryFn: () => (cinemaId ? roomsApi.byCinema(cinemaId) : Promise.resolve([])),
    enabled: !!cinemaId,
  })
}

