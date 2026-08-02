import {
  Clock3,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

interface MenuHeaderProps {
  customerName: string;
  tableId: number;
}

export default function MenuHeader({
  customerName,
  tableId,
}: MenuHeaderProps) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : "Good Evening";

  return (
    <div
      className="
        group
        relative
        overflow-hidden

        rounded-[30px]

        bg-gradient-to-br
        from-indigo-700
        via-blue-600
        to-cyan-500

        p-7

        text-white

        shadow-2xl
        shadow-indigo-500/25
      "
    >
      {/* Animated Glow */}
      <div
        className="
          absolute
          -right-16
          -top-16

          h-52
          w-52

          rounded-full

          bg-white/10

          blur-3xl

          transition-transform
          duration-700

          group-hover:scale-110
        "
      />

      <div
        className="
          absolute
          -bottom-20
          -left-10

          h-40
          w-40

          rounded-full

          bg-cyan-300/20

          blur-3xl
        "
      />

      {/* Decorative Particles */}

      <div className="absolute left-20 top-10 h-2 w-2 animate-pulse rounded-full bg-white/60" />

      <div className="absolute right-36 top-8 h-1.5 w-1.5 animate-pulse rounded-full bg-white/70" />

      <div className="absolute bottom-10 right-24 h-2 w-2 animate-pulse rounded-full to-purple-200/70" />

      {/* Content */}

      <div className="relative z-10 flex items-center justify-between">
        {/* Left */}

        <div>
          <div className="flex items-center gap-2 text-indigo-100">
            <Sparkles size={16} />

            <span className="text-sm font-medium">
              {greeting}
            </span>
          </div>

          <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
            {customerName}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            {/* Table */}

            <div
              className="
                flex
                items-center
                gap-2

                rounded-full

                border
                border-white/20

                bg-white/10

                px-4
                py-2

                text-sm

                backdrop-blur-xl
              "
            >
              <UtensilsCrossed size={16} />

              Table #{tableId}
            </div>

            {/* Session */}

            <div
              className="
                flex
                items-center
                gap-2

                rounded-full

                border
                border-emerald-300/30

                bg-emerald-400/15

                px-4
                py-2

                text-sm

                backdrop-blur-xl
              "
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />

              Dining Now
            </div>

            {/* Time */}

            <div
              className="
                flex
                items-center
                gap-2

                rounded-full

                border
                border-white/20

                bg-white/10

                px-4
                py-2

                text-sm

                backdrop-blur-xl
              "
            >
              <Clock3 size={15} />

              Enjoy your meal
            </div>
          </div>
        </div>

        {/* Right */}

        <div
          className="
            relative

            flex
            h-24
            w-24

            items-center
            justify-center

            rounded-[28px]

            border
            border-white/20

            bg-white/10

            backdrop-blur-xl

            shadow-xl

            transition-all
            duration-500

            group-hover:rotate-6
            group-hover:scale-105
          "
        >
          <div
            className="
              absolute
              inset-0

              rounded-[28px]

              bg-gradient-to-br

              from-white/15

              to-transparent
            "
          />

          <UtensilsCrossed
            size={42}
            className="relative"
          />
        </div>
      </div>
    </div>
  );
}