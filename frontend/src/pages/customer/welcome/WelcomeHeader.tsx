import { UtensilsCrossed } from "lucide-react";
import { motion } from "framer-motion";

interface WelcomeHeaderProps {
  tableId: number;
}

export default function WelcomeHeader({
  tableId,
}: WelcomeHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-5 text-center"
    >
      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-xl">
        <UtensilsCrossed size={38} />
      </div>

      <div>
        <h1 className="text-3xl font-bold">
          Golden Bawarchi
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome to DineIQ
        </p>
      </div>

      <div className="inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
        🍽 Table {tableId}
      </div>
    </motion.div>
  );
}