"use client";
import React, { useState } from "react";
import { LoginFormData, LoginFormSchema } from "./validation/LoginFormSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeClosed, Lock, User } from "lucide-react";
import Button from "@/components/custom/CustomBtn/Button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type LoginFormProps = {
  switchToSignUp: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({switchToSignUp}) => {
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { login } = useAuth();

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
      const response = await login(data);
      console.log(response);
      if (response?.status) {
        router.push("/");
        localStorage.setItem("token", response?.data?.token);
        // toast.success("Login successfully")
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-[20vh] flex items-center justify-center px-4 ">
      <div className="max-w-md  w-full border border-indigo-200 rounded-2xl shadow-xl p-6  bg-white">
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
            className={`relative flex items-center border rounded-lg gap-3 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-300 bg-white transition ${
              errors.email ? "ring-1 ring-red-200 border-red-300" : ""
            }`}
          >
            <User className="text-slate-500" />
            <input
              type="text"
              placeholder="Email"
              {...register("email")}
              className="w-full outline-none text-gray-800 placeholder-gray-400 bg-white"
              aria-invalid={!!errors.email}
            />
          </div>
          <div
            className={`relative flex items-center border rounded-lg gap-3 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-300 bg-white transition ${
              errors.password ? "ring-1 ring-red-200 border-red-300" : ""
            }`}
          >
            <Lock className="text-slate-500" />
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="w-full outline-none text-gray-800 placeholder-gray-400 bg-white"
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
          <Button className="bg-[#4f39f6] w-full">Login</Button>
          <center className="text-slate-600">
            Don't have an acoount ?{" "}
            <span
              onClick={ switchToSignUp}
              className="ml-1 font-medium hover:underline cursor-pointer"
              style={{ color: "#4f46e5" }}
            >
              Sign-in
            </span>
          </center>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
