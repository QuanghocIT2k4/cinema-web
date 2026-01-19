import * as yup from 'yup'

export const movieSchema = yup.object({
    title: yup
        .string()
        .required('Title is required')
        .max(255, 'Title must be less than 255 characters'),

    description: yup
        .string()
        .required('Description is required')
        .max(1000, 'Description must be less than 1000 characters'),

    genre: yup
        .string()
        .required('Genre is required'),

    duration: yup
        .number()
        .required('Duration is required')
        .min(1, 'Duration must be at least 1 minute')
        .typeError('Duration must be a number'),

    releaseDate: yup
        .string()
        .required('Release date is required'),

    endDate: yup
        .string()
        .required('End date is required')
        .test('is-after-release', 'End date must be after release date', function (value) {
            const { releaseDate } = this.parent
            if (!releaseDate || !value) return true
            return new Date(value) > new Date(releaseDate)
        }),

    status: yup
        .string()
        .oneOf(['NOW_SHOWING', 'COMING_SOON', 'ENDED'], 'Invalid status')
        .required('Status is required'),

    ageRating: yup
        .string()
        .required('Age rating is required'),

    poster: yup
        .string()
        .url('Poster must be a valid URL')
        .required('Poster URL is required'),

    trailer: yup
        .string()
        .url('Trailer must be a valid URL')
        .required('Trailer URL is required')
})

export type MovieFormValues = yup.InferType<typeof movieSchema>
