import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: Props) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && <p className="text-[0.68rem] uppercase tracking-[0.4em] text-gold">{eyebrow}</p>}
      <h2 className="mt-4 text-3xl leading-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      <div className={cn("hairline mt-6 w-40", align === "center" && "mx-auto")} />
      {description && (
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
