import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";

interface AppInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: LucideIcon;
}

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  (
    {
      label,
      error,
      icon: Icon,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">
          {label}
        </label>

        <div className="relative group">

          {Icon && (
            <Icon
              size={20}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
                transition-colors
                duration-300
                group-focus-within:text-indigo-600
              "
            />
          )}

          <input
            ref={ref}
            {...props}
            className={`
              h-14
              w-full
              rounded-2xl
              border
              border-slate-300
              bg-white
              px-4
              ${Icon ? "pl-12" : ""}
              text-slate-900
              placeholder:text-slate-400
              transition-all
              duration-300
              outline-none

              focus:border-indigo-500
              focus:ring-4
              focus:ring-indigo-100

              disabled:cursor-not-allowed
              disabled:bg-slate-100

              ${className}
            `}
          />
        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

AppInput.displayName = "AppInput";

export default AppInput;