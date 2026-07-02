import { SignUpFormData } from "@/components/screens/Auth/Sign-up/validation/SignUpSchema";
import api from "@/lib/api";
import { ApiUrl } from "./UrlServices";
import { LoginFormData } from "@/components/screens/Auth/Login/validation/LoginFormSchema";
import { toast } from "sonner";
import { forgetPasswordFormData } from "@/components/screens/Auth/forget-password/validation/ForgetaPasswordSchema";
import { resetPasswordFromData } from "@/components/screens/Auth/reset-password/validation/ResetPasswordSchema";
import { authenticatedInstance, unauthenticatedInstance } from "@/utils/axios";
import { API_URL, apiEndPoints } from "@/constant/api";


export const authServices = {
    register: async (data: SignUpFormData) => {
        try {
            const response = await unauthenticatedInstance.post(
                apiEndPoints.signup,
                {
                    ...data,
                    username: data.name
                }
            );

            toast.success(response?.data?.message);
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Signup failed");
        }
    },

    login: async (data: LoginFormData) => {
        try {
            const response = await unauthenticatedInstance.post(
                apiEndPoints.login,
                data
            );

            toast.success(response?.data?.message);
            return response?.data;
        } catch (error: any) {
            toast.error(error?.response?.data?.message || "Login failed");
        }
    },
    forgetPassword: async (data: forgetPasswordFormData) => {
        try {
            const response = await unauthenticatedInstance.post(
                apiEndPoints.forgetPassword,
                data
            );
            toast.success(response?.data?.message);
            return response?.data;
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Failed to request password reset"
            );
        }
    },
    resetPassword: async (token: string, data: resetPasswordFromData) => {
        try {
            const response = await unauthenticatedInstance.post(
                apiEndPoints.resetPassword(token),
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
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("user"); // ✅ VERY IMPORTANT
            toast.success("Logout successfully");
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || "Logout failed"
            );
        }
    }

}