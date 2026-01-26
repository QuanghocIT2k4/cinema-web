import * as yup from 'yup'

export const updateProfileSchema = yup.object({
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

  avatar: yup
    .string()
    .url('Avatar must be a valid URL')
    .max(500, 'Avatar URL must not exceed 500 characters'),
})

export const changePasswordSchema = yup.object({
  oldPassword: yup
    .string()
    .required('Current password is required')
    .min(6, 'Password must be at least 6 characters'),

  newPassword: yup
    .string()
    .required('New password is required')
    .min(6, 'New password must be at least 6 characters')
    .max(100, 'Password must not exceed 100 characters')
    .test('different', 'New password must be different from current password', function (value) {
      const { oldPassword } = this.parent
      return !oldPassword || value !== oldPassword
    }),

  confirmPassword: yup
    .string()
    .required('Please confirm your password')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
})

export type UpdateProfileFormValues = yup.InferType<typeof updateProfileSchema>
export type ChangePasswordFormValues = yup.InferType<typeof changePasswordSchema>


