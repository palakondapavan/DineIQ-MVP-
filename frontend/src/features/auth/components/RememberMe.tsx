import type { UseFormRegister } from "react-hook-form";
import type { LoginFormData } from "../types/auth.types";

type RememberMeProps = {
  register: UseFormRegister<LoginFormData>;
};

export function RememberMe({ register }: RememberMeProps) {
  return (
    <div className="flex items-center justify-between">
      <label className="flex cursor-pointer items-center gap-2">
        <input
          type="checkbox"
          {...register("rememberMe")}
          className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
        />

        <span className="text-sm text-slate-600">
          Remember me
        </span>
      </label>

      <button
        type="button"
        className="text-sm font-medium text-slate-900 transition hover:underline"
      >
        Forgot password?
      </button>
    </div>
  );
}