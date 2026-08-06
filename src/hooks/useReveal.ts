import { useEffect, useRef, useState } from "react";

export type RevealVariant = "up" | "scale" | "left" | "right" | "fade";

type RevealOptions = {
  delay?: number;
  variant?: RevealVariant;
  threshold?: number;
  rootMargin?: string;
};

const VARIANTS: Record<RevealVariant, string> = {
  up: "reveal-up",
  scale: "reveal-scale",
  left: "reveal-left",
  right: "reveal-right",
  fade: "reveal-fade",
};

/** Revela un elemento al entrar en viewport con transición fluida y natural. */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: number | RevealOptions = 0,
) {
  const {
    delay = 0,
    variant = "up",
    threshold = 0.1,
    rootMargin = "0px 0px -70px 0px",
  } = typeof options === "number" ? { delay: options } : options;

  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          timer = window.setTimeout(() => setVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [delay, threshold, rootMargin]);

  const base = VARIANTS[variant];

  return {
    ref,
    visible,
    className: visible ? `${base} reveal-in` : base,
    style: delay > 0 ? { transitionDelay: `${delay}ms` } : undefined,
  };
}
