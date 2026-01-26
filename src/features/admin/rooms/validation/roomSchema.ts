import * as yup from 'yup'

export const roomSchema = yup.object({
  cinemaId: yup
    .number()
    .required('Cinema is required')
    .typeError('Please select a cinema')
    .min(1, 'Please select a valid cinema'),

  roomNumber: yup
    .string()
    .required('Room number is required')
    .max(50, 'Room number must not exceed 50 characters')
    .trim(),

  totalRows: yup
    .number()
    .required('Number of rows is required')
    .min(1, 'Must have at least 1 row')
    .max(50, 'Cannot exceed 50 rows')
    .typeError('Rows must be a number')
    .integer('Rows must be a whole number'),

  totalCols: yup
    .number()
    .required('Number of seats per row is required')
    .min(1, 'Must have at least 1 seat per row')
    .max(50, 'Cannot exceed 50 seats per row')
    .typeError('Seats per row must be a number')
    .integer('Seats per row must be a whole number'),
})

export type RoomFormValues = yup.InferType<typeof roomSchema>


