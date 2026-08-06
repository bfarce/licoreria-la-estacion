import { Boxes, HandCoins, Headset, Timer, Truck, LucideIcon } from "lucide-react";
import mayoristasImg from "@/assets/mayoristas.jpg";
import { SectionHeading } from "./SectionHeading";
import { ActionButton } from "@/components/ui/action-button";
import { MENSAJES, whatsappUrl } from "@/config/site";
import { useReveal } from "@/hooks/useReveal";
import { useScrollParallax } from "@/hooks/useScrollParallax";

const BENEFICIOS = [
  { icon: HandCoins, titulo: "Precios especiales", texto: "Escalas de descuento por volumen." },
  {
    icon: Truck,
    titulo: "Distribución",
    texto: "Entregas coordinadas según disponibilidad y zona.",
  },
  { icon: Headset, titulo: "Atención personalizada", texto: "Un asesor asignado a tu negocio." },
  { icon: Boxes, titulo: "Grandes cantidades", texto: "Inventario disponible para pedidos altos." },
  { icon: Timer, titulo: "Cotización inmediata", texto: "Respuesta por WhatsApp en minutos." },
];

export function Mayoristas() {
  const head = useReveal<HTMLDivElement>();
  const cardCta = useReveal<HTMLDivElement>({ delay: 200, variant: "scale" });
  const mayoristasParallaxRef = useScrollParallax<HTMLImageElement>({
    speed: 0.12,
    scale: 1.15,
    damp: 0.08,
  });

  return (
    <section
      id="mayoristas"
      className="relative overflow-hidden py-24 sm:py-32"
      style={{ background: "var(--gradient-wine)" }}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          ref={mayoristasParallaxRef}
          src={mayoristasImg}
          alt="Bodega de distribución con cajas de licores apiladas"
          loading="lazy"
          width={1280}
          height={900}
          className="absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={head.ref} className={head.className}>
          <SectionHeading
            align="left"
            eyebrow="Venta al por mayor"
            title="Un aliado para tu negocio"
            description="Abastecemos bares, restaurantes, tiendas, hoteles y eventos con condiciones comerciales pensadas para crecer contigo."
          />
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <ul className="grid gap-4 sm:grid-cols-2">
            {BENEFICIOS.map(({ icon, titulo, texto }, i) => (
              <BeneficioCard key={titulo} icon={icon} titulo={titulo} texto={texto} index={i} />
            ))}
          </ul>

          <div
            ref={cardCta.ref}
            style={cardCta.style}
            className={`card-premium rounded-3xl p-8 text-center sm:p-10 ${cardCta.className}`}
          >
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-gold">
              Pedidos mayoristas
            </p>
            <h3 className="mt-4 font-display text-3xl leading-snug text-foreground">
              Cotiza tu pedido hoy y recibe una propuesta personalizada
            </h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Envíanos tu lista de productos y te confirmamos disponibilidad, precio y tiempos de
              entrega.
            </p>
            <ActionButton
              href={whatsappUrl(MENSAJES.mayorista)}
              variant="gold"
              size="lg"
              className="mt-8 w-full"
            >
              Solicitar cotización
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeneficioCard({
  icon: Icon,
  titulo,
  texto,
  index,
}: {
  icon: LucideIcon;
  titulo: string;
  texto: string;
  index: number;
}) {
  const reveal = useReveal<HTMLLIElement>({ delay: index * 80, variant: "up" });

  return (
    <li
      ref={reveal.ref}
      style={reveal.style}
      className={`card-premium sheen-hover flex gap-4 rounded-2xl p-5 backdrop-blur-sm sm:p-6 ${reveal.className}`}
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold transition-all duration-500 group-hover:scale-110">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <h3 className="font-display text-lg text-foreground">{titulo}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{texto}</p>
      </div>
    </li>
  );
}
