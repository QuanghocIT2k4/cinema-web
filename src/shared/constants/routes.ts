// Các hằng số định nghĩa đường dẫn (route) trong ứng dụng

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  MOVIES: '/movies',
  MOVIE_DETAIL: (id: number | string) => `/movies/${id}`,
  BOOKING: (showtimeId: number | string) => `/booking/${showtimeId}`,
  BOOKING_HISTORY: '/bookings',
  PROFILE: '/profile',
  ABOUT: '/about',
  ADMIN: {
    DASHBOARD: '/admin',
    MOVIES: '/admin/movies',
    CINEMAS: '/admin/cinemas',
    SHOWTIMES: '/admin/showtimes',
    USERS: '/admin/users',
  },
} as const

