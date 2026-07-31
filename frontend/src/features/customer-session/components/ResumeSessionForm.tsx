import { motion } from "framer-motion";
import {
  ArrowRight,
  Phone,
  UtensilsCrossed,
} from "lucide-react";

import { useResumeSession } from "../hooks/useResumeSession";

interface ResumeSessionFormProps {
  tableId: number;
}

export default function ResumeSessionForm({
  tableId,
}: ResumeSessionFormProps) {
  const {
    register,
    formState: { errors },
    onSubmit,
    isLoading,
    serverError,
  } = useResumeSession(tableId);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-5 py-10">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md"
      >
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-10 text-center text-white">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <UtensilsCrossed size={30} />
            </div>

            <h1 className="text-3xl font-bold">
              Resume Session
            </h1>

            <p className="mt-2 text-indigo-100">
              Continue your dining experience
            </p>

            <div className="mt-6 inline-flex rounded-full bg-white/15 px-5 py-2 backdrop-blur">
              <span className="font-semibold">
                Table #{tableId}
              </span>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={onSubmit}
            className="space-y-6 p-8"
          >
            {/* Mobile */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Mobile Number
              </label>

              <div className="relative">
                <Phone
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />

                <input
                  {...register("customer_mobile")}
                  disabled={isLoading}
                  placeholder="Enter your mobile number"
                  className="h-14 w-full rounded-xl border border-slate-300 pl-12 pr-4 outline-none transition-all focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {errors.customer_mobile && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.customer_mobile.message}
                </p>
              )}
            </div>

            {/* Server Error */}
            {serverError && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {serverError}
              </div>
            )}

            {/* Button */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-base font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Resuming...
                </>
              ) : (
                <>
                  Resume Session
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>

            <p className="text-center text-sm text-slate-500">
              Enter the mobile number used while requesting
              this table.
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}