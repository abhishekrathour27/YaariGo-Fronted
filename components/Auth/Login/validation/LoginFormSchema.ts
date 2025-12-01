import * as yup from 'yup'
export const LoginFormSchema = yup.object({
    email: yup.string().email().required('Invalid email'),
    password: yup.string().min(6).max(20).required(),
})

export type LoginFormData = yup.InferType<typeof LoginFormSchema>