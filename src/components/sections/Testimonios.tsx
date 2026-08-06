import { Quote, Star } from "lucide-react";
import { SectionHeading } from "./SectionHeading";
import { useReveal } from "@/hooks/useReveal";

const TESTIMONIOS = [
  {
    nombre: "Andrés Villamil",
    rol: "Propietario · Bar Nocturno",
    estrellas: 5,
    texto:
      "Llevo dos años surtiendo mi bar con ellos. Los precios por volumen son imbatibles y nunca me han fallado con una entrega.",
  },
  {
    nombre: "Laura Restrepo",
    rol: "Organizadora de eventos",
    estrellas: 5,
    texto:
      "Cotizaron por WhatsApp en menos de diez minutos y entregaron el mismo día. La asesoría para el maridaje fue impecable.",
  },
  {
    nombre: "Camilo Duarte",
    rol: "Gerente · Restaurante Sur",
    estrellas: 4,
    texto:
      "Productos originales y muy bien empacados. El acompañamiento del asesor comercial marca la diferencia.",
  },
];

export function Testimonios() {
  const head = useReveal<HTMLDivElement>();

  return (
    <section className="bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div ref={head.ref} className={head.className}>
          <SectionHeading eyebrow="Testimonios" title="Lo que dicen nuestros clientes" />
        </div>

        <ul className="mt-16 grid gap-6 lg:grid-cols-3">
          {TESTIMONIOS.map((t, i) => (
            <Testimonio key={t.nombre} {...t} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function Testimonio({
  nombre,
  rol,
  estrellas,
  texto,
  index,
}: {
  nombre: string;
  rol: string;
  estrellas: number;
  texto: string;
  index: number;
}) {
  const reveal = useReveal<HTMLLIElement>({ delay: index * 80, variant: "up" });
  return (
    <li
      ref={reveal.ref}
      style={reveal.style}
      className={`card-premium rounded-2xl p-8 ${reveal.className}`}
    >
      <Quote className="h-8 w-8 text-gold/50" aria-hidden="true" />
      <div className="mt-5 flex gap-1" aria-label={`${estrellas} de 5 estrellas`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={i < estrellas ? "h-4 w-4 fill-gold text-gold" : "h-4 w-4 text-border"}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="mt-5 text-sm leading-relaxed text-muted-foreground">“{texto}”</p>
      <div className="mt-7 border-t border-border/70 pt-5">
        <p className="font-display text-lg text-foreground">{nombre}</p>
        <p className="text-xs uppercase tracking-[0.2em] text-gold">{rol}</p>
      </div>
    </li>
  );
}
