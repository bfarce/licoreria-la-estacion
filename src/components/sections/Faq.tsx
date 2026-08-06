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
    q: "¿Venden al por mayor?",
    a: "Sí. Manejamos precios especiales por volumen para bares, restaurantes, tiendas, hoteles y organizadores de eventos. Escríbenos por WhatsApp con tu lista de productos y te enviamos la cotización.",
  },
  {
    q: "¿Realizan domicilios?",
    a: "Realizamos entregas coordinadas dentro de la zona urbana de Pitalito y despachos programados según disponibilidad y zona para pedidos mayoristas.",
  },
  {
    q: "¿Cómo solicito una cotización?",
    a: "Pulsa cualquier botón de WhatsApp del sitio, indícanos los productos y cantidades, y un asesor te responde en minutos con disponibilidad y precio.",
  },
  {
    q: "¿Qué medios de pago aceptan?",
    a: "Aceptamos efectivo, transferencia bancaria, PSE y tarjetas débito y crédito en el punto de venta. Para clientes mayoristas manejamos condiciones especiales.",
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
