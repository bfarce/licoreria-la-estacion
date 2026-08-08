import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "./SectionHeading";
import { useReveal } from "@/hooks/useReveal";

const FAQS = [
  {
    q: "¿Cómo puedo comprar en La Estación?",
    a: "Puedes visitarnos directamente en nuestro punto de venta físico en Pitalito o solicitar tus licores al detal a través de WhatsApp. Te confirmamos disponibilidad, precios y coordinamos tu pedido al instante.",
  },
  {
    q: "¿Realizan domicilios?",
    a: "Sí. Realizamos entregas y domicilios coordinados dentro de la zona urbana de Pitalito para que disfrutes de tus licores favoritos directamente en tu puerta.",
  },
  {
    q: "¿Cómo solicito información o pedidos?",
    a: "Pulsa cualquier botón de WhatsApp del sitio, indícanos las referencias que deseas y un asesor te responderá en minutos con total disponibilidad y atención.",
  },
  {
    q: "¿Qué medios de pago aceptan?",
    a: "Aceptamos efectivo, transferencias bancarias, PSE y tarjetas débito y crédito en nuestro punto de venta.",
  },
];

export function Faq() {
  const head = useReveal<HTMLDivElement>();
  const body = useReveal<HTMLDivElement>(120);

  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 lg:px-8">
        <div ref={head.ref} style={head.style} className={head.className}>
          <SectionHeading eyebrow="Ayuda" title="Preguntas frecuentes" />
        </div>

        <div ref={body.ref} style={body.style} className={`mt-14 ${body.className}`}>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="border-b border-border/70 px-1"
              >
                <AccordionTrigger className="py-6 text-left font-display text-xl text-foreground hover:text-gold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
