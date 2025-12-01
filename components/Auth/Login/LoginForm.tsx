"use client";
import React, { useState } from "react";
import { LoginFormData, LoginFormSchema } from "./validation/LoginFormSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "lucide-react";
import Button from "@/components/custom/CustomBtn/Button";

type LoginFormProps = {
  switchToLogin: () => void;
};

const LoginForm: React.FC<LoginFormProps> = (switchToLogin) => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(LoginFormSchema),
  });

  const submit = async (data: LoginFormData) => {
    setLoading(true);
    try {
      // keep same behavior as before (no nav here if you don't want)
      console.log("Sign up data:", data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 ">
      <div className="max-w-md  w-full border border-indigo-200 rounded-2xl shadow-xl p-6 mt-10 bg-white">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Login to <span style={{ color: "#4F39F6" }}>YaariGo</span>
          </h2>
          <p className="text-gray-500 mt-1">
            Welcome! Fill in the details to get started
          </p>
        </div>
        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-3">
          <div
            className={`relative flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-300 bg-white transition ${
              errors.email ? "ring-1 ring-red-200 border-red-300" : ""
            }`}
          >
            <User
            />
            <input
              type="text"
              placeholder="Email"
              {...register("email")}
              className="w-full outline-none text-gray-800 placeholder-gray-400 bg-white"
              aria-invalid={!!errors.email}
            />
          </div>
          <div
            className={`relative flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-300 bg-white transition ${
              errors.password ? "ring-1 ring-red-200 border-red-300" : ""
            }`}
          >
            <User
            />
            <input
              type="text"
              placeholder="Password"
              {...register("password")}
              className="w-full outline-none text-gray-800 placeholder-gray-400 bg-white"
              aria-invalid={!!errors.password}
            />
          </div>
          <Button className="bg-[#4f39f6] w-full">Login</Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
