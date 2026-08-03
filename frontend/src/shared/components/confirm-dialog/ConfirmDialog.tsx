import {
  useEffect,
  useRef,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Trash2,
} from "lucide-react";

import type {
  ConfirmOptions,
} from "./types";

interface Props {
  open: boolean;
  options: ConfirmOptions | null;

  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  options,
  onConfirm,
  onCancel,
}: Props) {
  const cardRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(
      event: KeyboardEvent
    ) {
      if (event.key === "Escape") {
        onCancel();
      }
    }

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [open, onCancel]);

  function handleBackdropClick(
    event: React.MouseEvent
  ) {
    if (
      event.target === event.currentTarget
    ) {
      onCancel();
    }
  }

  if (!options) {
    return null;
  }

  const variant =
    options.variant ?? "default";

  const config = {
    danger: {
      icon: Trash2,

      iconBg:
        "from-rose-500 to-red-600",

      confirm:
        "from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700",
    },

    warning: {
      icon: AlertTriangle,

      iconBg:
        "from-amber-400 to-orange-500",

      confirm:
        "from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700",
    },

    success: {
      icon: CheckCircle2,

      iconBg:
        "from-emerald-500 to-green-600",

      confirm:
        "from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700",
    },

    default: {
      icon: Info,

      iconBg:
        "from-indigo-500 to-violet-600",

      confirm:
        "from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700",
    },
  }[variant];

  const Icon = config.icon;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.2,
          }}
          onClick={
            handleBackdropClick
          }
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-5 backdrop-blur-md"
        >
          <motion.div
            ref={cardRef}
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 25,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 15,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 22,
            }}
            className="w-full max-w-md rounded-[32px] border border-white/40 bg-white/90 p-8 shadow-2xl backdrop-blur-xl"
          >
            {/* Icon */}

            <motion.div
              initial={{
                scale: 0.7,
              }}
              animate={{
                scale: 1,
              }}
              transition={{
                delay: 0.15,
                type: "spring",
              }}
              className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${config.iconBg} text-white shadow-xl`}
            >
              <Icon size={34} />
            </motion.div>

            {/* Title */}

            <h2 className="mt-6 text-center text-2xl font-bold text-slate-900">
              {options.title}
            </h2>

            {/* Description */}

            {options.description && (
              <p className="mt-3 text-center text-sm leading-6 text-slate-500">
                {options.description}
              </p>
            )}

            {/* Buttons */}

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
                <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onCancel}
                className="h-14 flex-1 rounded-2xl border border-slate-200 bg-white font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                {options.cancelText ?? "Cancel"}
                </motion.button>

                <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onConfirm}
                className={`h-14 flex-1 rounded-2xl bg-gradient-to-r ${config.confirm} font-semibold text-white shadow-lg transition`}
                >
                {options.confirmText ?? "Confirm"}
                </motion.button>


            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}