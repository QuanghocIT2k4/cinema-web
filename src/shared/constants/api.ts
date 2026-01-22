// API endpoints constants

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    ME: '/api/auth/me',
    PROFILE: '/api/auth/profile',
    CHANGE_PASSWORD: '/api/auth/change-password',
    LOGOUT: '/api/auth/logout',
  },
  MOVIES: {
    LIST: '/api/movies',
    DETAIL: (id: number | string) => `/api/movies/${id}`,
    SEARCH: '/api/movies/search',
  },
  SHOWTIMES: {
    LIST: '/api/showtimes',
    BY_MOVIE: (movieId: number | string) => `/api/showtimes/movie/${movieId}`,
    BY_DATE: (date: string) => `/api/showtimes/date/${date}`, // yyyy-MM-dd
  },
  BOOKINGS: {
    LIST: '/api/bookings',
    CREATE: '/api/bookings',
    DETAIL: (id: number | string) => `/api/bookings/${id}`,
    CONFIRM: (id: number | string) => `/api/bookings/${id}/confirm`,
    CANCEL: (id: number | string) => `/api/bookings/${id}/cancel`,
    BOOKED_SEATS: (showtimeId: number | string) => `/api/bookings/showtime/${showtimeId}/seats`,
  },
  CINEMAS: {
    LIST: '/api/cinemas',
    DETAIL: (id: number | string) => `/api/cinemas/${id}`,
  },
  ROOMS: {
    LIST: '/api/rooms',
    BY_CINEMA: (cinemaId: number | string) => `/api/rooms/cinema/${cinemaId}`,
    DETAIL: (id: number | string) => `/api/rooms/${id}`,
    CREATE: '/api/rooms',
    UPDATE: (id: number | string) => `/api/rooms/${id}`,
    DELETE: (id: number | string) => `/api/rooms/${id}`,
  },
  USERS: {
    LIST: '/api/users',
    DETAIL: (id: number | string) => `/api/users/${id}`,
    CREATE: '/api/users',
    UPDATE: (id: number | string) => `/api/users/${id}`,
    DELETE: (id: number | string) => `/api/users/${id}`,
  },
} as const
