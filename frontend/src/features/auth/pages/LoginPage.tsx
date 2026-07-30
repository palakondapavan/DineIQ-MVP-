import { motion } from "framer-motion";

import { LoginCard } from "../components/LoginCard";
import { LoginHeader } from "../components/LoginHeader";
import { LoginForm } from "../components/LoginForm";
import { AuthShowcase } from "../components/AuthShowcase";

export default function LoginPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-100">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[30rem] w-[30rem] rounded-full bg-blue-400/20 blur-3xl" />
      </div>

      {/* Content */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="
            grid
            w-full
            max-w-7xl
            overflow-hidden
            rounded-[32px]
            border
            border-white/50
            bg-white/70
            shadow-2xl
            backdrop-blur-xl
            lg:grid-cols-2
          "
        >
          {/* Left Side */}
          <AuthShowcase />

          {/* Right Side */}
          <div className="flex items-center justify-center bg-white p-8 md:p-12 xl:p-16">
            <LoginCard>
              <LoginHeader />
              <LoginForm />
            </LoginCard>
          </div>
        </motion.div>
      </section>
    </main>
  );
}