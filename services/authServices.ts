import { SignUpFormData } from "@/components/screens/Auth/Sign-up/validation/SignUpSchema";
import api from "@/lib/api";
import { ApiUrl } from "./UrlServices";
import { LoginFormData } from "@/components/screens/Auth/Login/validation/LoginFormSchema";
import { toast } from "sonner";
import { forgetPasswordFormData } from "@/components/screens/Auth/forget-password/validation/ForgetaPasswordSchema";
import { resetPasswordFromData } from "@/components/screens/Auth/reset-password/validation/ResetPasswordSchema";

export const authServices = {
    register: async (data: SignUpFormData) => {
        try {
            const response = await api.post(`${ApiUrl}/user/register`, data);
            console.log(response);
            toast.success(response?.data?.message)
            return response?.data;
        } catch (error: any) {
            toast.error("Signup failed")
        }
    },
    login: async (data: LoginFormData) => {
        try {
            const response = await api.post(`${ApiUrl}/user/login`, data);
            toast.success(response?.data?.message)
            return response?.data
        } catch (error: any) {
            toast.error(error.message)
        }
    },
    forgetPassword: async (data: forgetPasswordFormData) => {
        try {
            const response = await api.post(`${ApiUrl}/user/forget-password`, data);
            toast.success(response?.data?.message);
            return response?.data
        } catch (error: any) {
            toast.error(error.message)
        }
    },
    resetPassword: async (token: string, data: resetPasswordFromData) => {
        try {
            const response = await api.post(
                `${ApiUrl}/user/reset-password/${token}`,
                data
            );

            toast.success(response?.data?.message);
            return response?.data;

        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Failed to reset password"
            );
        }
    },
    logout: async () => {
        const token = localStorage.getItem("token");

        try {
            const response = await api.post(
                `${ApiUrl}/user/logout`,
                {}, // ✅ empty body
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            localStorage.removeItem("token");
            localStorage.removeItem("user"); // ✅ VERY IMPORTANT

            toast.success(response?.data?.message);
            return response?.data;

        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Logout failed"
            );
        }
    }

}