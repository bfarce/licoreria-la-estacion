import { MessageCircle } from "lucide-react";
import heroImg from "@/assets/hero-licoreria.jpg";
import { ActionButton } from "@/components/ui/action-button";
import { MENSAJES, whatsappUrl } from "@/config/site";
import { useReveal } from "@/hooks/useReveal";
import { useScrollParallax } from "@/hooks/useScrollParallax";

export function CtaFinal() {
  const reveal = useReveal<HTMLDivElement>();

  const ctaParallaxRef = useScrollParallax<HTMLImageElement>({
    speed: 0.12,
    scale: 1.15,
    damp: 0.08,
  });

  return (
    <section
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: "var(--gradient-wine)" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <img
          ref={ctaParallaxRef}
          src={heroImg}
          alt="Fondo licorería"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-20 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(75% 60% at 50% 0%, oklch(0.75 0.105 85 / 0.18), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div
          ref={reveal.ref}
          style={reveal.style}
          className={`mx-auto max-w-3xl text-center ${reveal.className}`}
        >
          <p className="text-[0.7rem] uppercase tracking-[0.42em] text-gold">Contacto Directo</p>
          <h2 className="mt-4 text-4xl leading-[1.08] text-foreground sm:text-6xl">
            ¿Necesitas una <span className="text-gold-gradient italic">cotización</span> para tu
            evento o negocio?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Ahorra tiempo y asegura los mejores precios. Un asesor especializado te atenderá en
            minutos por WhatsApp.
          </p>
          <div className="mt-8 flex justify-center">
            <ActionButton
              href={whatsappUrl(MENSAJES.cotizacion)}
              variant="gold"
              size="xl"
              className="w-full sm:w-auto"
            >
              <MessageCircle className="h-6 w-6" aria-hidden="true" />
              Solicitar Cotización por WhatsApp
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}
