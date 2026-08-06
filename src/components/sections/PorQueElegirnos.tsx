import { Award, BadgeCheck, MessagesSquare, ShieldCheck, Tags, Truck } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { useReveal } from "@/hooks/useReveal";

const RAZONES = [
  { icon: Truck, titulo: "Entrega rápida", texto: "Despachos el mismo día en zona urbana." },
  {
    icon: ShieldCheck,
    titulo: "Productos originales",
    texto: "Importación y proveedores certificados.",
  },
  {
    icon: MessagesSquare,
    titulo: "Excelente atención",
    texto: "Asesoría real, sin bots ni esperas.",
  },
  { icon: Award, titulo: "Marcas reconocidas", texto: "Portafolio nacional e internacional." },
  { icon: Tags, titulo: "Precios competitivos", texto: "Tarifas al detal y por volumen." },
  {
    icon: BadgeCheck,
    titulo: "Cotización inmediata",
    texto: "Respondemos por WhatsApp en minutos.",
  },
];

export function PorQueElegirnos() {
  const head = useReveal<HTMLDivElement>();

  return (
    <section className="relative bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={head.ref} className={head.className}>
          <SectionHeading eyebrow="Nuestra promesa" title="¿Por qué elegirnos?" />
        </div>

        <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RAZONES.map(({ icon: Icon, titulo, texto }, i) => (
            <Razon key={titulo} Icon={Icon} titulo={titulo} texto={texto} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Razon({
  Icon,
  titulo,
  texto,
  index,
}: {
  Icon: typeof Truck;
  titulo: string;
  texto: string;
  index: number;
}) {
  const reveal = useReveal<HTMLLIElement>({ delay: index * 70, variant: "up" });
  return (
    <li
      ref={reveal.ref}
      style={reveal.style}
      className={`card-premium group rounded-2xl p-8 ${reveal.className}`}
    >
      <span className="grid h-14 w-14 place-items-center rounded-2xl border border-gold/25 bg-gold/8 text-gold transition-all duration-500 group-hover:scale-105 group-hover:bg-gold group-hover:text-primary-foreground">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </span>
      <h3 className="mt-6 font-display text-2xl text-foreground">{titulo}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{texto}</p>
    </li>
  );
}
