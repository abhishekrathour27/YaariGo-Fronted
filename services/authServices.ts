import { SignUpFormData } from "@/components/Auth/Sign-up/validation/SignUpSchema";
import api from "@/lib/api";
import { ApiUrl } from "./UrlServices";
import { LoginFormData } from "@/components/Auth/Login/validation/LoginFormSchema";
import { toast } from "sonner";

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
            toast.error("Login failed")
        }
    }
}