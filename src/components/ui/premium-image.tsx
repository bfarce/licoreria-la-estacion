import { useState } from "react";
import { cn } from "@/lib/utils";

type PremiumImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  imgClassName?: string;
  /** Capa de degradado inferior para mejorar legibilidad del texto encima. */
  overlay?: boolean;
  priority?: boolean;
};

/**
 * Imagen con carga progresiva (blur-up), zoom suave y brillo diagonal al hover.
 * Preparada para recibir URLs reales de producto sin cambios adicionales.
 */
export function PremiumImage({
  src,
  alt,
  width,
  height,
  className,
  imgClassName,
  overlay = false,
  priority = false,
}: PremiumImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("media-frame", className)}>
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 z-[1] bg-[var(--gradient-dark)] transition-opacity duration-700",
          loaded ? "opacity-0" : "opacity-100",
        )}
      >
        <div className="glow-pulse absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_40%,color-mix(in_oklab,var(--gold)_14%,transparent),transparent_70%)]" />
      </div>

      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover",
          loaded ? "img-loaded" : "img-loading",
          imgClassName,
        )}
      />

      {overlay ? (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(to_top,oklch(0.1_0_0/0.85),oklch(0.1_0_0/0.15)_55%,transparent)]"
        />
      ) : null}
    </div>
  );
}
