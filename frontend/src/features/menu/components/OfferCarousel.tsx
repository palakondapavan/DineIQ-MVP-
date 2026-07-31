import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Percent } from "lucide-react";

import AppButton from "@/shared/components/ui/AppButton";

import type { Offer } from "../types";

interface OfferCarouselProps {
  offers: Offer[];
  autoPlay?: boolean;
  interval?: number;
}

export default function OfferCarousel({
  offers,
  autoPlay = true,
  interval = 5000,
}: OfferCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoPlay || offers.length <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % offers.length);
    }, interval);

    return () => clearInterval(timer);
  }, [offers.length, autoPlay, interval]);

  if (offers.length === 0) {
    return null;
  }

  const previous = () =>
    setCurrent((prev) => (prev - 1 + offers.length) % offers.length);

  const next = () =>
    setCurrent((prev) => (prev + 1) % offers.length);

  const offer = offers[current];

  return (
    <section className="relative mb-8 overflow-hidden rounded-3xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={offer.id}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.35 }}
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-gradient-to-r
            from-indigo-600
            via-blue-600
            to-cyan-500
            p-8
            text-white
          "
        >
          {/* Background Glow */}

          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                <Percent size={16} />
                Special Offer
              </div>

              <h2 className="text-3xl font-bold">
                {offer.title}
              </h2>

              <p className="mt-3 text-white/90">
                {offer.description}
              </p>

              <div className="mt-6">
                <AppButton
                  variant="outline"
                  fullWidth={false}
                  className="border-white bg-white text-indigo-700 hover:bg-slate-100"
                >
                  Explore Menu
                </AppButton>
              </div>
            </div>

            {offer.image_url && (
              <img
                src={offer.image_url}
                alt={offer.title}
                className="
                  h-56
                  w-56
                  rounded-3xl
                  object-cover
                  shadow-2xl
                "
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}

      {offers.length > 1 && (
        <>
          <button
            type="button"
            onClick={previous}
            aria-label="Previous offer"
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              rounded-full
              bg-white/20
              p-3
              text-white
              backdrop-blur
              transition
              hover:bg-white/30
            "
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next offer"
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              rounded-full
              bg-white/20
              p-3
              text-white
              backdrop-blur
              transition
              hover:bg-white/30
            "
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots */}

          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
            {offers.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to offer ${index + 1}`}
                onClick={() => setCurrent(index)}
                className={`
                  h-2.5
                  rounded-full
                  transition-all
                  ${
                    index === current
                      ? "w-8 bg-white"
                      : "w-2.5 bg-white/50"
                  }
                `}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}