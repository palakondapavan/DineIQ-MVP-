import {
  useEffect,
  useState,
} from "react";

import type {
  RefObject,
} from "react";

export function useBillVisibility(
  ref: RefObject<HTMLElement | null>
) {
  const [
    visible,
    setVisible,
  ] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {

      if (!ref.current) {
        return;
      }

      const observer =
        new IntersectionObserver(
          ([entry]) => {
            setVisible(
              entry.isIntersecting
            );
          },
          {
            threshold: 0,
            rootMargin:
              "0px 0px -150px 0px",
          }
        );

      observer.observe(
        ref.current
      );

    }, 100);

    return () => {
      clearTimeout(timer);
    };

  }, []);

  return visible;
}