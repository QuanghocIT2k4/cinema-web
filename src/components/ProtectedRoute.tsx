import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { ROUTES } from '@/shared/constants/routes'

/**
 * ProtectedRouteProps: Props cho ProtectedRoute component
 */
interface ProtectedRouteProps {
  children: React.ReactNode      // Component cần được bảo vệ
  requireAdmin?: boolean        // Nếu true, chỉ Admin mới được truy cập
}

/**
 * ProtectedRoute Component
 * Bảo vệ routes cần đăng nhập
 * 
 * Logic:
 * 1. Nếu đang loading (kiểm tra auth) → hiển thị loading
 * 2. Nếu chưa đăng nhập → redirect về /login
 * 3. Nếu requireAdmin=true nhưng user không phải Admin → redirect về /home
 * 4. Nếu đã đăng nhập và đủ quyền → render children
 */
export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading, user } = useAuth()
  const location = useLocation()

  // Bước 1: Đang kiểm tra auth state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#262C3D] flex items-center justify-center">
        <div className="text-white text-lg">Đang tải...</div>
      </div>
    )
  }

  // Bước 2: Chưa đăng nhập → redirect về login
  if (!isAuthenticated) {
    // Lưu location hiện tại để redirect về sau khi login
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  }

  // Bước 3: Yêu cầu Admin nhưng user không phải Admin → redirect về home
  if (requireAdmin && user?.role !== 'ADMIN') {
    return <Navigate to={ROUTES.HOME} replace />
  }

  // Bước 4: Đã đăng nhập và đủ quyền → render children
  return <>{children}</>
}

