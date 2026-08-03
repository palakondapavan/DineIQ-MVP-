import type {
  CustomerBill,
} from "../types/customerBill.types";

interface Props {
  bill: CustomerBill;
}

export default function BillFooter({
  bill,
}: Props) {

  return (

    <>

      <div className="space-y-3">

        <div className="flex justify-between">

          <span>Subtotal</span>

          <span>
            ₹{bill.subtotal}
          </span>

        </div>

        <div className="flex justify-between">

          <span>GST</span>

          <span>
            ₹{bill.gst}
          </span>

        </div>

        <div className="flex justify-between">

          <span>Discount</span>

          <span>
            ₹{bill.discount}
          </span>

        </div>

      </div>

      <div className="mt-5 border-t pt-5">

        <div className="flex justify-between">

          <span className="text-lg font-bold">

            Grand Total

          </span>

          <span className="text-3xl font-black text-emerald-600">

            ₹{bill.grand_total}

          </span>

        </div>

      </div>

    </>

  );

}