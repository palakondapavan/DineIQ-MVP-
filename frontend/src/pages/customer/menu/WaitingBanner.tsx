export default function WaitingBanner() {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">

      <h2 className="font-semibold text-amber-700">
        Waiting for waiter approval
      </h2>

      <p className="mt-1 text-sm text-amber-600">
        You can browse the menu and prepare your cart.
        Ordering will be enabled after approval.
      </p>

    </div>
  );
}