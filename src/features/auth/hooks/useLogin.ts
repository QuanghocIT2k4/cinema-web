import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { loginSchema } from '../validation/authSchema'
import { ROUTES } from '@/shared/constants/routes'
import type { LoginRequest } from '@/shared/types/auth.types'

export function useLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const form = useForm<LoginRequest & { rememberMe?: boolean }>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
      rememberMe: false,
    },
  })

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (user) => {
      // Redirect sau khi login thành công
      // user được return từ hàm login() trong AuthContext
      if (user?.role === 'ADMIN') {
        navigate(ROUTES.ADMIN.DASHBOARD, { replace: true })
      } else {
        const from = (location.state as any)?.from?.pathname || ROUTES.HOME
        navigate(from, { replace: true })
      }
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.'
      form.setError('root', {
        type: 'server',
        message: errorMessage,
      })
    },
  })

  return {
    form,
    loginMutation,
    onSubmit: (data: LoginRequest) => {
      loginMutation.mutate(data)
    },
  }
}


