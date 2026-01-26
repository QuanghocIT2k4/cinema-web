import * as yup from 'yup'

export const userSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email address')
    .max(100, 'Email must not exceed 100 characters'),

  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must not exceed 50 characters')
    .matches(/^[a-zA-Z0-9]+$/, 'Username can only contain letters and numbers')
    .trim(),

  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must not exceed 100 characters'),

  fullName: yup
    .string()
    .max(100, 'Full name must not exceed 100 characters')
    .trim(),

  phone: yup
    .string()
    .max(20, 'Phone must not exceed 20 characters')
    .matches(/^[0-9+\-\s()]*$/, 'Phone can only contain numbers and common phone characters')
    .trim(),

  address: yup
    .string()
    .max(255, 'Address must not exceed 255 characters')
    .trim(),

  role: yup
    .string()
    .oneOf(['ADMIN', 'CUSTOMER'], 'Invalid role')
    .required('Role is required'),

  status: yup
    .string()
    .oneOf(['ACTIVE', 'INACTIVE'], 'Invalid status')
    .required('Status is required'),
})

export const createUserSchema = userSchema.shape({
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password must not exceed 100 characters'),
})

export type UserFormValues = yup.InferType<typeof userSchema>
export type CreateUserFormValues = yup.InferType<typeof createUserSchema>


