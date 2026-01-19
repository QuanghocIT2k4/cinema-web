import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { Layout } from './components/layout'
import HomePage from './features/home/pages/HomePage'
import NotFound from './shared/pages/NotFound'
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'
import MoviesPage from './features/movies/pages/MoviesPage'
import MovieDetailPage from './features/movies/pages/MovieDetailPage'
import AboutPage from './features/about/pages/AboutPage'
import { ROUTES } from './shared/constants/routes'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './features/admin/layout/AdminLayout'
import MovieManagementPage from './features/admin/movies/pages/MovieManagementPage'

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
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="movies" element={<MovieManagementPage />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

