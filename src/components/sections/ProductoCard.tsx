import { MessageCircle } from "lucide-react";
import type { Producto } from "@/types/catalog";
import { MENSAJES, externalClick, whatsappUrl } from "@/config/site";
import { useReveal } from "@/hooks/useReveal";
import { PremiumImage } from "@/components/ui/premium-image";

export function ProductoCard({ producto, index = 0 }: { producto: Producto; index?: number }) {
  const reveal = useReveal<HTMLElement>({ delay: (index % 4) * 70, variant: "up" });
  const url = whatsappUrl(MENSAJES.producto(producto.nombre));

  return (
    <article
      ref={reveal.ref}
      style={reveal.style}
      className={`card-premium media-hover group relative flex flex-col overflow-hidden rounded-2xl ${reveal.className}`}
    >
      <PremiumImage
        src={producto.imagen}
        alt={`${producto.nombre} — ${producto.presentacion}`}
        width={800}
        height={1000}
        className="aspect-4/5 w-full"
        overlay
      />

      <span className="pointer-events-none absolute left-4 top-4 z-[2] rounded-full border border-gold/40 bg-background/70 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-gold backdrop-blur-sm transition-all duration-500 group-hover:border-gold group-hover:bg-gold/15">
        {producto.marca}
      </span>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl text-foreground transition-colors duration-500 group-hover:text-gold sm:text-2xl">
          {producto.nombre}
        </h3>
        <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          {producto.presentacion}
        </p>
        <p className="mt-3 mb-6 line-clamp-2 min-h-[2.6rem] text-sm leading-relaxed text-muted-foreground">
          {producto.descripcion}
        </p>

        <a
          href={url}
          onClick={externalClick(url)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-whatsapp/45 bg-whatsapp/10 text-sm font-medium text-whatsapp transition-all duration-500 hover:-translate-y-0.5 hover:bg-whatsapp hover:text-background hover:shadow-[0_14px_30px_-14px_oklch(0.68_0.16_152/0.8)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:translate-y-0"
        >
          <MessageCircle
            className="h-4 w-4 transition-transform duration-500 group-hover:scale-110"
            aria-hidden="true"
          />
          Consultar por WhatsApp
        </a>
      </div>
    </article>
  );
}
