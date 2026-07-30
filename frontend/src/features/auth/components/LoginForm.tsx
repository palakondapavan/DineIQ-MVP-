import { Eye, EyeOff, Lock, User } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import AppButton from "@/shared/components/ui/AppButton";
import AppInput from "@/shared/components/ui/AppInput";
import PageHeader from "@/shared/components/ui/PageHeader";

import { useLogin } from "../hooks/useLogin";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    errors,
    isPending,
    serverError,
    onSubmit,
  } = useLogin();

  return (
    <>
      <PageHeader
        badge="Staff Portal"
        title="Welcome Back"
        description="Sign in to continue managing your restaurant."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="space-y-5"
      >
        <AppInput
          label="Email"
          type="email"
          placeholder="Enter your email"
          icon={User}
          autoComplete="email"
          error={errors.email?.message?.toString()}
          {...register("email")}
        />

        <div className="relative">
          <AppInput
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            icon={Lock}
            autoComplete="current-password"
            error={errors.password?.message?.toString()}
            {...register("password")}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="
              absolute
              right-4
              top-[54px]
              text-slate-500
              transition-colors
              hover:text-indigo-600
            "
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              {...register("rememberMe")}
            />
            Remember me
          </label>

          <Link
            to="/forgot-password"
            className="text-sm font-medium text-indigo-600 transition-colors hover:text-indigo-700"
          >
            Forgot Password?
          </Link>
        </div>

        {serverError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {serverError}
          </div>
        )}

        <AppButton
          type="submit"
          loading={isPending}
        >
          Sign In
        </AppButton>
      </form>
    </>
  );
}