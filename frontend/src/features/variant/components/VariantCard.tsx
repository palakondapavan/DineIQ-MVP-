import type { Variant } from "../types/variant.types";

interface Props {
  variant: Variant;

  selected: boolean;

  onSelect: (
    variant: Variant
  ) => void;
}

export default function VariantCard({
  variant,
  selected,
  onSelect,
}: Props) {
  return (
    <button
      onClick={() =>
        onSelect(variant)
      }
      className={`w-full rounded-xl border p-4 text-left transition ${
        selected
          ? "border-indigo-600 bg-indigo-50"
          : "border-slate-200 bg-white hover:border-indigo-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-medium">
          {variant.variant_name}
        </span>

        <span className="font-bold">
          ₹{variant.price}
        </span>
      </div>
    </button>
  );
}