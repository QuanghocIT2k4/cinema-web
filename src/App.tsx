import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { Layout } from './shared/components/layout'
import HomePage from './features/home/pages/HomePage'
import NotFound from './shared/pages/NotFound'
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'
import MoviesPage from './features/movies/pages/MoviesPage'
import MovieDetailPage from './features/movies/pages/MovieDetailPage'
import AboutPage from './features/about/pages/AboutPage'
import BookingPage from './features/booking/pages/BookingPage'
import ProfilePage from './features/profile/pages/ProfilePage'
import BookingHistoryPage from './features/profile/pages/BookingHistoryPage'
import { ROUTES } from './shared/constants/routes'
import ProtectedRoute from './shared/components/ProtectedRoute'
import AdminLayout from './features/admin/layout/AdminLayout'
import MovieManagementPage from './features/admin/movies/pages/MovieManagementPage'
import CinemaManagementPage from './features/admin/cinemas/pages/CinemaManagementPage'
import RoomManagementPage from './features/admin/rooms/pages/RoomManagementPage'
import ShowtimeManagementPage from './features/admin/showtimes/pages/ShowtimeManagementPage'
import BookingManagementPage from './features/admin/bookings/pages/BookingManagementPage'
import UserManagementPage from './features/admin/users/pages/UserManagementPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1f2937',
              color: '#fff',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        <Routes>
          {/* Public routes */}
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          {/* Public home với Layout */}
          <Route
            path={ROUTES.HOME}
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path={ROUTES.MOVIES}
            element={
              <Layout>
                <MoviesPage />
              </Layout>
            }
          />
          <Route
            path="/movies/:id"
            element={
              <Layout>
                <MovieDetailPage />
              </Layout>
            }
          />
          <Route
            path={ROUTES.BOOKING(':showtimeId')}
            element={
              <Layout>
                <BookingPage />
              </Layout>
            }
          />
          <Route
            path={ROUTES.PROFILE}
            element={
              <ProtectedRoute>
                <Layout>
                  <ProfilePage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.BOOKING_HISTORY}
            element={
              <ProtectedRoute>
                <Layout>
                  <BookingHistoryPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.ABOUT}
            element={
              <Layout>
                <AboutPage />
              </Layout>
            }
          />

          {/* Admin routes */}
          <Route
            path={ROUTES.ADMIN.DASHBOARD}
            element={
              <ProtectedRoute requireAdmin>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="showtimes" replace />} />
            <Route path="movies" element={<MovieManagementPage />} />
            <Route path="cinemas" element={<CinemaManagementPage />} />
            <Route path="rooms" element={<RoomManagementPage />} />
            <Route path="showtimes" element={<ShowtimeManagementPage />} />
            <Route path="bookings" element={<BookingManagementPage />} />
            <Route path="users" element={<UserManagementPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

