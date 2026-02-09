"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeClosed } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/custom/CustomBtn/Button";
import {
  resetPasswordFromData,
  resetPasswordSchema,
} from "./validation/ResetPasswordSchema";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const ResetPasswordPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { resetPassword } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<resetPasswordFromData>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const { token } = useParams();

  const Submit = async (data: resetPasswordFromData) => {
    try {
      if (!token) {
        toast.error("Invalid reset link");
        return;
      }
      const tokenString = Array.isArray(token) ? token[0] : token;
      const response = await resetPassword(tokenString , data) // ✅ token first argument
      // console.log('response',response);
      router.push("/userlogin")
      return
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center bg-white text-slate-600">
      <div className=" shadow-lg rounded-xl p-6 w-[400px]">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <form onSubmit={handleSubmit(Submit)} className="space-y-4">
          {/* New Password */}
          <div className="relative text-slate-600">
            <label className="block font-medium">New Password</label>
            <input
              type={showPass ? "text" : "password"}
              {...register("newPassword")}
              placeholder="Enter new password"
              className="w-full border px-3 py-2 rounded-lg outline-none"
            />
            <div
              className="absolute right-3 top-9 cursor-pointer"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? <Eye /> : <EyeClosed />}
            </div>
            {errors.newPassword && (
              <p className="text-red-500 text-sm">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="relative text-slate-600">
            <label className="block font-medium">Confirm Password</label>
            <input
              type={showConfirm ? "text" : "password"}
              {...register("confirmPassword")}
              placeholder="Confirm new password"
              className="w-full border px-3 py-2 rounded-lg outline-none"
            />
            <div
              className="absolute right-3 top-9 cursor-pointer"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <Eye /> : <EyeClosed />}
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button className="w-full rounded-lg mt-2">Reset Password</Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
