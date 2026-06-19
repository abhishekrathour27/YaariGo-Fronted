"use client";
import { forgetPasswordFormData } from "@/components/screens/Auth/forget-password/validation/ForgetaPasswordSchema";
import { LoginFormData } from "@/components/screens/Auth/Login/validation/LoginFormSchema";
import { resetPasswordFromData } from "@/components/screens/Auth/reset-password/validation/ResetPasswordSchema";
import { SignUpFormData } from "@/components/screens/Auth/Sign-up/validation/SignUpSchema";
import { authServices } from "@/services/authServices";
import { UserType } from "@/types/userDataType";
import { createContext, ReactNode, useContext, useState } from "react";

// ---------- 1. TYPE OF CONTEXT ----------
type AuthContextType = {
  signup: (data: SignUpFormData) => Promise<any>;
  login: (data: LoginFormData) => Promise<any>;
  forgetPassword: (data: forgetPasswordFormData) => Promise<any>;
  resetPassword: (token: string, data: resetPasswordFromData) => Promise<any>;
  logout: () => Promise<any>;
};

// ---------- 2. CREATE CONTEXT ----------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ---------- 3. PROVIDER COMPONENT ----------
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const signup = async (data: SignUpFormData) => {
    try {
      const response = await authServices.register(data);
      console.log(response);
      return response;
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const login = async (data: LoginFormData) => {
    try {
      const response = await authServices.login(data);

      // console.log("LOGIN RESPONSE", response);

      const loginData = response?.data?.user;
      console.log("loginData",loginData)

      if (loginData) {
        const safeUser = {
          _id: loginData._id,
          username: loginData.username,
          email: loginData.email,
        };

        console.log("safe", safeUser);

        localStorage.setItem("user", JSON.stringify(safeUser));

        localStorage.setItem("accessToken", response?.data?.accessToken);
      }

      return response;
    } catch (error) {
      console.error(error);
    }
  };
  const forgetPassword = async (data: forgetPasswordFormData) => {
    const response = await authServices.forgetPassword(data);
    return;
  };

  const resetPassword = async (token: string, data: resetPasswordFromData) => {
    const response = await authServices.resetPassword(token, data);
    return response;
  };

  const logout = async () => {
    return await authServices.logout();
  };

  return (
    <AuthContext.Provider
      value={{ signup, login, forgetPassword, resetPassword, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ---------- 4. CUSTOM HOOK ----------
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
