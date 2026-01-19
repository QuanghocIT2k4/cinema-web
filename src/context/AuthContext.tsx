import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '@/shared/api/auth.api'
import { setToken, getToken, removeToken, isValidToken, decodeToken } from '@/shared/utils/jwt'
import type { LoginRequest, RegisterRequest, UserResponse, AuthResponse } from '@/shared/types/auth.types'

/**
 * AuthContextType: Định nghĩa interface cho AuthContext
 * Chứa tất cả state và functions liên quan đến authentication
 */
interface AuthContextType {
  user: UserResponse | null           // Thông tin user hiện tại (null nếu chưa đăng nhập)
  token: string | null                // JWT token (null nếu chưa đăng nhập)
  isAuthenticated: boolean            // Trạng thái đã đăng nhập hay chưa
  isLoading: boolean                  // Trạng thái đang tải (kiểm tra token khi app khởi động)
  login: (data: LoginRequest) => Promise<void>      // Function đăng nhập
  register: (data: RegisterRequest) => Promise<void> // Function đăng ký
  logout: () => void                  // Function đăng xuất
}

/**
 * Tạo Context với giá trị mặc định là undefined
 * undefined để biết khi nào AuthContext chưa được wrap bởi AuthProvider
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * AuthProviderProps: Props cho AuthProvider component
 */
interface AuthProviderProps {
  children: ReactNode  // Các component con sẽ được wrap bởi AuthProvider
}

/**
 * AuthProvider Component
 * Cung cấp auth state và functions cho toàn bộ app
 */
export function AuthProvider({ children }: AuthProviderProps) {
  // State management: Quản lý user, token, và trạng thái loading
  const [user, setUser] = useState<UserResponse | null>(null)
  const [token, setTokenState] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)  // true khi đang kiểm tra token lúc app khởi động

  const navigate = useNavigate()

  /**
   * useEffect: Tự động khôi phục auth state từ localStorage khi app khởi động
   * Chạy 1 lần duy nhất khi component mount (dependency array rỗng [])
   */
  useEffect(() => {
    const initAuth = () => {
      // Lấy token từ localStorage
      const storedToken = getToken()

      // Kiểm tra token có tồn tại và hợp lệ không
      if (storedToken && isValidToken()) {
        // Token hợp lệ → Khôi phục state
        setTokenState(storedToken)
        
        // Decode token để lấy thông tin user
        const decoded = decodeToken(storedToken)
        if (decoded) {
          // Tạo user object từ decoded token
          // Note: Token chỉ chứa thông tin cơ bản, không có status, createdAt, updatedAt
          // Nên chỉ set các field có trong token
          const userFromToken: Partial<UserResponse> = {
            id: decoded.userId || decoded.id,
            username: decoded.username,
            email: decoded.email || '',
            role: decoded.role || 'CUSTOMER',
            fullName: decoded.fullName,
          }
          // Chỉ set user nếu có đủ thông tin cơ bản
          if (userFromToken.id && userFromToken.username) {
            setUser({
              ...userFromToken,
              status: 'ACTIVE', // Mặc định ACTIVE
              createdAt: new Date().toISOString(), // Tạm thời, sẽ lấy từ API sau
              updatedAt: new Date().toISOString(), // Tạm thời, sẽ lấy từ API sau
            } as UserResponse)
          }
        }
      } else {
        // Token không hợp lệ hoặc hết hạn → Xóa token
        removeToken()
      }
      
      // Đánh dấu đã hoàn tất kiểm tra
      setIsLoading(false)
    }

    initAuth()
  }, [])  // Chạy 1 lần duy nhất khi component mount

  /**
   * Login function: Đăng nhập user
   * 1. Gọi API login
   * 2. Lưu token vào localStorage
   * 3. Cập nhật state (user, token)
   * 4. Redirect về trang chủ
   */
  const login = async (data: LoginRequest): Promise<void> => {
    try {
      // Gọi API login
      const response: AuthResponse = await authApi.login(data)
      
      // Lưu token vào localStorage
      setToken(response.token)
      
      // Cập nhật state
      setTokenState(response.token)
      // response.user từ AuthResponse chỉ có id, username, email, role, fullName
      // Cần thêm status, createdAt, updatedAt để match với UserResponse
      setUser({
        ...response.user,
        status: 'ACTIVE', // Mặc định ACTIVE
        createdAt: new Date().toISOString(), // Tạm thời, sẽ lấy từ API sau
        updatedAt: new Date().toISOString(), // Tạm thời, sẽ lấy từ API sau
      } as UserResponse)
      
      // Redirect về trang chủ
      navigate('/')
    } catch (error) {
      // Re-throw error để component có thể xử lý
      throw error
    }
  }

  /**
   * Register function: Đăng ký user mới
   * 1. Gọi API register
   * 2. Redirect về trang login (user cần đăng nhập sau khi đăng ký)
   */
  const register = async (data: RegisterRequest): Promise<void> => {
    try {
      // Gọi API register
      await authApi.register(data)
      
      // Sau khi đăng ký thành công, redirect về login
      navigate('/login', { 
        state: { message: 'Đăng ký thành công! Vui lòng đăng nhập.' } 
      })
    } catch (error) {
      // Re-throw error để component có thể xử lý
      throw error
    }
  }

  /**
   * Logout function: Đăng xuất user
   * 1. Xóa token khỏi localStorage
   * 2. Xóa state (user, token)
   * 3. Redirect về trang login
   */
  const logout = (): void => {
    // Xóa token khỏi localStorage
    removeToken()
    
    // Xóa state
    setTokenState(null)
    setUser(null)
    
    // Redirect về trang login
    navigate('/login')
  }

  // Giá trị cung cấp cho Context
  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token,  // true nếu có token
    isLoading,
    login,
    register,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/**
 * useAuth Hook
 * Hook để sử dụng AuthContext trong các component
 * 
 * @returns AuthContextType - Object chứa user, token, isAuthenticated, và các functions
 * @throws Error nếu được gọi bên ngoài AuthProvider
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user, isAuthenticated, login, logout } = useAuth()
 *   
 *   if (isAuthenticated) {
 *     return <div>Hello {user?.username}</div>
 *   }
 *   
 *   return <button onClick={() => login({ username: 'admin', password: '123' })}>Login</button>
 * }
 * ```
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  
  // Kiểm tra xem component có được wrap bởi AuthProvider không
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}

