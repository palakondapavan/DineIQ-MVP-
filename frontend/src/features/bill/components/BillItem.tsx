import type {
  CustomerBillItem,
} from "../types/customerBill.types";

interface Props {
  item: CustomerBillItem;
}

export default function BillItem({
  item,
}: Props) {

  return (

    <div className="flex justify-between rounded-2xl bg-slate-50 p-4">

      <div>

        <h4 className="font-semibold">

          {item.item_name}

        </h4>

        {item.variant_name && (

          <p className="text-sm text-slate-500">

            {item.variant_name}

          </p>

        )}

        <p className="mt-1 text-sm text-slate-500">

          ₹{item.unit_price}
          ×
          {item.quantity}

        </p>

      </div>

      <span className="font-bold">

        ₹{item.subtotal}

      </span>

    </div>

  );

}