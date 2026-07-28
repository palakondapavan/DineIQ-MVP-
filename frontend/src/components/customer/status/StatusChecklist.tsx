import {
  CheckCircle2,
  Lock,
} from "lucide-react";

export default function StatusChecklist() {
  return (
    <div className="space-y-4">

      <div className="flex items-center gap-3">

        <CheckCircle2 className="text-green-500" />

        <span>Browse Menu</span>

      </div>

      <div className="flex items-center gap-3">

        <CheckCircle2 className="text-green-500" />

        <span>Add Items to Cart</span>

      </div>

      <div className="flex items-center gap-3">

        <Lock className="text-slate-400" />

        <span className="text-slate-500">
          Place Order (Locked until approval)
        </span>

      </div>

    </div>
  );
}