// Route paths constants

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  MOVIES: '/movies',
  MOVIE_DETAIL: (id: number | string) => `/movies/${id}`,
  BOOKING: (showtimeId: number | string) => `/booking/${showtimeId}`,
  PROFILE: '/profile',
  ADMIN: {
    DASHBOARD: '/admin',
    MOVIES: '/admin/movies',
    CINEMAS: '/admin/cinemas',
    SHOWTIMES: '/admin/showtimes',
  },
} as const

