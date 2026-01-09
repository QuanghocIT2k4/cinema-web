// API endpoints constants

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    ME: '/api/auth/me',
    LOGOUT: '/api/auth/logout',
  },
  MOVIES: {
    LIST: '/api/movies',
    DETAIL: (id: number | string) => `/api/movies/${id}`,
    SEARCH: '/api/movies/search',
  },
  BOOKINGS: {
    LIST: '/api/bookings',
    CREATE: '/api/bookings',
    DETAIL: (id: number | string) => `/api/bookings/${id}`,
  },
  CINEMAS: {
    LIST: '/api/cinemas',
    DETAIL: (id: number | string) => `/api/cinemas/${id}`,
  },
} as const

