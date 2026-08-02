import { useCart } from "../hooks/useCart";

import CartItem from "./CartItem";

export default function CartList() {
  const { items } = useCart();

  return (
    <div className="space-y-5 p-5">
      {items.map((item) => (
        <CartItem
          key={`${item.item_id}-${item.variant_id}`}
          item={item}
        />
      ))}
    </div>
  );
}