"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import LoginForm from "./loginForm";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email("ایمیل معتبر وارد کنید"),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ کاراکتر باشد"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function LoginTemplate() {
  useEffect(() => {
    const loginState = localStorage?.getItem("login_state");
    if (loginState) router.push("/dashboard");
  }, []);

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@gmail.com",
      password: "admin123",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    setLoading(true);
    setTimeout(() => {
      toast.success("با موفقیت وارد شدید");
      localStorage.setItem("login_state", "true");
      setLoading(false);
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen fixed inset-0 flex items-center justify-center z-50 
             bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 
             animate-bg-gradient"
    >
      <div className="absolute w-[600px] h-[600px] bg-blue-200 rounded-full blur-[120px] opacity-30 top-[-200px] left-[-200px] animate-float-slow"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-300 rounded-full blur-[100px] opacity-20 bottom-[-100px] right-[-100px] animate-float-slower"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="backdrop-blur-xl bg-white/60 border border-blue-100 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-6 relative overflow-hidden z-10"
      >
        <div className="absolute inset-0 z-0">
          <div className="w-[120%] h-[120%] bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 opacity-30 animate-pulse-slow blur-2xl rounded-full -left-10 -top-10 absolute" />
        </div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-blue-800 text-center mb-4 drop-shadow-sm">
            ورود به پنل کاربران
          </h2>
          <LoginForm loading={loading} form={form} onSubmit={onSubmit} />
        </div>
      </motion.div>
    </div>
  );
}
export default LoginTemplate;
