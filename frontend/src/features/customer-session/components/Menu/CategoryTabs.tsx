import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface CategoryTabsProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export default function CategoryTabs({
  categories,
  selectedCategory,
  onSelect,
}: CategoryTabsProps) {
  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-4 py-2 px-1">
        {categories.map((category) => {
          const active =
            selectedCategory === category;

          return (
            <motion.button
              key={category}
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.96,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 20,
              }}
              onClick={() =>
                onSelect(category)
              }
              className={`
                group
                relative
                overflow-hidden

                flex
                items-center
                gap-2

                whitespace-nowrap

                rounded-2xl

                px-5
                py-3

                text-sm
                font-semibold

                transition-all
                duration-300

                ${
                  active
                    ? `
                    bg-gradient-to-r
                    from-indigo-600
                    via-blue-600
                    to-blue-500

                    text-white

                    shadow-xl
                    shadow-indigo-300/40
                  `
                    : `
                    border
                    border-white/70

                    bg-white/80

                    text-slate-700

                    backdrop-blur-xl

                    shadow-md
                    shadow-slate-200/60

                    hover:bg-white
                    hover:shadow-xl
                    hover:shadow-indigo-100/50
                  `
                }
              `}
            >

              {/* Active Icon */}

              {active && (
                <Sparkles
                  size={15}
                  className="relative"
                />
              )}

              <span className="relative">
                {category}
              </span>

              {/* Active Indicator */}

              {active && (
                <motion.div
                  layoutId="category-dot"
                  className="
                    relative

                    h-2
                    w-2

                    rounded-full

                    bg-white
                  "
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}