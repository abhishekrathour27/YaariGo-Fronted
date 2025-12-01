import * as yup from 'yup'
export const SignUpSchema = yup.object({
    name: yup.string().min(4).required("Name field is required"),
    email: yup.string().email().required('Invalid email'),
    password: yup.string().min(6).max(20).required(),
})

export type SignUpFormData = yup.InferType<typeof SignUpSchema>