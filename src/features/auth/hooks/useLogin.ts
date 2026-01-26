import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/context/AuthContext'
import { loginSchema } from '../validation/authSchema'
import type { LoginRequest } from '@/shared/types/auth.types'

export function useLogin() {
  const { login } = useAuth()

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


