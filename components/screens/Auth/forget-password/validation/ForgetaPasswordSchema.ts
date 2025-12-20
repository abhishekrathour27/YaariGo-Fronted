import * as yup from 'yup'

export const forgetPasswordSchema = yup.object({
    email: yup.string().email().required('Invalid email')
})

export type forgetPasswordFormData = yup.InferType<typeof forgetPasswordSchema>