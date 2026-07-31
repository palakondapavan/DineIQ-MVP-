import { motion } from "framer-motion";

import type { Category } from "../types";

interface CategoryTabsProps {
  categories: Category[];
  selectedCategoryId: number | null;
  onCategoryChange: (categoryId: number | null) => void;
}

export default function CategoryTabs({
  categories,
  selectedCategoryId,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="mb-8">
      <div
        className="
          flex
          gap-3
          overflow-x-auto
          pb-2
          scrollbar-none
        "
      >
        {/* All Categories */}

        <CategoryButton
          label="All"
          active={selectedCategoryId === null}
          onClick={() => onCategoryChange(null)}
        />

        {/* Dynamic Categories */}

        {categories.map((category) => (
          <CategoryButton
            key={category.id}
            label={category.name}
            active={selectedCategoryId === category.id}
            onClick={() => onCategoryChange(category.id)}
          />
        ))}
      </div>
    </div>
  );
}

interface CategoryButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

function CategoryButton({
  label,
  active,
  onClick,
}: CategoryButtonProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.15 }}
      className={`
        relative
        whitespace-nowrap
        rounded-full
        px-5
        py-3
        text-sm
        font-semibold
        transition-all
        duration-200
        focus:outline-none
        focus:ring-4
        focus:ring-indigo-100

        ${
          active
            ? "bg-indigo-600 text-white shadow-lg"
            : "border border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50"
        }
      `}
    >
      {label}

      {active && (
        <motion.div
          layoutId="active-category-tab"
          className="
            absolute
            inset-0
            -z-10
            rounded-full
            bg-indigo-600
          "
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 28,
          }}
        />
      )}
    </motion.button>
  );
}