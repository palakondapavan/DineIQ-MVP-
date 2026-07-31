import { Search, X } from "lucide-react";

import AppInput from "@/shared/components/ui/AppInput";

interface MenuSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function MenuSearch({
  value,
  onChange,
  placeholder = "Search dishes...",
}: MenuSearchProps) {
  return (
    <div className="mb-8">
      <div className="relative">
        <AppInput
          label="Search Menu"
          icon={Search}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />

        {value.trim() && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => onChange("")}
            className="
              absolute
              right-4
              top-[3.3rem]
              -translate-y-1/2
              rounded-full
              p-1.5
              text-slate-400
              transition-colors
              hover:bg-slate-100
              hover:text-slate-700
            "
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}