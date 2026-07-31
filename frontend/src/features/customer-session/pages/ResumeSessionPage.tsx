import { useParams } from "react-router-dom";

import ResumeSessionForm from "@/features/customer-session/components/ResumeSessionForm";

export default function ResumeSessionPage() {
  const { tableId } = useParams<{ tableId: string }>();

  if (!tableId || Number.isNaN(Number(tableId))) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl border border-red-200 bg-white p-8 shadow-lg">
          <h2 className="text-xl font-semibold text-red-600">
            Invalid QR Code
          </h2>

          <p className="mt-2 text-slate-600">
            The scanned table QR code is invalid.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ResumeSessionForm tableId={Number(tableId)} />
  );
}