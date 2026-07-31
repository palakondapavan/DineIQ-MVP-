import type { Variant } from "../types/variant.types";

export function hasVariants(
  variants: Variant[]
): boolean {
  return variants.length > 0;
}

export function hasMultipleVariants(
  variants: Variant[]
): boolean {
  return variants.length > 1;
}

export function getDefaultVariant(
  variants: Variant[]
): Variant | null {
  if (variants.length === 0) {
    return null;
  }

  return variants[0];
}

export function getVariantById(
  variants: Variant[],
  id: number
): Variant | null {
  return (
    variants.find(
      (variant) =>
        variant.variant_id === id
    ) ?? null
  );
}