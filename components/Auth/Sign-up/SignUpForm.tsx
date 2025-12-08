"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { SignUpFormData, SignUpSchema } from "./validation/SignUpSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import CustomBtn from "@/components/custom/CustomBtn/Button";
import { Eye, EyeClosed, Lock, User, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

type SignUpFormProps = {
  switchToLogin: () => void;
};

const SignUpForm: React.FC<SignUpFormProps> = ({ switchToLogin }) => {
  const router = useRouter();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(SignUpSchema),
  });

  const submit = async (data: SignUpFormData) => {
    setLoading(true);
    try {
      const response = await signup(data);

      console.log(response.status);

      if (response?.status === "success") {
        switchToLogin();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-h-[50vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full border border-indigo-200 rounded-2xl shadow-xl p-6 mt-10 bg-white">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Sign up to <span style={{ color: "#4F39F6" }}>YaariGo</span>
          </h2>
          <p className="text-gray-500 mt-1">
            Welcome! Fill in the details to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5">
          {/* Name Field */}
          <div
            className={`relative flex items-center border rounded-lg px-3 gap-3 py-2 focus-within:ring-2 focus-within:ring-indigo-300 bg-white transition ${
              errors.name ? "ring-1 ring-red-200 border-red-300" : ""
            }`}
          >
            <User className="text-gray-600" />
            <input
              type="text"
              placeholder="Full Name"
              {...register("name")}
              className="w-full outline-none text-gray-800 placeholder-gray-400 bg-white"
              aria-invalid={!!errors.name}
            />
          </div>
          {errors.name && (
            <p
              role="alert"
              className="text-sm mt-1"
              style={{ color: "#dc2626" }} // explicit red to avoid overrides
            >
              {errors.name.message}
            </p>
          )}

          {/* Email Field */}
          <div
            className={`relative flex items-center border rounded-lg gap-3 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-300 bg-white transition ${
              errors.email ? "ring-1 ring-red-200 border-red-300" : ""
            }`}
          >
            <Mail className="text-gray-600" />
            <input
              type="email"
              placeholder="Email"
              {...register("email")}
              className="w-full outline-none text-gray-800 placeholder-gray-400 bg-white"
              aria-invalid={!!errors.email}
            />
          </div>
          {errors.email && (
            <p
              role="alert"
              className="text-sm mt-1"
              style={{ color: "#dc2626" }}
            >
              {errors.email.message}
            </p>
          )}

          {/* Password Field */}
          <div
            className={`relative flex items-center border rounded-lg gap-3 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-300 bg-white transition ${
              errors.password ? "ring-1 ring-red-200 border-red-300" : ""
            }`}
          >
            <Lock className="text-gray-600" />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="w-full outline-none text-gray-800 placeholder-gray-400 bg-white pr-10"
              aria-invalid={!!errors.password}
            />
            <div
              className={`absolute right-3 cursor-pointer ${
                errors.password ? "text-red-500" : "text-gray-600"
              }`}
              onClick={() => setShowPass(!showPass)}
              role="button"
              aria-label={showPass ? "Hide password" : "Show password"}
            >
              {showPass ? <Eye /> : <EyeClosed />}
            </div>
          </div>
          {errors.password && (
            <p
              role="alert"
              className="text-sm mt-1"
              style={{ color: "#dc2626" }}
            >
              {errors.password.message}
            </p>
          )}

          {/* Submit Button */}
          <CustomBtn
            type="submit"
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition ${
              loading ? "opacity-80 cursor-wait" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creating..." : "Sign Up"}
          </CustomBtn>
        </form>

        {/* Login Link */}
        <div className="flex justify-center mt-4 text-sm" aria-live="polite">
          <span className="text-gray-600 mr-2">Already have an account?</span>
          <button
            onClick={switchToLogin}
            className="ml-1 font-medium hover:underline cursor-pointer"
            style={{ color: "#4f46e5" }} // explicit indigo color to avoid overrides
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
