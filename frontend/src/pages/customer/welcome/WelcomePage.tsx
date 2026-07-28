import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

import WelcomeHeader from "./WelcomeHeader";
import WelcomeForm from "./WelcomeForm";

export default function WelcomePage() {
  const { tableId } = useParams();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-5">

      {/* Background Blur */}

      <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-200 opacity-40 blur-3xl" />

      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-200 opacity-40 blur-3xl" />

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 shadow-2xl"
      >
        <WelcomeHeader tableId={Number(tableId)} />

        <WelcomeForm tableId={Number(tableId)} />
      </motion.section>
    </main>
  );
}