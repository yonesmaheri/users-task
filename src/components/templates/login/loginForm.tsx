"use state";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import { ScaleLoader } from "react-spinners";

function LoginForm({
  form,
  onSubmit,
  loading,
}: {
  form: any;
  onSubmit: (data: {
    email: string;
    password: string;
    username: string;
  }) => void;
  loading: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const EyeIcon = showPassword ? FiEyeOff : FiEye;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          rules={{ required: "ایمیل الزامی است" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-blue-700">ایمیل</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="ایمیل خود را وارد کنید"
                  className="border border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-right transition-all"
                  dir="ltr"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          rules={{ required: "رمز عبور الزامی است" }}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="text-blue-700">رمز عبور</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                    type={showPassword ? "text" : "password"}
                      {...field}
                      placeholder="ایمیل خود را وارد کنید"
                      className="border border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-right transition-all"
                      dir="ltr"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute inset-y-0 left-3 flex items-center text-blue-600 hover:text-blue-800 text-xl px-2 transition-colors duration-200"
                      tabIndex={-1}
                    >
                      <EyeIcon />
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button
          disabled={loading}
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition-all rounded-lg py-2"
        >
          {loading ? (
            <ScaleLoader color="white" height={15} width={2} />
          ) : (
            "ورود"
          )}
        </Button>
      </form>
    </Form>
  );
}

export default LoginForm;
