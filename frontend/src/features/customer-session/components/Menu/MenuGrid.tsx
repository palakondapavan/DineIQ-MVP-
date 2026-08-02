import { motion } from "framer-motion";

import MenuCard from "./MenuCard";

import type { MenuItem } from "../../types/customerMenu.types";

interface MenuGridProps {
  items: MenuItem[];
}

export default function MenuGrid({
  items,
}: MenuGridProps) {
  if (items.length === 0) {
    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          relative
          overflow-hidden

          rounded-[32px]

          border
          border-white/60

          bg-white/80

          p-16

          text-center

          backdrop-blur-xl

          shadow-2xl
          shadow-slate-200/60
        "
      >
        {/* Background Glow */}

        <div
          className="
            absolute

            -right-16
            -top-16

            h-52
            w-52

            rounded-full

            bg-indigo-300/20

            blur-3xl
          "
        />

        <div
          className="
            absolute

            -bottom-20
            -left-16

            h-48
            w-48

            rounded-full

            bg-cyan-300/20

            blur-3xl
          "
        />

        <div className="relative">
          <div className="mb-5 text-7xl">
            🍽️
          </div>

          <h3 className="text-2xl font-bold text-slate-800">
            Nothing Found
          </h3>

          <p className="mt-3 text-slate-500">
            Try searching another dish
            or choose a different
            category.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="
        grid

        gap-7

        sm:grid-cols-2

        xl:grid-cols-3

        2xl:grid-cols-4
      "
    >
      {items.map(
        (
          item,
          index
        ) => (
          <motion.div
            key={item.item_id}
            layout

            initial={{
              opacity: 0,
              y: 40,
              scale: 0.95,
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}

            transition={{
              delay:
                index * 0.05,

              duration: 0.35,

              type: "spring",

              stiffness: 300,

              damping: 24,
            }}
          >
            <MenuCard
              item={item}
            />
          </motion.div>
        )
      )}
    </motion.div>
  );
}