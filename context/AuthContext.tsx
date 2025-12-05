"use client";
import { LoginFormData } from "@/components/Auth/Login/validation/LoginFormSchema";
import { SignUpFormData } from "@/components/Auth/Sign-up/validation/SignUpSchema";
import { authServices } from "@/services/authServices";
import { UserType } from "@/types/userDataType";
import { createContext, ReactNode, useContext, useState } from "react";

// ---------- 1. TYPE OF CONTEXT ----------
type AuthContextType = {
  signup: (data: SignUpFormData) => Promise<any>;
  login: (data: LoginFormData) => Promise<any>;
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

      if (response?.data?.user) {
        const { password, ...safeUser } = response.data.user;
        localStorage.setItem("user", JSON.stringify(safeUser));
      }

      return response;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ signup, login }}>
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
