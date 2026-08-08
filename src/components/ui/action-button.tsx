import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { externalClick } from "@/config/site";

type Variant = "gold" | "outline" | "whatsapp";
type Size = "md" | "lg" | "xl";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-wide transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background text-center";

const variants: Record<Variant, string> = {
  gold: "bg-[image:var(--gradient-gold)] bg-[length:200%_auto] bg-left text-primary-foreground shadow-[var(--shadow-gold)] hover:bg-right hover:-translate-y-0.5",
  outline:
    "border border-gold/40 text-foreground hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5",
  whatsapp:
    "bg-whatsapp/15 border border-whatsapp/50 text-whatsapp hover:bg-whatsapp hover:text-background hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  md: "min-h-[2.75rem] px-5 sm:px-6 text-sm py-2.5 sm:py-0 leading-snug sm:h-11",
  lg: "min-h-[3.25rem] px-5 sm:px-8 text-sm sm:text-base py-3 sm:py-0 leading-snug sm:h-14",
  xl: "min-h-[3.5rem] px-6 sm:px-10 text-base sm:text-lg py-3.5 sm:py-0 leading-snug sm:h-16",
};

interface Props {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  ariaLabel?: string;
}

/** Botón de acción que abre WhatsApp (o cualquier enlace) en pestaña nueva. */
export function ActionButton({
  href,
  children,
  variant = "gold",
  size = "md",
  className,
  ariaLabel,
}: Props) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      {...(external ? { onClick: externalClick(href) } : {})}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(base, variants[variant], sizes[size], className)}
    >
      {children}
    </a>
  );
}
