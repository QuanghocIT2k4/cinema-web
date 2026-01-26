import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { registerSchema } from '../validation/authSchema'
import { ROUTES } from '@/shared/constants/routes'
import type { RegisterRequest } from '@/shared/types/auth.types'

interface RegisterFormData {
  fullName: string
  email: string
  password: string
  confirmPassword: string
  agreeToTerms: boolean
}

export function useRegister() {
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()

  const form = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
  })

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      // Redirect về login sau khi đăng ký thành công
      navigate(ROUTES.LOGIN, { 
        state: { message: 'Đăng ký thành công! Vui lòng đăng nhập.' } 
      })
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.'
      form.setError('root', {
        type: 'server',
        message: errorMessage,
      })
    },
  })

  const onSubmit = (data: RegisterFormData) => {
    const username = data.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')
    const registerData: RegisterRequest = {
      username,
      email: data.email,
      password: data.password,
      fullName: data.fullName,
    }
    registerMutation.mutate(registerData)
  }

  return {
    form,
    registerMutation,
    onSubmit,
  }
}


