import localImg from "@/assets/local-tienda.jpg";
import { SectionHeading } from "./SectionHeading";
import { useReveal } from "@/hooks/useReveal";
import { PremiumImage } from "@/components/ui/premium-image";

export function Nosotros() {
  const reveal = useReveal<HTMLDivElement>({ variant: "left" });
  const texto = useReveal<HTMLDivElement>({ variant: "right", delay: 100 });

  return (
    <section id="nosotros" className="py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
        <div ref={reveal.ref} style={reveal.style} className={reveal.className}>
          <div className="media-hover group relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-3xl border border-gold/20 transition-all duration-700 group-hover:-inset-4 group-hover:border-gold/45 pointer-events-none"
            />
            <PremiumImage
              src={localImg}
              alt="Interior del local de la licorería con estanterías iluminadas"
              width={1280}
              height={960}
              className="relative aspect-4/3 w-full rounded-2xl shadow-[var(--shadow-premium)]"
            />
          </div>
        </div>

        <div ref={texto.ref} style={texto.style} className={texto.className}>
          <SectionHeading
            align="left"
            eyebrow="Nosotros"
            title="Una casa dedicada al buen licor"
            description="En La Estación seleccionamos licores nacionales e importados para atender a clientes al detal y al por mayor con asesoría personalizada."
          />
          <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              Trabajamos directamente con importadores y casas productoras para garantizar
              autenticidad, trazabilidad y precios justos en cada botella que sale de nuestra
              bodega.
            </p>
            <p>
              Cada pedido se acompaña de asesoría real: te ayudamos a elegir el portafolio correcto
              para tu evento, tu bar o tu punto de venta, y coordinamos la entrega por WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
