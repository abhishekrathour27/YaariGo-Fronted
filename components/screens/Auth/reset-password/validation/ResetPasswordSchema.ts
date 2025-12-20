import * as yup from "yup"

export const resetPasswordSchema = yup.object().shape({
    newPassword: yup.string().min(6, "Password must be at least 6 characters").required("New password is required"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("newpassword")], "Passwords must match")
        .required("Confirm password is required"),
});

export type resetPasswordFromData = yup.InferType<typeof resetPasswordSchema>