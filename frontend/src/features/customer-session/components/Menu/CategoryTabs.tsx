import { motion } from "framer-motion";

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
    <div className="overflow-x-auto">
      <div className="flex gap-3 py-2">
        {categories.map((category) => {
          const active =
            selectedCategory === category;

          return (
            <motion.button
              key={category}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelect(category)}
              className={[
                "whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                active
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-slate-700 shadow hover:bg-slate-100",
              ].join(" ")}
            >
              {category}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}