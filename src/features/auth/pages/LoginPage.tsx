import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/shared/components/ui'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/components/ui'
import { ROUTES } from '@/shared/constants/routes'
import type { LoginRequest } from '@/shared/types/auth.types'

// Schema validation với Yup
const loginSchema = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must not exceed 50 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
})

export default function LoginPage() {
  const navigate = useNavigate() // React Hook: điều hướng trang
  const location = useLocation() // React Hook: lấy location state
  const { login, isAuthenticated } = useAuth() // AuthContext: lấy login function và isAuthenticated
  const successMessage = (location.state as any)?.message as string | undefined
  
  // Nếu đã đăng nhập, redirect về trang chủ hoặc trang trước đó
  // IMPORTANT: redirect trong useEffect để tránh navigate trong render (có thể gây loop/đơ UI)
  useEffect(() => {
  if (isAuthenticated) {
    const from = (location.state as any)?.from?.pathname || ROUTES.HOME
    navigate(from, { replace: true })
  }
  }, [isAuthenticated, location.state, navigate])

  if (isAuthenticated) return null
  
  // React Hook Form: quản lý form state
  const {
    register, // React Hook Form: đăng ký input với form
    handleSubmit, // React Hook Form: xử lý form submit (validate trước khi submit)
    formState: { errors }, // React Hook Form: object chứa lỗi validation
    setError, // React Hook Form: set lỗi thủ công (từ server)
  } = useForm<LoginRequest & { rememberMe?: boolean }>({ // React Hook: quản lý form state
    resolver: yupResolver(loginSchema), // Kết nối Yup schema với React Hook Form
    defaultValues: { // Giá trị mặc định của form
      username: '',
      password: '',
      rememberMe: false,
    },
  })

  // TanStack React Query: setup mutation với AuthContext.login
  // Wrap AuthContext.login trong useMutation để có loading state và error handling
  const loginMutation = useMutation({
    mutationFn: login, // Sử dụng login function từ AuthContext
    onError: (error: any) => { // Callback khi lỗi
      // Error handling: lấy thông báo lỗi từ server
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.'
      setError('root', { // Set lỗi từ server vào form
        type: 'server',
        message: errorMessage,
      })
    },
    // onSuccess không cần vì AuthContext.login đã xử lý redirect
  })

  const onSubmit = (data: LoginRequest) => { // Handler khi form submit (đã validate)
    loginMutation.mutate(data) // Gọi login từ AuthContext (qua useMutation)
  }

  return (
    <div className="min-h-screen bg-[#262C3D] flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md">
        <Card
          className="backdrop-blur-lg border shadow-2xl"
          style={{
            backgroundColor: 'rgba(26, 31, 46, 0.95)',
            borderColor: 'rgba(108, 114, 147, 0.3)',
          }}
        >
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center text-white">
              Login
            </CardTitle>
            <CardDescription className="text-center text-gray-400 text-sm">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Success message (ví dụ sau khi đăng ký xong chuyển về login) */}
            {successMessage && (
              <div className="p-4 bg-emerald-500/20 border border-emerald-400/60 text-emerald-200 rounded-lg backdrop-blur-sm text-sm">
                {successMessage}
              </div>
            )}

            {/* Server Error */}
            {errors.root && (
              <div className="p-4 bg-red-500/20 border border-red-400/50 text-red-300 rounded-lg backdrop-blur-sm">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm">{errors.root.message}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4"> {/* handleSubmit: validate trước khi gọi onSubmit */}
              {/* Username Field */}
              <div className="space-y-2">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-300"
                >
                  Username
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  {/* register: đăng ký input với form */}
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className={`w-full pl-10 pr-3 py-2.5 rounded-md border transition-colors ${
                      errors.username
                        ? 'border-red-500 bg-red-500/10 text-red-300 placeholder:text-red-300/50'
                        : 'border-gray-600 bg-[#3a4553] text-white placeholder:text-gray-500 focus:border-[#648DDB]'
                    } focus:outline-none focus:ring-2 focus:ring-[#648DDB]/50`}
                    {...register('username')}
                  />
                </div>
                {errors.username && ( // Conditional rendering: hiển thị lỗi validation
                  <p className="text-sm text-red-400 mt-1">{errors.username.message}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-300"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>
                  {/* register: đăng ký input với form */}
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className={`w-full pl-10 pr-3 py-2.5 rounded-md border transition-colors ${
                      errors.password
                        ? 'border-red-500 bg-red-500/10 text-red-300 placeholder:text-red-300/50'
                        : 'border-gray-600 bg-[#3a4553] text-white placeholder:text-gray-500 focus:border-[#648DDB]'
                    } focus:outline-none focus:ring-2 focus:ring-[#648DDB]/50`}
                    {...register('password')}
                  />
                </div>
                {errors.password && ( // Conditional rendering: hiển thị lỗi validation
                  <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {/* register: đăng ký checkbox với form */}
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 bg-[#3a4553] text-[#648DDB] focus:ring-2 focus:ring-[#648DDB]/50 focus:ring-offset-0 cursor-pointer"
                    style={{
                      accentColor: '#648DDB',
                    }}
                    {...register('rememberMe')}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-300 cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-[#648DDB] hover:text-[#648DDB]/80 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#FE7E32] hover:bg-[#FE7E32]/90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                isLoading={loginMutation.isPending} // isPending: trạng thái đang gọi API
                disabled={loginMutation.isPending} // Disable button khi đang loading
              >
                {loginMutation.isPending ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            {/* Register Link */}
            <div className="text-center pt-2">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Link
                  to={ROUTES.REGISTER}
                  className="font-medium text-[#648DDB] hover:text-[#648DDB]/80 transition-colors"
                >
                  Create one now
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            © 2025 Cinema Booking System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}
