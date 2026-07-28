import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import type {
  MenuItem,
  MenuVariant,
} from "@/types/customerMenu";

import { useCartStore } from "@/store/cartStore";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: MenuItem | null;
}

export default function VariantDialog({
  open,
  onOpenChange,
  item,
}: Props) {
  const addItem = useCartStore((state) => state.addItem);

  const [selectedVariant, setSelectedVariant] =
    useState<MenuVariant | null>(null);

  const [note, setNote] = useState("");

  if (!item) return null;

  const handleAdd = () => {
    if (!selectedVariant) return;

    addItem({
      item_id: item.item_id,
      item_name: item.item_name,

      variant_id: selectedVariant.variant_id,
      variant_name: selectedVariant.variant_name,

      unit_price: selectedVariant.price,

      quantity: 1,

      image_url: item.image_url,

      note,
    });

    setNote("");

    setSelectedVariant(null);

    onOpenChange(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md">

        <DialogHeader>

          <DialogTitle>
            {item.item_name}
          </DialogTitle>

        </DialogHeader>

        <div className="space-y-5">

          <div>

            <h3 className="mb-3 font-semibold">
              Choose Variant
            </h3>

            <div className="space-y-2">

              {item.variants.map((variant) => (

                <button
                  key={variant.variant_id}
                  onClick={() =>
                    setSelectedVariant(variant)
                  }
                  className={`flex w-full items-center justify-between rounded-xl border p-4 transition ${
                    selectedVariant?.variant_id ===
                    variant.variant_id
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200"
                  }`}
                >
                  <span>
                    {variant.variant_name}
                  </span>

                  <span className="font-semibold">
                    ₹{variant.price}
                  </span>

                </button>

              ))}

            </div>

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Special Instructions
            </label>

            <Textarea
              value={note}
              onChange={(e) =>
                setNote(e.target.value)
              }
              placeholder="Less spicy, no onion..."
            />

          </div>

          <Button
            disabled={!selectedVariant}
            onClick={handleAdd}
            className="w-full"
          >
            Add To Cart
          </Button>

        </div>

      </DialogContent>
    </Dialog>
  );
}