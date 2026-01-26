import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/shared/components/ui'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/components/ui'
import { ROUTES } from '@/shared/constants/routes'
import { useLogin } from '../hooks'
import { FormField, InputField, ErrorMessage, SuccessMessage, UserIcon, LockIcon } from '../components'

export default function LoginPage() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  const successMessage = (location.state as any)?.message as string | undefined
  const { form, loginMutation, onSubmit } = useLogin()

  const { register, handleSubmit, formState: { errors } } = form

  // Hiển thị loading khi đã authenticated và đang redirect
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#262C3D] flex items-center justify-center">
        <div className="text-white text-lg">Đang chuyển hướng...</div>
      </div>
    )
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
            <CardTitle className="text-2xl font-bold text-center text-white">Login</CardTitle>
            <CardDescription className="text-center text-gray-400 text-sm">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {successMessage && <SuccessMessage message={successMessage} />}
            {errors.root && <ErrorMessage message={errors.root.message || ''} />}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField label="Username" error={errors.username?.message}>
                <InputField
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  icon={<UserIcon />}
                  aria-invalid={!!errors.username}
                  {...register('username')}
                />
              </FormField>

              <FormField label="Password" error={errors.password?.message}>
                <InputField
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  icon={<LockIcon />}
                  aria-invalid={!!errors.password}
                  {...register('password')}
                />
              </FormField>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 bg-[#3a4553] text-[#648DDB] focus:ring-2 focus:ring-[#648DDB]/50 focus:ring-offset-0 cursor-pointer"
                    style={{ accentColor: '#648DDB' }}
                    {...register('rememberMe')}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300 cursor-pointer">
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-[#648DDB] hover:text-[#648DDB]/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#FE7E32] hover:bg-[#FE7E32]/90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                isLoading={loginMutation.isPending}
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <div className="text-center pt-2">
              <p className="text-sm text-gray-400">
                Don't have an account?{' '}
                <Link to={ROUTES.REGISTER} className="font-medium text-[#648DDB] hover:text-[#648DDB]/80 transition-colors">
                  Create one now
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">© 2025 Cinema Booking System. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
