import * as yup from 'yup'

export const loginSchema = yup.object({
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

export const registerSchema = yup.object({
  fullName: yup
    .string()
    .required('Full name is required')
    .max(100, 'Full name must not exceed 100 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address')
    .max(100, 'Email must not exceed 100 characters'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  agreeToTerms: yup
    .boolean()
    .required('You must agree to the Terms of Service and Privacy Policy')
    .oneOf([true], 'You must agree to the Terms of Service and Privacy Policy'),
})


