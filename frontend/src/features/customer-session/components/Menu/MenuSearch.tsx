import { Search, X } from "lucide-react";

interface MenuSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MenuSearch({
  value,
  onChange,
}: MenuSearchProps) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder="Search dishes..."
          className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-12 pr-12 text-slate-700 outline-none transition-all focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
        />

        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 transition hover:bg-slate-100"
          >
            <X
              size={18}
              className="text-slate-500"
            />
          </button>
        )}
      </div>
    </div>
  );
}