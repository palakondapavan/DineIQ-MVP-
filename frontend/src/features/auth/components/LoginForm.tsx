import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema } from "../schemas/login.schema";
import type { LoginFormData } from "../types/auth.types";

import { useLogin } from "../hooks/useLogin";

import { PasswordInput } from "./PasswordInput";
import { RememberMe } from "./RememberMe";

export function LoginForm() {
  const { login, isLoading } = useLogin();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
    } catch (error) {
      setError("root", {
        message:
          error instanceof Error
            ? error.message
            : "Login failed",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      {/* Email / Mobile */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Email or Mobile
        </label>

        <input
          id="email"
          type="text"
          placeholder="Enter your email or mobile"
          {...register("email")}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-slate-900"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Password */}
      <PasswordInput
        register={register}
        error={errors.password?.message}
      />

      {/* Remember Me */}
      <RememberMe register={register} />

      {/* Backend Error */}
      {errors.root && (
        <p className="text-center text-sm text-red-500">
          {errors.root.message}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}