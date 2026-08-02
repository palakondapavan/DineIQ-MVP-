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
    <div className="relative">
      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/15 via-cyan-400/15 to-blue-500/15 blur-xl" />

      {/* Search Box */}
      <div
        className="
          group
          relative
          flex
          h-16
          items-center

          rounded-2xl

          border
          border-white/70

          bg-white/80

          backdrop-blur-xl

          shadow-lg
          shadow-slate-200/60

          transition-all
          duration-300


          hover:shadow-xl
          hover:shadow-indigo-200/40

          focus-within:border-indigo-300
          focus-within:ring-4
          focus-within:ring-indigo-100
        "
      >
        {/* Search Icon */}
        <div
          className="
            ml-5

            flex
            h-11
            w-11

            items-center
            justify-center

            rounded-xl

            bg-gradient-to-br
            from-indigo-500
            via-blue-500
            to-cyan-500

            text-white

            shadow-md

            transition-transform
            duration-300

            group-focus-within:scale-110
          "
        >
          <Search size={20} />
        </div>

        {/* Input */}
        <input
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder="Search delicious food..."
          className="
            flex-1

            bg-transparent

            px-5

            text-base
            font-medium

            text-slate-800

            placeholder:text-slate-400

            outline-none
          "
        />

        {/* Clear */}
        {value && (
          <button
            onClick={() =>
              onChange("")
            }
            className="
              mr-4

              flex
              h-9
              w-9

              items-center
              justify-center

              rounded-full

              bg-slate-100

              text-slate-500

              transition-all

              hover:bg-red-100
              hover:text-red-500
            "
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}