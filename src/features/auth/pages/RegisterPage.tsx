import { Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/shared/components/ui'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/shared/components/ui'
import { ROUTES } from '@/shared/constants/routes'
import { useRegister } from '../hooks'
import { FormField, InputField, ErrorMessage, UserIcon, LockIcon, EmailIcon, CheckIcon } from '../components'

export default function RegisterPage() {
  const { isAuthenticated } = useAuth()
  const { form, registerMutation, onSubmit } = useRegister()

  const { register, handleSubmit, watch, formState: { errors } } = form
  const password = watch('password')
  const confirmPassword = watch('confirmPassword')
  const passwordsMatch = password && confirmPassword && password === confirmPassword

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
            <CardTitle className="text-2xl font-bold text-center text-white">Create Account</CardTitle>
            <CardDescription className="text-center text-gray-400 text-sm">
              Join Cinestech and start your cinema journey
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {errors.root && <ErrorMessage message={errors.root.message || ''} />}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField label="Full Name" error={errors.fullName?.message}>
                <InputField
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  icon={<UserIcon />}
                  aria-invalid={!!errors.fullName}
                  {...register('fullName')}
                />
              </FormField>

              <FormField label="Email Address" error={errors.email?.message}>
                <InputField
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  icon={<EmailIcon />}
                  aria-invalid={!!errors.email}
                  {...register('email')}
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

              <FormField label="Confirm Password" error={errors.confirmPassword?.message}>
                <InputField
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  icon={<LockIcon />}
                  rightIcon={passwordsMatch ? <CheckIcon /> : undefined}
                  className={passwordsMatch ? 'border-green-500 bg-green-500/10' : ''}
                  aria-invalid={!!errors.confirmPassword}
                  {...register('confirmPassword')}
                />
              </FormField>

              <div className="space-y-2">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 rounded border-gray-600 bg-[#3a4553] text-[#FE7E32] focus:ring-2 focus:ring-[#FE7E32]/50 cursor-pointer"
                    style={{ accentColor: '#FE7E32' }}
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

              <Button
                type="submit"
                className="w-full bg-[#FE7E32] hover:bg-[#FE7E32]/90 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                isLoading={registerMutation.isPending}
                disabled={registerMutation.isPending}
              >
                {registerMutation.isPending ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

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

        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">© 2025 Cinema Booking System. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
