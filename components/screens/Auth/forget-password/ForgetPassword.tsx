"use client";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";
import {
  forgetPasswordFormData,
  forgetPasswordSchema,
} from "./validation/ForgetaPasswordSchema";
import Button from "@/components/custom/CustomBtn/Button";
import { useAuth } from "@/context/AuthContext";

const ForgetPassword = () => {
  const { forgetPassword } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<forgetPasswordFormData>({
    resolver: yupResolver(forgetPasswordSchema),
  });

  const onSubmit = async (data: forgetPasswordFormData) => {
    try {
      const response = forgetPassword(data);
      return response;
    } catch (error) {
      console.error("reset link have not sent", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-w-sm  mx-auto mt-10 p-4 border rounded-lg shadow"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">
        Forget Password
      </h2>

      {/* Email Field */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <Button className="w-full rounded-lg mt-2">Send Reset Link</Button>
    </form>
  );
};

export default ForgetPassword;
