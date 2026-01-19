import { useForm, type SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/shared/components/ui'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/components/ui'
import { ROUTES } from '@/shared/constants/routes'
import type { RegisterRequest } from '@/shared/types/auth.types'

// Schema validation với Yup
const registerSchema = yup.object({
  fullName: yup.string().required('Full name is required').max(100, 'Full name must not exceed 100 characters'),
  email: yup.string().required('Email is required').email('Invalid email address').max(100, 'Email must not exceed 100 characters'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  agreeToTerms: yup.boolean().required('You must agree to the Terms of Service and Privacy Policy').oneOf([true], 'You must agree to the Terms of Service and Privacy Policy'),
})

interface RegisterFormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export default function RegisterPage() {
  const navigate = useNavigate() // React Hook: điều hướng trang
  const { register: registerUser, isAuthenticated } = useAuth() // AuthContext: lấy register function và isAuthenticated

  // Nếu đã đăng nhập, redirect về trang chủ
  if (isAuthenticated) {
    navigate(ROUTES.HOME, { replace: true })
    return null
  }

  const {
    register, // React Hook Form: đăng ký input với form
    handleSubmit, // React Hook Form: xử lý form submit (validate trước khi submit)
    watch, // React Hook Form: watch field value để reactive update
    formState: { errors }, // React Hook Form: object chứa lỗi validation
    setError, // React Hook Form: set lỗi thủ công (từ server)
  } = useForm<RegisterFormData>({ // React Hook: quản lý form state
    resolver: yupResolver(registerSchema), // Kết nối Yup schema với React Hook Form
    defaultValues: { // Giá trị mặc định của form
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  })

  // Watch password and confirm password để hiển thị checkmark khi password match
  const password = watch('password') // watch: lấy giá trị password field (reactive)
  const confirmPassword = watch('confirmPassword') // watch: lấy giá trị confirmPassword field (reactive)
  const passwordsMatch = password && confirmPassword && password === confirmPassword // Check password match để hiển thị checkmark

  // TanStack React Query: setup mutation với AuthContext.register
  // Wrap AuthContext.register trong useMutation để có loading state và error handling
  const registerMutation = useMutation({
    mutationFn: registerUser, // Sử dụng register function từ AuthContext
    onError: (error: any) => { // Callback khi lỗi
      // Error handling: lấy thông báo lỗi từ server
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.'
      setError('root', { // Set lỗi từ server vào form
        type: 'server',
        message: errorMessage,
      })
    },
    // onSuccess không cần vì AuthContext.register đã xử lý redirect
  })

  const onSubmit = (data: RegisterFormData) => { // Handler khi form submit (đã validate)
    const username = data.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '') // Transform: tạo username từ email
    const registerData: RegisterRequest = { // Map form data sang API format
      username: username,
      email: data.email,
      password: data.password,
      fullName: data.fullName,
    }
    registerMutation.mutate(registerData) // Gọi register từ AuthContext (qua useMutation)
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
            <CardTitle className="text-2xl font-bold text-center text-white">Create Account</CardTitle>
            <CardDescription className="text-center text-gray-400 text-sm">
              Join Cinestech and start your cinema journey
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Server Error */}
            {errors.root && (
              <div className="p-4 bg-red-500/20 border border-red-400/50 text-red-300 rounded-lg backdrop-blur-sm">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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

            <form onSubmit={handleSubmit(onSubmit as SubmitHandler<RegisterFormData>)} className="space-y-4"> {/* handleSubmit: validate trước khi gọi onSubmit */}
              {/* Full Name Field */}
              <div className="space-y-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    className={`w-full pl-10 pr-3 py-2.5 rounded-md border transition-colors ${
                      errors.fullName
                        ? 'border-red-500 bg-red-500/10 text-red-300 placeholder:text-red-300/50'
                        : 'border-gray-600 bg-[#3a4553] text-white placeholder:text-gray-500 focus:border-[#648DDB]'
                    } focus:outline-none focus:ring-2 focus:ring-[#648DDB]/50`}
                    {...register('fullName')}
                  />
                </div>
                {errors.fullName && <p className="text-sm text-red-400 mt-1">{errors.fullName.message}</p>}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  {/* register: đăng ký input với form */}
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full pl-10 pr-3 py-2.5 rounded-md border transition-colors ${
                      errors.email
                        ? 'border-red-500 bg-red-500/10 text-red-300 placeholder:text-red-300/50'
                        : 'border-gray-600 bg-[#3a4553] text-white placeholder:text-gray-500 focus:border-[#648DDB]'
                    } focus:outline-none focus:ring-2 focus:ring-[#648DDB]/50`}
                    {...register('email')}
                  />
                </div>
                {errors.email && <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>}
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className={`w-full pl-10 pr-10 py-2.5 rounded-md border transition-colors ${
                      errors.confirmPassword
                        ? 'border-red-500 bg-red-500/10 text-red-300 placeholder:text-red-300/50'
                        : passwordsMatch
                        ? 'border-green-500 bg-green-500/10 text-white placeholder:text-gray-500 focus:border-green-500'
                        : 'border-gray-600 bg-[#3a4553] text-white placeholder:text-gray-500 focus:border-[#648DDB]'
                    } focus:outline-none focus:ring-2 focus:ring-[#648DDB]/50`}
                    {...register('confirmPassword')}
                  />
                  {passwordsMatch && ( // Conditional rendering: hiển thị checkmark khi password match
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-400 mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Terms and Conditions Checkbox */}
              <div className="space-y-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  {/* register: đăng ký checkbox với form */}
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-gray-600 bg-[#3a4553] text-[#FE7E32] focus:ring-2 focus:ring-[#FE7E32]/50 cursor-pointer"
                    style={{
                      accentColor: '#FE7E32',
                    }}
                    {...register('agreeToTerms')}
                  />
                  <span className="text-sm text-gray-300">
                    I agree to the{' '}
                    <Link to="/terms" className="text-[#FE7E32] hover:text-[#FE7E32]/80 underline">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/privacy" className="text-[#FE7E32] hover:text-[#FE7E32]/80 underline">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
                {errors.agreeToTerms && (
                  <p className="text-sm text-red-400 mt-1">{errors.agreeToTerms.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-[#FE7E32] hover:bg-[#FE7E32]/90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                isLoading={registerMutation.isPending} // isPending: trạng thái đang gọi API
                disabled={registerMutation.isPending} // Disable button khi đang loading
              >
                {registerMutation.isPending ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            {/* Login Link */}
            <div className="text-center pt-2">
              <p className="text-sm text-gray-400">
                Already have an account?{' '}
                <Link to={ROUTES.LOGIN} className="font-medium text-[#FE7E32] hover:text-[#FE7E32]/80 transition-colors">
                  Login here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">© 2025 Cinema Booking System. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
