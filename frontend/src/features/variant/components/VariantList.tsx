import VariantCard from "./VariantCard";

import type { Variant } from "../types/variant.types";

interface Props {
  variants: Variant[];

  selectedId: number | null;

  onSelect: (
    variant: Variant
  ) => void;
}

export default function VariantList({
  variants,
  selectedId,
  onSelect,
}: Props) {
  return (
    <div className="space-y-3">
      {variants.map((variant) => (
        <VariantCard
          key={variant.variant_id}
          variant={variant}
          selected={
            selectedId ===
            variant.variant_id
          }
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}