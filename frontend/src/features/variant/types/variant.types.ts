export interface Variant {
  variant_id: number;

  variant_name: string;

  price: number;
}

export interface SelectedVariant {
  variant: Variant | null;
}

export interface VariantSelectorState {
  isOpen: boolean;

  selected: Variant | null;
}