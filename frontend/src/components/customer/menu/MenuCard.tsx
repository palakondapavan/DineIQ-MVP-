import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import VariantDialog from "./VariantDialog";

import type { MenuItem } from "@/types/customerMenu";

interface Props {
  item: MenuItem;
}

export default function MenuCard({ item }: Props) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const lowestPrice =
    item.variants.length > 0
      ? Math.min(...item.variants.map((v) => v.price))
      : 0;

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        className="overflow-hidden rounded-2xl border bg-white shadow-sm transition"
      >
        {/* Image */}
        <div className="aspect-[4/3] bg-slate-100">
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={item.item_name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-400">
              No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-3 p-4">
          <div>
            <h3 className="text-lg font-semibold">
              {item.item_name}
            </h3>

            {item.description && (
              <p className="mt-1 text-sm text-slate-500 line-clamp-2">
                {item.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-bold">
                ₹{lowestPrice}
              </p>

              {item.variants.length > 1 && (
                <p className="text-xs text-slate-500">
                  onwards
                </p>
              )}
            </div>

            <Button
              disabled={!item.is_available}
              onClick={() => setDialogOpen(true)}
            >
              {item.is_available ? "ADD" : "Unavailable"}
            </Button>
          </div>
        </div>
      </motion.div>

      <VariantDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        item={item}
      />
    </>
  );
}