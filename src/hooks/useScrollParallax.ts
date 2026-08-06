import { useEffect, useRef } from "react";

interface ScrollParallaxOptions {
  /** Speed ratio relative to scroll movement. Default: 0.22 */
  speed?: number;
  /** Scale factor to prevent empty edges when translating. Default: 1.15 */
  scale?: number;
}

/**
 * High-performance scroll parallax hook.
 * Translates the target background element smoothly ONLY when the page is being scrolled.
 * Uses requestAnimationFrame & IntersectionObserver for 120fps efficiency without React re-renders.
 */
export function useScrollParallax<T extends HTMLElement = HTMLImageElement>({
  speed = 0.22,
  scale = 1.15,
}: ScrollParallaxOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId: number | null = null;
    let isIntersecting = false;

    // Ensure container hides overflow and sets rendering hints
    el.style.willChange = "transform";

    const updateTransform = () => {
      if (!el || !isIntersecting) return;

      const parent = el.parentElement || el;
      const rect = parent.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      // Distance from center of viewport
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distanceFromCenter = sectionCenter - viewportCenter;

      // Subtle vertical offset based on scroll position
      const yOffset = distanceFromCenter * -speed;

      // Smooth GPU accelerated 3D transform (translate3d + scale)
      el.style.transform = `translate3d(0, ${yOffset.toFixed(2)}px, 0) scale(${scale})`;
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        updateTransform();
        rafId = null;
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting = entry.isIntersecting;
          if (isIntersecting) {
            updateTransform();
          }
        });
      },
      { threshold: 0 },
    );

    const parent = el.parentElement || el;
    observer.observe(parent);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    // Initial position calculation
    updateTransform();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [speed, scale]);

  return ref;
}
