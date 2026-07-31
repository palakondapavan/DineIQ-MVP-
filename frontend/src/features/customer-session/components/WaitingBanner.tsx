import { Clock3 } from "lucide-react";

export default function WaitingBanner() {
  return (
    <div className="border-b border-amber-200 bg-amber-50">

      <div className="mx-auto flex max-w-7xl items-start gap-4 p-4">

        <div className="rounded-full bg-amber-100 p-2">
          <Clock3
            size={22}
            className="text-amber-600"
          />
        </div>

        <div>

          <h2 className="font-semibold text-amber-900">
            Waiting for waiter approval
          </h2>

          <p className="mt-1 text-sm text-amber-700">
            You can browse the menu while waiting.
            Ordering will be enabled once your
            table has been opened by a waiter.
          </p>

        </div>

      </div>

    </div>
  );
}