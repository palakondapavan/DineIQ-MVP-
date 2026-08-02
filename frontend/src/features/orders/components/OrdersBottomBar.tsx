import { useNavigate } from "react-router-dom";

import {
  Package,
  ChevronRight,
} from "lucide-react";

interface Props {
  count?: number;
}

export default function OrdersBottomBar({
  count = 0,
}: Props) {
  const navigate = useNavigate();

  return (
    <div className="sticky bottom-0 z-40 border-t bg-white p-4 shadow-2xl">
        <button
        onClick={() =>
            navigate("/customer/orders")
        }
        className="
            group
            relative
            overflow-hidden

            flex
            h-16
            w-full
            items-center
            justify-between

            rounded-3xl

            border
            border-white/70

            bg-white/80
            backdrop-blur-xl

            px-5

            shadow-xl
            shadow-slate-200/70

            transition-all
            duration-300

            hover:-translate-y-1
            hover:shadow-2xl
            hover:shadow-indigo-200/50

            active:scale-[0.99]
        "
        >
        {/* Shine Animation */}
        <div
            className="
            absolute
            inset-0
            -translate-x-full
            bg-gradient-to-r
            from-transparent
            via-white/50
            to-transparent

            transition-transform
            duration-1000

            group-hover:translate-x-full
            "
        />

        {/* Bottom Accent */}
        <div
            className="
            absolute
            bottom-0
            left-0

            h-1
            w-full

            bg-gradient-to-r
            from-violet-500
            via-indigo-500
            to-cyan-400
            "
        />

        {/* Left */}
        <div className="relative z-10 flex items-center">
            <div
            className="
                flex
                h-12
                w-12
                items-center
                justify-center

                rounded-2xl

                bg-gradient-to-br
                from-violet-500
                via-indigo-500
                to-blue-600

                text-white

                shadow-lg
                shadow-indigo-300/40

                transition-all
                duration-300

                group-hover:rotate-6
                group-hover:scale-110
            "
            >
            <Package size={22} />
            </div>

            <div className="ml-4 text-left">
            <h3 className="text-base font-bold text-slate-900">
                Your Orders
            </h3>

            <p className="text-sm text-slate-500">
                Track live order status
            </p>
            </div>
        </div>

        {/* Right */}
        <div className="relative z-10 flex items-center gap-3">
            {count > 0 && (
            <span
                className="
                rounded-full

                bg-violet-100

                px-3
                py-1

                text-sm
                font-semibold

                text-violet-700
                "
            >
                {count} Orders
            </span>
            )}

            <ChevronRight
            size={20}
            className="
                text-slate-500

                transition-all
                duration-300

                group-hover:translate-x-1
            "
            />
        </div>
        </button> 
   </div>
  );
}