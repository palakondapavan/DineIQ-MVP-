import { useVariantContext } from "../context/VariantProvider";

export function useVariant() {
  return useVariantContext();
}