import * as yup from 'yup'

export const showtimeSchema = yup.object({
  movieId: yup
    .number()
    .required('Movie is required')
    .typeError('Please select a movie')
    .min(1, 'Please select a valid movie'),

  cinemaId: yup
    .number()
    .required('Cinema is required')
    .typeError('Please select a cinema')
    .min(1, 'Please select a valid cinema'),

  roomId: yup
    .number()
    .required('Room is required')
    .typeError('Please select a room')
    .min(1, 'Please select a valid room'),

  startTime: yup
    .string()
    .required('Start time is required')
    .test('is-future', 'Start time must be in the future', function (value) {
      if (!value) return true
      const startTime = new Date(value)
      const now = new Date()
      return startTime > now
    }),

  price: yup
    .number()
    .required('Ticket price is required')
    .min(1000, 'Price must be at least 1,000 VND')
    .max(1000000, 'Price cannot exceed 1,000,000 VND')
    .typeError('Price must be a number')
    .integer('Price must be a whole number'),
})

export type ShowtimeFormValues = yup.InferType<typeof showtimeSchema>


