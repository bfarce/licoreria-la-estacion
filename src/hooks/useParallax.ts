import { useEffect, useRef, useState } from "react";

/**
 * Hook de efecto parallax ultra suave para imágenes de fondo y elementos decorativos.
 * Utiliza requestAnimationFrame para garantizar 60-120fps fluidos al hacer scroll.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(speed: number = 0.15) {
  const ref = useRef<T | null>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    let animationFrameId: number;

    const updateParallax = () => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Solo calcular si está cerca o dentro del viewport
      if (rect.top < windowHeight + 150 && rect.bottom > -150) {
        const center = rect.top + rect.height / 2 - windowHeight / 2;
        setOffsetY(center * speed * -1);
      }
    };

    const onScroll = () => {
      animationFrameId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateParallax();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [speed]);

  return {
    ref,
    offsetY,
    style: {
      transform: `translate3d(0, ${offsetY.toFixed(2)}px, 0) scale(1.08)`,
      willChange: "transform",
      transition: "transform 0.1s linear",
    },
  };
}
