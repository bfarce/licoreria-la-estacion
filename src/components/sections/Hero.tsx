import { ArrowDown, MessageCircle } from "lucide-react";
import heroImg from "@/assets/hero-licoreria.jpg";
import { ActionButton } from "@/components/ui/action-button";
import { MENSAJES, whatsappUrl } from "@/config/site";
import { useScrollParallax } from "@/hooks/useScrollParallax";

export function Hero() {
  const parallaxRef = useScrollParallax<HTMLImageElement>({ speed: 0.12, scale: 1.15, damp: 0.08 });

  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          ref={parallaxRef}
          src={heroImg}
          alt="Interior de una licorería moderna con botellas premium iluminadas en tonos cálidos"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover origin-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,oklch(0.1_0_0/0.78)_0%,oklch(0.1_0_0/0.58)_50%,oklch(0.1_0_0/0.38)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,var(--background),transparent)]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-32 pb-24 lg:px-8">
        <div className="max-w-3xl">
          <p
            className="animate-fade-in text-[0.7rem] uppercase tracking-[0.42em] text-gold"
            style={{ animationDelay: "80ms" }}
          >
            Nacionales e importados
          </p>
          <h1
            className="animate-fade-up mt-7 text-4xl leading-[1.05] text-foreground sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "160ms" }}
          >
            La mejor selección de{" "}
            <span className="text-gold-gradient italic">licores nacionales e importados</span>
          </h1>
          <p
            className="animate-fade-up mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ animationDelay: "300ms" }}
          >
            Distribuimos licores al por mayor y al detal con las mejores marcas del mercado. Cotiza
            en minutos por WhatsApp con atención personalizada.
          </p>
          <div
            className="animate-fade-up mt-10 flex flex-col gap-4 sm:flex-row sm:items-center"
            style={{ animationDelay: "420ms" }}
          >
            <ActionButton href={whatsappUrl(MENSAJES.cotizacion)} variant="gold" size="lg">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
              Solicitar cotización
            </ActionButton>
            <ActionButton href={whatsappUrl(MENSAJES.asesor)} variant="outline" size="lg">
              Hablar con un asesor
            </ActionButton>
          </div>

          <dl
            className="animate-fade-in mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-border/60 pt-8"
            style={{ animationDelay: "600ms" }}
          >
            {[
              { k: "+500", v: "Referencias" },
              { k: "100%", v: "Asesoría personalizada" },
              { k: "WhatsApp", v: "Cotización en minutos" },
            ].map((s) => (
              <div key={s.v}>
                <dt className="font-display text-2xl text-gold sm:text-3xl">{s.k}</dt>
                <dd className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <a
        href="#categorias"
        aria-label="Ir a categorías"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-gold/70 transition-colors hover:text-gold md:block"
      >
        <ArrowDown className="h-6 w-6 animate-bounce-smooth" aria-hidden="true" />
      </a>
    </section>
  );
}
