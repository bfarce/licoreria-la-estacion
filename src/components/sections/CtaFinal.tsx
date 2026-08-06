import { MessageCircle } from "lucide-react";
import { ActionButton } from "@/components/ui/action-button";
import { MENSAJES, whatsappUrl } from "@/config/site";
import { useReveal } from "@/hooks/useReveal";

export function CtaFinal() {
  const reveal = useReveal<HTMLDivElement>();

  return (
    <section
      id="contacto"
      className="relative overflow-hidden py-28 sm:py-36"
      style={{ background: "var(--gradient-wine)" }}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 60% at 50% 0%, oklch(0.75 0.105 85 / 0.18), transparent 70%)",
        }}
      />
      <div
        ref={reveal.ref}
        style={reveal.style}
        className={`relative mx-auto max-w-3xl px-5 text-center lg:px-8 ${reveal.className}`}
      >
        <p className="text-[0.7rem] uppercase tracking-[0.42em] text-gold">Estamos listos</p>
        <h2 className="mt-6 text-4xl leading-[1.08] text-foreground sm:text-6xl">
          ¿Necesitas una <span className="text-gold-gradient italic">cotización</span>?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Un asesor te responde en minutos con precios, disponibilidad y tiempos de entrega.
        </p>
        <ActionButton
          href={whatsappUrl(MENSAJES.cotizacion)}
          variant="gold"
          size="xl"
          className="mt-12 w-full sm:w-auto"
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
          Escríbenos por WhatsApp
        </ActionButton>
      </div>
    </section>
  );
}
