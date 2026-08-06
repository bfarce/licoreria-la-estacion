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
          <div className="media-hover group relative rounded-[28px] sm:rounded-[32px] border border-gold/40 bg-[#0e0c0a] p-3 sm:p-4 shadow-[0_12px_45px_-10px_rgba(212,175,55,0.25)] transition-all duration-700 hover:border-gold/70 hover:shadow-[0_16px_60px_-8px_rgba(212,175,55,0.38)]">
            <div className="relative overflow-hidden rounded-[18px] sm:rounded-[22px]">
              <PremiumImage
                src={localImg}
                alt="Interior del local de la licorería con estanterías iluminadas"
                width={1280}
                height={960}
                priority
                className="aspect-4/3 w-full rounded-[18px] sm:rounded-[22px]"
                imgClassName="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none rounded-[18px] sm:rounded-[22px] ring-1 ring-inset ring-gold/25"
              />
            </div>
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
