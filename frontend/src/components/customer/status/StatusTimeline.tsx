import {
  CheckCircle2,
  LoaderCircle,
  Lock,
} from "lucide-react";

export default function StatusTimeline() {
  return (
    <div>

      <div className="flex items-center">

        <div className="flex flex-col items-center">

          <CheckCircle2 className="h-7 w-7 text-green-500" />

          <span className="mt-2 text-xs font-medium">
            Request
          </span>

        </div>

        <div className="mx-4 h-1 flex-1 rounded-full bg-green-500" />

        <div className="flex flex-col items-center">

          <LoaderCircle className="h-7 w-7 animate-spin text-blue-600" />

          <span className="mt-2 text-xs font-medium">
            Activation
          </span>

        </div>

        <div className="mx-4 h-1 flex-1 rounded-full bg-slate-200" />

        <div className="flex flex-col items-center">

          <Lock className="h-7 w-7 text-slate-400" />

          <span className="mt-2 text-xs font-medium">
            Order
          </span>

        </div>

      </div>

    </div>
  );
}