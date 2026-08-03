import {
  CheckCircle2,
} from "lucide-react";

import {
  Link,
} from "react-router-dom";

export default function ThankYouPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">

      <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-xl">

        <CheckCircle2
          size={72}
          className="mx-auto text-emerald-500"
        />

        <h1 className="mt-6 text-3xl font-bold">
          Payment Successful
        </h1>

        <p className="mt-3 text-slate-500">
          Thank you for dining with us.
          Your session has been closed.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-emerald-600 font-semibold text-white transition hover:bg-emerald-700"
        >
          Done
        </Link>

      </div>

    </div>
  );
}