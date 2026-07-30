import { useState } from "react";
import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps<T extends FieldValues = FieldValues> = {
  register: UseFormRegister<T>;
  name?: Path<T>;
  label?: string;
  placeholder?: string;
  error?: string;
};

export function PasswordInput<T extends FieldValues>({
  register,
  name = "password" as Path<T>,
  label = "Password",
  placeholder = "Enter your password",
  error,
}: PasswordInputProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor={String(name)}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <input
          id={String(name)}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          {...register(name)}
          className={`w-full rounded-xl border px-4 py-3 pr-12 outline-none transition ${
            error
              ? "border-red-500 focus:border-red-500"
              : "border-slate-300 focus:border-slate-900"
          }`}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff size={20} />
          ) : (
            <Eye size={20} />
          )}
        </button>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}