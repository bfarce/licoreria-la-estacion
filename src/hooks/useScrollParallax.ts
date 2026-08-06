import { useEffect, useRef } from "react";

interface ScrollParallaxOptions {
  /** Speed ratio relative to scroll movement. Default: 0.14 */
  speed?: number;
  /** Scale factor to prevent empty edges when translating. Default: 1.15 */
  scale?: number;
  /** Damping factor for smooth physical inertia (0.05 to 0.15). Default: 0.08 */
  damp?: number;
}

/**
 * High-performance, silky-smooth Lerp Scroll Parallax hook.
 * Uses Linear Interpolation (Lerp) to smoothly glide background images with fluid inertia
 * as the user scrolls, delivering a premium $10,000 Studio luxury parallax effect.
 */
export function useScrollParallax<T extends HTMLElement = HTMLImageElement>({
  speed = 0.14,
  scale = 1.15,
  damp = 0.08,
}: ScrollParallaxOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rafId: number | null = null;
    let isVisible = false;

    let targetY = 0;
    let currentY = 0;

    el.style.willChange = "transform";

    const calculateTarget = () => {
      const parent = el.parentElement || el;
      const rect = parent.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      // Distance of section center from viewport center
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const distanceFromCenter = sectionCenter - viewportCenter;

      // Calculate subtle target offset based on scroll position
      targetY = distanceFromCenter * -speed;
    };

    const animate = () => {
      if (!isVisible) return;

      // Lerp formula: current = current + (target - current) * damp
      const diff = targetY - currentY;

      if (Math.abs(diff) > 0.005) {
        currentY += diff * damp;
        // Smooth GPU accelerated 3D transform
        el.style.transform = `translate3d(0, ${currentY.toFixed(2)}px, 0) scale(${scale})`;
        rafId = requestAnimationFrame(animate);
      } else {
        currentY = targetY;
        el.style.transform = `translate3d(0, ${currentY.toFixed(2)}px, 0) scale(${scale})`;
        rafId = null;
      }
    };

    const triggerAnimation = () => {
      calculateTarget();
      if (rafId === null && isVisible) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            triggerAnimation();
          } else if (rafId !== null) {
            cancelAnimationFrame(rafId);
            rafId = null;
          }
        });
      },
      { threshold: 0 },
    );

    const parent = el.parentElement || el;
    observer.observe(parent);

    window.addEventListener("scroll", triggerAnimation, { passive: true });
    window.addEventListener("resize", triggerAnimation, { passive: true });

    // Initial position setup
    triggerAnimation();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", triggerAnimation);
      window.removeEventListener("resize", triggerAnimation);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [speed, scale, damp]);

  return ref;
}
